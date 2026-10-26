export function PixelHeart({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 14" fill="currentColor">
      <path d="M8 13.2 2.1 7.5A3.7 3.7 0 0 1 7.3 2.2L8 3l.7-.8a3.7 3.7 0 0 1 5.2 5.3L8 13.2Z" />
    </svg>
  );
}

export function GamepadIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 48 32" fill="none">
      <path d="M14.2 5.5h19.6a8.5 8.5 0 0 1 8.3 6.8l2 9.2a5.6 5.6 0 0 1-9.3 5.2l-5.1-4.6H18.3l-5.1 4.6a5.6 5.6 0 0 1-9.3-5.2l2-9.2a8.5 8.5 0 0 1 8.3-6.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 12v8m-4-4h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="33" cy="14" r="1.5" fill="currentColor" />
      <circle cx="37" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}
