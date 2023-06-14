"use client";

import RegisterButton from "@components/RegisterButton";
import Layout from "@components/Layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import getToken from "@lib/getToken";

export default function Register({ user }) {
  const router = useRouter();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    if (user) router.replace("/");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/auth/register", {
        fullName: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      })
      .then(({ data }) => {
        if (data.status === 200) router.replace("/");
        else console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="flex content-center justify-center w-full h-screen md:w-auto md:h-auto md:p-8 md:px-10 md:rounded-xl md:border md:border-white/40 backdrop-blur-sm bg-white/[.05]">
        <div className="flex flex-col content-center justify-center">
          <div className="mb-4 text-3xl font-bold text-center text-white">
            Create New Account
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full name */}
            <div className="mb-4">
              <label
                className="block mb-1 font-light text-white text-md"
                htmlFor="email"
              >
                Full Name
              </label>
              <input
                id="name"
                placeholder="Enter full name"
                type="text"
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
                ref={nameRef}
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label
                className="block mb-1 font-light text-white text-md"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                placeholder="Enter email address"
                type="email"
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
                ref={emailRef}
                required
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <label
                className="block mb-1 font-light text-white text-md"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                placeholder="Enter password"
                type="password"
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
                ref={passRef}
                required
              />
            </div>
            <RegisterButton />
          </form>

          {/* continue with */}
          <div className="flex flex-row items-center justify-between my-5 flex-nowrap">
            <div className="h-px bg-white/60 grow" />
            <div className="px-2 text-sm font-light text-center shrink text-white/60">
              or register with
            </div>
            <div className="h-px bg-white/60 grow" />
          </div>

          {/* Login with Google */}
          <button
            type="button"
            className="flex items-center justify-center w-full font-bold text-black bg-white rounded-xl h-11"
          >
            <svg
              className="w-5 h-5 mr-2 -ml-1"
              xmlns="http://www.w3.org/2000/svg"
              width="2443"
              height="2500"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
              id="google"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Google
          </button>

          <div className="mt-4 font-light text-center text-md text-white/60">
            Already have account?{" "}
            <Link href="/auth/login" className="font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = req.cookies.JWT ? req.cookies.JWT : "";
  let user;

  if (token) {
    user = await getToken(token);
  } else {
    user = null;
  }

  return { props: { user } };
}
