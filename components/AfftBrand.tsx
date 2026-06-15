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
    <img
      src="/images/brand/afft-logo.svg"
      alt={decorative ? "" : "AFFT logo"}
      aria-hidden={decorative || undefined}
      className={joinClasses("shrink-0 object-contain", className)}
    />
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
