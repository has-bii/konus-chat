import React, { useEffect, useRef, useState } from "react";
import MyButton from "./MyButton";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "./Alert";

function ChangePw({ user }) {
  const [validation, setValidation] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    ok: false,
  });

  const changePwHandler = async (e) => {
    e.preventDefault();

    if (validation.length) return;

    const res = await axios.post("/api/changepw", {
      newPw: newPw,
      id: user.id,
    });

    if (res.data) {
      setMessage({
        message: res.data.message,
        ok: true,
      });
      setShow(true);

      setTimeout(() => setShow(false), 3000);
    } else {
      console.log("Undefined error has occurred!");
    }
  };

  useEffect(() => {
    if (confirmPw.length == 0 || newPw.length == 0) {
      setValidation("");
    } else if (newPw.length < 5) {
      setValidation("Password must contain 6 characters");
    } else {
      if (newPw === confirmPw) {
        setValidation("");
      } else {
        setValidation("Passwords do not match!");
      }
    }
  }, [newPw, confirmPw]);

  return (
    <>
      {/* Change Password */}
      <div className="text-xl font-medium">Change Password</div>
      <div className="flex flex-col w-full gap-6 p-6 bg-white/20 h-fit rounded-xl">
        {/* Current */}
        <form onSubmit={changePwHandler} className="flex flex-col w-fit">
          <label className="flex flex-col w-auto mb-6 text-lg font-light lg:w-fit">
            New Password
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-auto px-4 py-2 mt-2 text-lg font-semibold rounded-lg placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
              placeholder="Enter new password"
            />
          </label>
          <label className="flex flex-col w-auto mb-6 text-lg font-light lg:w-fit">
            Confirm Password
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-auto px-4 py-2 mt-2 text-lg font-semibold rounded-lg placeholder:text-white/60 placeholder:font-normal bg-black/30 outline-0"
              placeholder="Enter confirm password"
              required
            />
            <span className="mt-2 text-sm font-semibold text-red-600">
              {validation}
            </span>
          </label>
          <div className="lg:self-end ">
            <MyButton text="Save" />
          </div>
        </form>
      </div>
      <Alert alert={message} show={show} />
    </>
  );
}

ChangePw.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ChangePw;
