/**
 * Animated hamburger-to-cross menu toggle SVG icon
 */
export function MenuToggleIcon({
  open,
  className = '',
  size = 24,
  duration = 400,
  stroke = 'currentColor',
  strokeWidth = 2.5,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`menu-toggle-icon ${className}`}
      style={{
        transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transform: open ? 'rotate(-45deg)' : 'none',
      }}
      aria-hidden="true"
      {...props}
    >
      <path
        style={{
          transition: `stroke-dasharray ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          strokeDasharray: open ? '20 300' : '12 63',
          strokeDashoffset: open ? '-32.42px' : '0',
        }}
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  );
}
