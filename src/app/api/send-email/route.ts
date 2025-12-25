import nodemailer from "nodemailer";

const RECIPIENT = "zaxispro1@gmail.com";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function safeText(value: unknown, maxLen = 4000): string {
  const text = typeof value === "string" ? value : value == null ? "" : String(value);
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").slice(0, maxLen);
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as {
      kind?: "quote" | "inquiry" | "contact";
      subject?: string;
      fields?: Array<{ label: string; value: unknown }>;
    };

    const kind = payload.kind ?? "quote";
    const subject = safeText(payload.subject || `Z AXIS — ${kind}` , 200);
    const fields = Array.isArray(payload.fields) ? payload.fields : [];

    if (fields.length === 0) {
      return Response.json({ ok: false, error: "No fields provided" }, { status: 400 });
    }

    const bodyLines = fields.map((f) => `${safeText(f.label, 80)}: ${safeText(f.value)}`);
    const text = `${bodyLines.join("\n")}\n\n--\nSent from zaxispharmachine.com`;

    const transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT ?? "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for others
      auth: {
        user: env("SMTP_USER"),
        pass: env("SMTP_PASS"),
      },
    });

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    await transporter.sendMail({
      from,
      to: RECIPIENT,
      subject,
      text,
    });

    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
