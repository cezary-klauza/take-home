import { FC } from "react";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<
  Omit<ButtonProps, "children"> & { isExpanded: boolean }
> = ({ isExpanded, ...props }) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center w-6"
      {...props}
    >
      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};

export const ToggleButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="relative text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
      {...props}
    >
      {children}
    </button>
  );
};
