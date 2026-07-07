export function CallArcs({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 120"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M -50 90 Q 300 10 600 90 T 1250 90"
        fill="none"
        strokeWidth="1"
        className="horn-arcs"
      />
      <path
        d="M -50 105 Q 300 35 600 105 T 1250 105"
        fill="none"
        strokeWidth="1"
        className="horn-arcs"
        opacity="0.2"
      />
    </svg>
  );
}
