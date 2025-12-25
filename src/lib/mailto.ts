export type MailtoFieldValue = string | number | boolean | null | undefined;

function normalize(value: MailtoFieldValue): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function buildMailtoHref(args: {
  to: string;
  subject: string;
  fields: Array<{ label: string; value: MailtoFieldValue }>;
}): string {
  const lines = args.fields
    .map(({ label, value }) => {
      const v = normalize(value);
      return v ? `${label}: ${v}` : `${label}:`;
    })
    .join("\n");

  const body = `${lines}\n\n--\nSent from zaxispharmachine.com`;

  const params = new URLSearchParams({
    subject: args.subject,
    body,
  });

  return `mailto:${encodeURIComponent(args.to)}?${params.toString()}`;
}
