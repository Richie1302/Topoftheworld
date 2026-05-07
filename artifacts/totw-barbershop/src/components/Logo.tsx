export function LogoMark({ className }: { className?: string }) {
  const cx = 130;
  const cy = 130;
  const outerR = 124;
  const innerR = 116;
  const globeR = 82;
  const textR = 98; // radius for top arc text midline
  const botTextR = 90; // radius for bottom arc text midline

  // Top arc: center (cx,cy), radius textR, sweep CCW (0) → goes through top
  const topArc = `M ${cx - textR},${cy} A ${textR},${textR} 0 0,0 ${cx + textR},${cy}`;
  // Bottom arc: center (cx,cy), radius botTextR, sweep CW (1) → goes through bottom
  const botArc = `M ${cx - botTextR},${cy} A ${botTextR},${botTextR} 0 0,1 ${cx + botTextR},${cy}`;

  // Pole dimensions
  const poleX = cx - 8;
  const poleY = cy - 44;
  const poleW = 16;
  const poleH = 88;
  const poleRx = 8;

  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <path id="topArcPath" d={topArc} />
        <path id="botArcPath" d={botArc} />

        {/* Barber pole diagonal stripe pattern */}
        <pattern
          id="poleStripes"
          x="0"
          y="0"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45)"
        >
          <rect width="4" height="12" fill="#dc2626" />
          <rect x="4" width="4" height="12" fill="#f8f8f8" />
          <rect x="8" width="4" height="12" fill="#1e40af" />
        </pattern>

        {/* Clip pole to rounded rect */}
        <clipPath id="poleClip">
          <rect x={poleX} y={poleY} width={poleW} height={poleH} rx={poleRx} />
        </clipPath>

        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Globe clip */}
        <clipPath id="globeClip">
          <circle cx={cx} cy={cy} r={globeR} />
        </clipPath>
      </defs>

      {/* ── Outer decorative badge rings ── */}
      <circle cx={cx} cy={cy} r={outerR} stroke="#C9A448" strokeWidth="2" />
      {/* Tick marks around outer ring */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i * 6 * Math.PI) / 180;
        const isMajor = i % 5 === 0;
        const r1 = outerR - 1;
        const r2 = isMajor ? outerR - 7 : outerR - 4;
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(angle)}
            y1={cy + r1 * Math.sin(angle)}
            x2={cx + r2 * Math.cos(angle)}
            y2={cy + r2 * Math.sin(angle)}
            stroke="#C9A448"
            strokeWidth={isMajor ? 1 : 0.5}
            opacity={isMajor ? 0.9 : 0.45}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={innerR} stroke="#C9A448" strokeWidth="0.75" opacity="0.6" />

      {/* Diamond ornaments at 3 and 9 o'clock */}
      {[
        [cx - outerR - 4, cy],
        [cx + outerR + 4, cy],
      ].map(([dx, dy], i) => (
        <polygon
          key={i}
          points={`${dx},${dy - 6} ${dx + 6},${dy} ${dx},${dy + 6} ${dx - 6},${dy}`}
          fill="#C9A448"
        />
      ))}

      {/* ── Globe body ── */}
      <circle cx={cx} cy={cy} r={globeR} fill="#0c0c0c" stroke="#C9A448" strokeWidth="1.5" />

      {/* Globe latitude lines */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={globeR}
        ry={22}
        stroke="#C9A448"
        strokeWidth="0.7"
        opacity="0.25"
      />
      <ellipse
        cx={cx}
        cy={cy - 28}
        rx={globeR * 0.83}
        ry={17}
        stroke="#C9A448"
        strokeWidth="0.6"
        opacity="0.2"
      />
      <ellipse
        cx={cx}
        cy={cy + 28}
        rx={globeR * 0.83}
        ry={17}
        stroke="#C9A448"
        strokeWidth="0.6"
        opacity="0.2"
      />
      <ellipse
        cx={cx}
        cy={cy - 52}
        rx={globeR * 0.5}
        ry={10}
        stroke="#C9A448"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <ellipse
        cx={cx}
        cy={cy + 52}
        rx={globeR * 0.5}
        ry={10}
        stroke="#C9A448"
        strokeWidth="0.5"
        opacity="0.15"
      />

      {/* Globe longitude lines */}
      <line
        x1={cx}
        y1={cy - globeR}
        x2={cx}
        y2={cy + globeR}
        stroke="#C9A448"
        strokeWidth="0.7"
        opacity="0.25"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={40}
        ry={globeR}
        stroke="#C9A448"
        strokeWidth="0.6"
        opacity="0.2"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={68}
        ry={globeR}
        stroke="#C9A448"
        strokeWidth="0.6"
        opacity="0.2"
      />

      {/* Subtle continent suggestion marks */}
      <path
        d="M 98,108 Q 105,100 118,106 Q 128,112 122,122 Q 115,132 105,126 Q 96,118 98,108Z"
        fill="#C9A448"
        opacity="0.1"
        clipPath="url(#globeClip)"
      />
      <path
        d="M 140,95 Q 150,90 158,98 Q 163,108 155,115 Q 147,120 140,112 Q 135,104 140,95Z"
        fill="#C9A448"
        opacity="0.1"
        clipPath="url(#globeClip)"
      />
      <path
        d="M 100,138 Q 108,132 116,138 Q 120,148 113,155 Q 106,158 100,150 Q 96,143 100,138Z"
        fill="#C9A448"
        opacity="0.1"
        clipPath="url(#globeClip)"
      />

      {/* Globe inner glow ring */}
      <circle
        cx={cx}
        cy={cy}
        r={globeR - 2}
        stroke="#C9A448"
        strokeWidth="1"
        opacity="0.15"
        strokeDasharray="4 3"
      />

      {/* ── Barber Pole ── */}
      {/* Pole stripes (clipped) */}
      <rect
        x={poleX}
        y={poleY}
        width={poleW}
        height={poleH}
        fill="url(#poleStripes)"
        clipPath="url(#poleClip)"
      />
      {/* Pole outer border */}
      <rect
        x={poleX}
        y={poleY}
        width={poleW}
        height={poleH}
        rx={poleRx}
        stroke="#C9A448"
        strokeWidth="1.5"
      />
      {/* Pole top cap */}
      <ellipse cx={cx} cy={poleY} rx={poleW / 2} ry={4} fill="#C9A448" />
      <ellipse cx={cx} cy={poleY} rx={poleW / 2 - 1} ry={2.5} fill="#0c0c0c" opacity="0.4" />
      {/* Pole bottom cap */}
      <ellipse cx={cx} cy={poleY + poleH} rx={poleW / 2} ry={4} fill="#C9A448" />
      <ellipse
        cx={cx}
        cy={poleY + poleH}
        rx={poleW / 2 - 1}
        ry={2.5}
        fill="#0c0c0c"
        opacity="0.4"
      />
      {/* Cap base plates */}
      <rect x={poleX - 4} y={poleY - 5} width={poleW + 8} height={5} rx="2" fill="#C9A448" />
      <rect
        x={poleX - 4}
        y={poleY + poleH}
        width={poleW + 8}
        height={5}
        rx="2"
        fill="#C9A448"
      />

      {/* ── Star ornaments flanking pole ── */}
      {[cx - 36, cx + 36].map((x, i) => (
        <text
          key={i}
          x={x}
          y={cy + 6}
          textAnchor="middle"
          fontSize="18"
          fill="#C9A448"
          opacity="0.5"
          fontFamily="serif"
        >
          ✦
        </text>
      ))}

      {/* ── Small scissors at 12 o'clock in band ── */}
      <g transform={`translate(${cx}, ${cy - outerR + 15}) scale(0.55)`} opacity="0.9">
        {/* Left blade */}
        <path
          d="M -18,-14 L 0,0 L -14,18 Q -22,22 -26,14 Q -30,6 -24,-2 Z"
          fill="#C9A448"
        />
        {/* Right blade */}
        <path
          d="M 18,-14 L 0,0 L 14,18 Q 22,22 26,14 Q 30,6 24,-2 Z"
          fill="#C9A448"
        />
        {/* Pivot */}
        <circle cx="0" cy="0" r="4" fill="#0c0c0c" stroke="#C9A448" strokeWidth="1.5" />
        {/* Handles */}
        <ellipse cx="-20" cy="-20" rx="9" ry="7" fill="none" stroke="#C9A448" strokeWidth="1.5" />
        <ellipse cx="20" cy="-20" rx="9" ry="7" fill="none" stroke="#C9A448" strokeWidth="1.5" />
      </g>

      {/* ── Top arc text: TOP OF THE WORLD ── */}
      <text
        fontSize="12.5"
        fill="#C9A448"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="3"
        fontWeight="bold"
        filter="url(#glow)"
      >
        <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
          TOP OF THE WORLD
        </textPath>
      </text>

      {/* ── Bottom arc text: BARBERSHOP ── */}
      <text
        fontSize="11"
        fill="#C9A448"
        fontFamily="'Arial', sans-serif"
        letterSpacing="4"
        fontWeight="600"
      >
        <textPath href="#botArcPath" startOffset="50%" textAnchor="middle">
          BARBERSHOP
        </textPath>
      </text>

      {/* Divider dashes flanking bottom text */}
      {[
        [cx - botTextR + 8, cy + botTextR - 10, cx - botTextR + 24, cy + botTextR - 22],
        [cx + botTextR - 8, cy + botTextR - 10, cx + botTextR - 24, cy + botTextR - 22],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#C9A448"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}

      {/* Bottom center diamond ornament */}
      <polygon
        points={`${cx},${cy + outerR + 5} ${cx + 5},${cy + outerR - 1} ${cx},${cy + outerR - 7} ${cx - 5},${cy + outerR - 1}`}
        fill="#C9A448"
      />
    </svg>
  );
}
