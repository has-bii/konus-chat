import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Alert({ alert, show, func }) {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        func(false);
      }, 3000);
    }
  }, [show]);

  return (
    <div className="fixed top-0 right-0 w-full ease-in-out bg-transparent">
      <div
        className={`alert px-6 py-3 m-4 font-light rounded-xl 
      ${alert.ok ? "bg-green-400" : "bg-red-500"} ${show ? "show" : ""}`}
      >
        {alert.message}
      </div>
    </div>
  );
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  func: PropTypes.func,
};

export default Alert;
