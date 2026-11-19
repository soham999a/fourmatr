"use client";

import { useState, type FormEvent } from "react";
import { PLATFORMS } from "@/content/platforms";
import type { ContactField } from "@/lib/validation";

interface ContactFormProps {
  platform?: string;
}

type FieldErrors = Partial<Record<ContactField | "form", string>>;

interface ApiResponse {
  ok?: boolean;
  fallback?: boolean;
  message?: string;
  errors?: FieldErrors;
}

const fieldClass =
  "w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold";

export function ContactForm({ platform }: ContactFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [notice, setNotice] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    setNotice("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      organisation: String(data.get("organisation") ?? ""),
      email: String(data.get("email") ?? ""),
      platform: String(data.get("platform") ?? ""),
      message: String(data.get("message") ?? ""),
      company_website: String(data.get("company_website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: result.message ?? "Please check the form." });
        setStatus("idle");
        return;
      }

      form.reset();
      setStatus("sent");
      setNotice(
        result.fallback
          ? "Thank you. Our mail service is not configured yet, so please also write to system@matrka.net."
          : "Thank you. Your correspondence has been received.",
      );
    } catch {
      setErrors({
        form: "The message could not be sent. Please mail us at system@matrka.net.",
      });
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-3 block text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            className={fieldClass}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
          />
          {errors.name ? (
            <p id="error-name" className="mt-2 text-xs text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="organisation" className="eyebrow mb-3 block text-muted">
            Organisation <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            maxLength={160}
            className={fieldClass}
            placeholder="Institution or company"
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={errors.organisation ? "error-organisation" : undefined}
          />
          {errors.organisation ? (
            <p id="error-organisation" className="mt-2 text-xs text-red-700">
              {errors.organisation}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="eyebrow mb-3 block text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            className={fieldClass}
            placeholder="you@institution.org"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
          />
          {errors.email ? (
            <p id="error-email" className="mt-2 text-xs text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="platform" className="eyebrow mb-3 block text-muted">
            Platform of interest
          </label>
          <select
            id="platform"
            name="platform"
            className={fieldClass}
            defaultValue={platform ?? ""}
          >
            <option value="">Not specified</option>
            {PLATFORMS.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.platform ? (
            <p className="mt-2 text-xs text-red-700">{errors.platform}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-3 block text-muted">
          Correspondence
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          minLength={20}
          maxLength={5000}
          className={fieldClass}
          placeholder="Describe the decision, the institution and the horizon."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-message" : undefined}
        />
        {errors.message ? (
          <p id="error-message" className="mt-2 text-xs text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.form ? (
        <p role="alert" className="border-l-2 border-red-700 pl-4 text-sm text-red-700">
          {errors.form}
        </p>
      ) : null}

      {status === "sent" ? (
        <p role="status" className="border-l-2 border-gold pl-4 text-sm">
          {notice}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-8 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-[#d8b45e] disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send correspondence"}
      </button>
    </form>
  );
}
