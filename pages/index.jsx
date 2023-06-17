import Layout from "@components/Layout";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { useState } from "react";
import Chats from "@components/Chats";
import ProfileOther from "@components/ProfileOther";
import Conversation from "@components/Conversation";
import Image from "next/image";
import SideBar from "@components/SideBar";

export default function IndexPage() {
  const { data: session } = useSession();
  const [newMessageToggle, setNewMessageToggle] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("Chats");
  const { image } = session.user;

  const searching = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  const openNewMessage = () => {
    setNewMessageToggle(!newMessageToggle);
    setTitle(title === "Chats" ? "New Chat" : "Chats");
  };

  return (
    <Layout>
      <div className="flex w-full h-full gap-6 text-white md:p-8">
        <SideBar image={image} />
        <div className="hidden w-full overflow-hidden lg:flex lg:flex-col backdrop-blur-sm rounded-xl bg-white/[.15]">
          <ProfileOther user={session.user} />
          <Conversation />
        </div>
        {!newMessageToggle && (
          <div className="backdrop-blur-sm w-full lg:w-1/3 bg-white/[.15] flex flex-col md:rounded-xl">
            <Header title={title} />
            <SearchInput
              value={value}
              searching={searching}
              func={openNewMessage}
              placeholder="Find chat.."
            />
            <Chats />
          </div>
        )}
        {newMessageToggle && (
          <div className="backdrop-blur-sm w-full lg:w-1/3 bg-white/[.15] flex flex-col md:rounded-xl">
            <Header title={title} />
            <SearchInput
              func={openNewMessage}
              value={value}
              searching={searching}
              placeholder="Send new message to.."
            />
            {/* <Chats /> */}
          </div>
        )}
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
