import Layout from "@components/Layout";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Profile from "@components/Profile";
import SearchInput from "@components/SearchInput";
import { useState } from "react";
import Chats from "@components/Chats";
import ProfileOther from "@components/ProfileOther";
import Conversation from "@components/Conversation";

export default function IndexPage() {
  const { data: session } = useSession();
  const [value, setValue] = useState("");

  const searching = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  return (
    <Layout>
      <div className="flex w-full h-full gap-6 text-white md:p-12">
        <div className="hidden w-full lg:flex lg:flex-col backdrop-blur-sm rounded-xl bg-white/[.15]">
          <ProfileOther user={session.user} />
          <Conversation />
        </div>
        <div className="backdrop-blur-sm w-full lg:w-1/2 bg-white/[.15]  flex flex-col md:rounded-xl">
          <Profile user={session.user} />
          <SearchInput value={value} searching={searching} />
          <Chats />
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
