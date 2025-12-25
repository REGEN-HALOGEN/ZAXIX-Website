import { Briefcase, Mail, Phone } from "lucide-react";

const ITEMS = [
  {
    key: "services",
    href: "#systems",
    label: "Services",
    icon: Briefcase,
  },
  {
    key: "email",
    href: "mailto:vikram@zaxispharmachine.com",
    label: "vikram@zaxispharmachine.com",
    icon: Mail,
  },
  {
    key: "phone",
    href: "tel:+917945928496",
    label: "+91 79 45928496",
    icon: Phone,
  },
] as const;

export default function SideContactBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2"
    >
      <div className="flex flex-col rounded-l-2xl border border-border/60 bg-primary text-primary-foreground shadow-lg">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              href={item.href}
              aria-label={item.key === "services" ? "Services" : item.label}
              className="group relative flex h-14 w-14 items-center justify-center border-b border-primary-foreground/10 last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon className="h-7 w-7" aria-hidden="true" />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-border/60 bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-150 ease-linear group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                {item.key === "services" ? "Services" : item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
