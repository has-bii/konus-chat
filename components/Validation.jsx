import React from "react";
import PropTypes from "prop-types";

function Validation({ message }) {
  if (message)
    return <div className="mt-2 mb-1 font-medium text-red-600">{message}</div>;
  else return;
}

Validation.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Validation;
