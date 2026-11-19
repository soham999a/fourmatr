import { NextResponse } from "next/server";
import { sendCorrespondence } from "@/lib/mail";
import { allowRequest } from "@/lib/rate-limit";
import { contactSchema, type ContactField } from "@/lib/validation";

export const runtime = "nodejs";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  return ip;
}

export async function POST(request: Request) {
  if (!allowRequest(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Partial<Record<ContactField | "form", string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField | undefined;
      if (key) errors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors: Object.keys(errors).length ? errors : { form: "Invalid submission." },
      },
      { status: 400 },
    );
  }

  const input = parsed.data;

  // Honeypot: accept silently so bots do not learn they were caught.
  if (input.company_website) {
    return NextResponse.json({ ok: true, fallback: false });
  }

  try {
    const result = await sendCorrespondence({
      name: input.name,
      organisation: input.organisation,
      email: input.email,
      platform: input.platform,
      message: input.message,
    });

    return NextResponse.json({
      ok: true,
      fallback: result.status === "fallback",
      provider: result.status === "sent" ? result.provider : undefined,
    });
  } catch (error) {
    console.error("[contact] Delivery failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "The message could not be sent right now. Please mail us at system@matrka.net.",
      },
      { status: 503 },
    );
  }
}
