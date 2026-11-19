import { z } from "zod";
import { PLATFORMS } from "@/content/platforms";

const slugValues = PLATFORMS.map((platform) => platform.slug) as [
  (typeof PLATFORMS)[number]["slug"],
  ...(typeof PLATFORMS)[number]["slug"][],
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Name is too long."),
  organisation: z
    .string()
    .trim()
    .max(160, "Organisation is too long.")
    .default(""),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(200, "Email is too long."),
  platform: z.enum(slugValues).or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(5000, "Message is too long."),
  // Honeypot: must arrive empty. Bots often fill every field.
  company_website: z.string().max(0, "Invalid submission.").default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof Omit<ContactInput, "company_website">;
