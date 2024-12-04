import { FC } from "react";

type SpinnerProps = {
  size?: number;
  stroke?: string;
};

export const Spinner: FC<SpinnerProps> = ({ size = 65, stroke = "black" }) => {
  return (
    <svg
      className="spinner"
      width={`${size}px`}
      height={`${size}65px`}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        fill="none"
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
};
