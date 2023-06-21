import Layout from "@components/Layout";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { useEffect, useState } from "react";
import Chats from "@components/Chats";
import ProfileOther from "@components/ProfileOther";
import Conversation from "@components/Conversation";
import SideBar from "@components/SideBar";
import Users from "@components/Users";

export default function IndexPage() {
  const { data: session } = useSession();
  const [newMessageToggle, setNewMessageToggle] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("Chats");
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const { image } = session.user;

  const searching = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  const openNewMessage = () => {
    setNewMessageToggle(!newMessageToggle);
    setTitle(title === "Chats" ? "New Chat" : "Chats");
  };

  const fetchChats = () => {
    fetch(`/api/chat?id=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((chat) => {
          chat.id = chat._id;
          delete chat._id;

          chat.user =
            chat.participants[0]._id === session.user.id
              ? chat.participants[1]
              : chat.participants[0];

          delete chat.participants;
          delete chat.__v;

          const date = new Date(chat.date);

          let hours = date.getHours();

          if (hours < 10) {
            hours = "0" + hours.toString();
          }

          let minutes = date.getMinutes();

          if (minutes < 10) {
            minutes = "0" + minutes.toString();
          }

          chat.date = hours + ":" + minutes;

          setChats([...chats, chat]);
        });
      });
  };

  const fetchUser = () => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchChats();
    fetchUser();
  }, []);

  return (
    <Layout>
      <div className="flex w-full h-full gap-6 text-white md:p-8">
        <SideBar image={image} />
        <div className="hidden w-full overflow-hidden lg:flex lg:flex-col backdrop-blur-sm rounded-xl bg-white/[.15]">
          <ProfileOther user={session.user} />
          <Conversation />
        </div>
        {!newMessageToggle && (
          <div className="backdrop-blur-sm overflow-hidden w-full lg:w-1/3 bg-white/[.15] flex flex-col md:rounded-xl">
            <Header title={title} />
            <SearchInput
              value={value}
              searching={searching}
              func={openNewMessage}
              placeholder="Find chat.."
            />
            <Chats chats={chats} />
          </div>
        )}
        {newMessageToggle && (
          <div className="backdrop-blur-sm overflow-hidden w-full lg:w-1/3 bg-white/[.15] flex flex-col md:rounded-xl">
            <Header title={title} />
            <SearchInput
              func={openNewMessage}
              value={value}
              searching={searching}
              placeholder="Send new message to.."
            />
            <Users users={users} search={value} />
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
