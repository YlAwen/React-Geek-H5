import React from "react";
type Props = {
  type: string;
  className?: string;
  onClick?: () => void;
};
export default function Icon({ type, className, onClick }: Props) {
  return (
    <svg onClick={onClick} className={`icon ${className}`} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}
