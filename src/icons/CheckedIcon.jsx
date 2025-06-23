const CheckedIcon = ({ height }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 24 24"
      fill="#2bff24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.5"
        cx="12"
        cy="12"
        r="10"
        stroke="#19ff34"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 12.5L10.5 14.5L15.5 9.5"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckedIcon;
