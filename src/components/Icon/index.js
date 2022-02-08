import React from "react";
import propTypes from "prop-types";

export default function Icon({ type, className, ...rest }) {
  return (
    <svg {...rest} className={`icon ${className}`} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}

Icon.propTypes = {
  type: propTypes.string.isRequired,
};
