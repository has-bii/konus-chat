import LoginButton from "@components/LoginButton";
import LoginGoogle from "@components/loginGoogle";
import Layout from "@components/Layout";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passRef.current.value,
      callbackUrl: "/",
    });

    if (res.ok) router.push("/");
  };

  return (
    <Layout>
      <div className="flex content-center justify-center w-full h-screen md:w-auto md:h-auto md:p-8 md:px-10 md:rounded-xl md:border md:border-white/40 backdrop-blur-sm bg-white/[.05]">
        <div className="flex flex-col content-center justify-center">
          <div className="mb-4 text-3xl font-bold text-center text-white">
            Welcome Back
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
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
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
                ref={passRef}
                className="w-full h-11 px-4 rounded-xl bg-transparent bg-gradient-to-r from-white/25 from-65% border border-white focus:border-white focus:outline-0 focus:ring-0 hover:bg-white/[.2] text-white placeholder:text-white placeholder:font-extralight"
                required
              />
            </div>
            <LoginButton />
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
          <LoginGoogle />

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

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
    props: {},
  };

  return { props: {} };
}
