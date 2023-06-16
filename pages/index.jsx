import Layout from "@components/Layout";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import MyButton from "@components/MyButton";
import Profile from "@components/Profile";

export default function IndexPage() {
  const { data: session } = useSession();

  console.log(session);

  return (
    // <Layout>
    //   <div className="flex content-center justify-center w-full h-screen md:w-auto md:h-auto md:p-8 md:px-10 md:rounded-xl md:border md:border-white/40 backdrop-blur-sm bg-white/[.05]">
    //     <div className="flex flex-col content-center justify-center">
    //       <div className="text-3xl font-bold text-center text-white">
    //         Welcome back! <br></br>
    //         {session.user.name}
    //       </div>

    //       <MyButton text="Log out" func={signOut} />
    //     </div>
    //   </div>
    // </Layout>

    <Layout>
      <div className="flex w-screen h-screen gap-6 p-12">
        <div className="flex-1 hidden md:flex backdrop-blur-sm bg-white/[.15] text-white rounded-xl justify-center items-center p-5">
          test
        </div>
        <div className="flex-1 md:flex-initial md:w-96 backdrop-blur-sm bg-white/[.15] text-white rounded-xl flex p-5">
          <Profile user={session.user} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
