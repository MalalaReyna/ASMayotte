/* A utiliser dans un ul/ol avec list style type : none */
interface CustomLiProps {
  children: React.ReactNode;
  variant?: "point" | "check" | "flow";
  className?: string;
  isLast?: boolean;
}

export default function CustomLi({
  children,
  variant = "point",
  className = "",
  isLast = false,
}: CustomLiProps) {
  switch (variant) {
    case "point":
      return (
        <li className={`relative pl-5 mb-3 ${className}`}>
          <span className="absolute left-0 top-2 w-2 h-2 bg-dark opacity-50  rounded-full" />
          <span className="opacity-70">{children}</span>
        </li>
      );
    case "check":
      return (
        <li className={`relative pl-8 mb-3 ${className}`}>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full flex items-center justify-center ">
            <svg
              className="w-2 h-2 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="opacity-70">{children}</span>
        </li>
      );
    case "flow":
      return (
        <li className={`relative pl-8 mb-3 ${className}`}>
          {/* Ligne verticale */}
          {!isLast && (
            <span className="absolute left-[7px] top-6 bottom-[-10px] w-[2px] bg-secondary" />
          )}

          {/* Rond contour */}
          <span className="absolute left-0 top-1 w-4 h-4 border-2 border-secondary rounded-full" />
          <span className="opacity-70">{children}</span>
        </li>
      );
  }
}