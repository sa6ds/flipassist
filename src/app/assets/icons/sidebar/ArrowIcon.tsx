export default function ArrowIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transform transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
