interface LogoProps {
  className?: string;
  variant?: "full" | "monogram";
}

const Logo = ({ className = "h-10 w-auto", variant = "monogram" }: LogoProps) => {
  // SVG recreation of the KNB geometric mark based on brand guidelines
  // Black chevron (roof) with brass horizontal bar (table)
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Brass horizontal bar */}
      <rect
        x="15"
        y="20"
        width="70"
        height="8"
        fill="hsl(38, 45%, 52%)"
      />
      {/* Black chevron/roof - made of two angled bars */}
      <path
        d="M50 28 L20 68 L28 68 L50 36 L72 68 L80 68 L50 28Z"
        fill="hsl(40, 33%, 94%)"
      />
    </svg>
  );
};

export default Logo;
