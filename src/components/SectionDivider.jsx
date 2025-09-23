export default function SectionDivider({
  variant = "wave",          // "wave" | "line" | "angle"
  nextBg = "#f7faf9",        // color del fondo de la sección siguiente
  className = "",
}) {
  if (variant === "line") {
    return <hr className={`divider ${className}`} aria-hidden="true" />;
  }

  if (variant === "angle") {
    return (
      <div className={`angle-sep ${className}`} aria-hidden="true">
        <div className="angle-fill" style={{ background: nextBg }} />
      </div>
    );
  }

  // wave (por defecto)
  return (
    <div className={`section-wave ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,32 C300,96 540,-16 960,32 C1200,64 1320,48 1440,40 L1440,80 L0,80 Z"
          fill={nextBg}
        />
      </svg>
    </div>
  );
}
