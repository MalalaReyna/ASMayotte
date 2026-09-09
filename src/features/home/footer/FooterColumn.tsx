import type { FooterColumn as FooterColumnType } from './footerData';

type FooterColumnProps = FooterColumnType

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-medium text-primary mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-secondary text-sm hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
