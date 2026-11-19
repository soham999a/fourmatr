import "server-only";

interface MailPayload {
  name: string;
  organisation: string;
  email: string;
  platform: string;
  message: string;
}

export type MailResult =
  | { status: "sent"; provider: "resend" | "smtp" }
  | { status: "fallback" };

const CONTACT_EMAIL = "system@matrka.net";

export async function sendCorrespondence(payload: MailPayload): Promise<MailResult> {
  const subject = `Correspondence — ${payload.name}${payload.organisation ? ` / ${payload.organisation}` : ""}`;
  const text = [
    `Name: ${payload.name}`,
    `Organisation: ${payload.organisation || "—"}`,
    `Email: ${payload.email}`,
    `Platform of interest: ${payload.platform || "—"}`,
    "",
    payload.message,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "Matrka Applied Systems <onboarding@resend.dev>",
        to: [process.env.MAIL_TO || CONTACT_EMAIL],
        reply_to: payload.email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Mail provider responded ${response.status}: ${detail}`);
    }
    return { status: "sent", provider: "resend" };
  }

  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || CONTACT_EMAIL,
      to: process.env.MAIL_TO || CONTACT_EMAIL,
      replyTo: payload.email,
      subject,
      text,
    });
    return { status: "sent", provider: "smtp" };
  }

  // No provider configured: never silently drop the message.
  console.info("[contact] Mail provider not configured. Correspondence received:", {
    name: payload.name,
    email: payload.email,
    platform: payload.platform,
    length: payload.message.length,
  });
  return { status: "fallback" };
}
