export function FooterBottom() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative mb-6">
      <p className="text-secondary">
        &copy; 2026 <span className="font-bold">A&S Mayotte</span>. Tous droits réservés.
      </p>
      <p className="text-secondary md:absolute md:right-0">
        Powered by{" "}
        <a
          href="https://allforone.mg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-bold"
        >
          AllForOne 
        </a>
        <span> v1.2.0</span>
      </p>
    </div>
  );
}
