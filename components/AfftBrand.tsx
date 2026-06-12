function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AfftLogoMark({
  className = "h-10 w-10",
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={decorative}
      role={decorative ? undefined : "img"}
    >
      {decorative ? null : <title>AFFT logo</title>}
      <circle cx="132" cy="42" r="38" fill="#F3922B" />
      <path
        d="M18 118L54 80L82 104L120 30L164 102L186 84L222 118H18Z"
        fill="#9CA470"
        stroke="#FFF7EA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
      <path
        d="M113 118L132 84L153 118H113Z"
        fill="#5B3416"
        stroke="#FFF7EA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
      <path d="M56 106L68 82L75 98L64 108Z" fill="#FFF7EA" />
      <path d="M96 76L114 46L120 71L107 86Z" fill="#FFF7EA" />
      <path d="M132 91L147 68L156 88L144 101Z" fill="#FFF7EA" />
      <path d="M184 102L195 89L202 102L192 108Z" fill="#FFF7EA" />
      <path
        d="M18 124C54 119 93 118 126 121C161 124 193 124 222 127"
        stroke="#5B3416"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path
        d="M38 136C73 130 109 130 146 134"
        stroke="#9CA470"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

export function AfftBrand({
  href = "/",
  ariaLabel,
  className,
  markClassName,
  labelClassName,
  label = "AFFT.CLUB",
}: {
  href?: string;
  ariaLabel?: string;
  className?: string;
  markClassName?: string;
  labelClassName?: string;
  label?: string;
}) {
  const content = (
    <>
      <AfftLogoMark
        className={joinClasses("shrink-0", markClassName ?? "h-10 w-10")}
        decorative
      />
      <span
        className={joinClasses(
          "font-bold uppercase leading-none text-white",
          labelClassName ?? "text-base tracking-[0.24em]"
        )}
      >
        {label}
      </span>
    </>
  );

  const classes = joinClasses("inline-flex items-center gap-3", className);

  if (!href) {
    return <div className={classes}>{content}</div>;
  }

  return (
    <a href={href} aria-label={ariaLabel ?? label} className={classes}>
      {content}
    </a>
  );
}
