"use client";

import Layout from "@components/Layout";
import Validation from "@components/Validation";
import MyButton from "@components/MyButton";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const typing = () => {
    setMessage("");
  };

  const signGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (/^[A-Za-z\s]*$/.test(nameRef.current.value)) {
      setMessage("");
    } else {
      setMessage("Name must contain only letters!");
      setLoading(false);
      return;
    }

    if (passRef.current.value.length < 6) {
      setMessage("Password at least 6 characters!");
      setLoading(false);
      return;
    } else {
      setMessage("");
    }

    await axios
      .post("/api/auth/register", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      })
      .then(({ data }) => {
        if (data.status === 200) router.replace("/");
        else {
          setMessage(data.message);
          setLoading(false);
        }
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
            Create an account
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
                onChange={typing}
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
                onChange={typing}
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
                onChange={typing}
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
                ref={passRef}
                required
              />
            </div>

            <Validation message={message} />

            <MyButton text="Register" isLoading={loading} width="w-full" />
          </form>

          {/* continue with */}
          <div className="flex flex-row items-center justify-between mt-5 flex-nowrap">
            <div className="h-px bg-white/60 grow" />
            <div className="px-2 text-sm font-light text-center shrink text-white/60">
              or continue with
            </div>
            <div className="h-px bg-white/60 grow" />
          </div>

          {/* Login with Google */}
          <MyButton text="Google" icon="/icon/google.svg" func={signGoogle} />

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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  return { props: {} };
}
