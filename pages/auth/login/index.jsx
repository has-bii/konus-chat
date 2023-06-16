import Layout from "@components/Layout";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Validation from "@components/Validation";
import MyButton from "@components/MyButton";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const typing = () => {
    setMessage("");
  };

  const signGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(!loading);
    setMessage("");

    const res = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passRef.current.value,
      callbackUrl: "/",
    });

    if (res.ok) router.push("/");
    else {
      setLoading(false);
      setMessage("Invalid email or password!");
    }
  };

  return (
    <Layout>
      <div className="flex content-center justify-center w-full h-screen md:w-auto md:h-auto md:p-8 md:px-10 md:rounded-xl md:border md:border-white/40 backdrop-blur-sm bg-white/[.05]">
        <div className="flex flex-col content-center justify-center">
          <div className="mb-4 text-3xl font-bold text-center text-white">
            Welcome back
          </div>

          <form onSubmit={handleSubmit}>
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
                ref={emailRef}
                onChange={typing}
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-3">
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
                ref={passRef}
                onChange={typing}
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
                required
              />
            </div>

            <Validation message={message} />

            <MyButton text="Sign in" width="w-full" isLoading={loading} />
          </form>

          {/* continue with */}
          <div className="flex flex-row items-center justify-between my-5 flex-nowrap">
            <div className="h-px bg-white/60 grow" />
            <div className="px-2 text-sm font-light text-center shrink text-white/60">
              or continue with
            </div>
            <div className="h-px bg-white/60 grow" />
          </div>

          {/* Login with Google */}
          <MyButton text="Google" icon="/icon/google.svg" func={signGoogle} />

          {/* Create new account */}
          <div className="mt-4 font-light text-center text-md text-white/60">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-medium">
              Create one
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
