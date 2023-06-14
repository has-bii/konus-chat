import Layout from "@components/Layout";
import LogoutButton from "@components/LogoutButton";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <Layout>
        <div className="flex content-center justify-center w-full h-screen md:w-auto md:h-auto md:p-8 md:px-10 md:rounded-xl md:border md:border-white/40 backdrop-blur-sm bg-white/[.05]">
          <div className="flex flex-col content-center justify-center">
            <div className="text-3xl font-bold text-center text-white">
              Welcome Back! <br></br>
              {session.user.name}
            </div>

            <LogoutButton />
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="flex content-center justify-center w-full h-screen md:w-auto md:h-auto md:p-8 md:px-10 md:rounded-xl md:border md:border-white/40 backdrop-blur-sm bg-white/[.05]">
          <div className="flex flex-col content-center justify-center">
            <div className="text-3xl font-bold text-center text-white">
              Welcome Back!
            </div>

            <button
              className="w-full mt-2 font-bold bg-white h-11 rounded-xl text-green-leaf"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}
