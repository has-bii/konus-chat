import Layout from "@components/Layout";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import SideBar from "@components/SideBar";
import React from "react";
import MyProfile from "@components/MyProfile";

export default function index() {
  const { data: session } = useSession();
  const { image } = session.user;
  return (
    <Layout>
      <div className="flex w-full h-full gap-6 text-white md:p-8">
        <SideBar image={image} />
        <MyProfile user={session.user} />
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
