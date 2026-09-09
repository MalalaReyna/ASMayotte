import { FooterBottom } from "./FooterBottom";
import { FooterTop } from "./FooterTop";

export function Footer() {
  return (
    <footer
      className="pt-12 pb-6 px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="max-w-8xl mx-auto bg-surface border border-gray-200 rounded-4xl p-6">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  );
}
