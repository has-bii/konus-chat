import Layout from "@components/Layout";
import { useRouter } from "next/router";
import getToken from "@lib/getToken";
import axios from "axios";

export default function IndexPage({ user }) {
  const router = useRouter();
  const userLogged = JSON.parse(user);

  const logout = async (e) => {
    e.preventDefault();

    await axios.post("/api/auth/logout").then(({ data }) => {
      console.log(data);

      if (data.status === 200) router.push("/");
    });
  };

  return (
    <Layout>
      <div className="flex content-center justify-center w-full h-screen md:w-auto md:h-auto md:p-8 md:px-10 md:rounded-xl md:border md:border-white/40 backdrop-blur-sm bg-white/[.05]">
        <div className="flex flex-col content-center justify-center">
          <div className="text-3xl font-bold text-center text-white">
            Welcome Back! {userLogged ? userLogged.fullName : ""}
          </div>

          {userLogged ? (
            <button
              type="button"
              className="w-full mt-2 font-bold bg-white h-11 rounded-xl text-green-leaf"
              onClick={logout}
            >
              Sign out
            </button>
          ) : (
            <button
              className="w-full mt-2 font-bold bg-white h-11 rounded-xl text-green-leaf"
              onClick={() => router.push("/auth/login")}
            >
              Sign in
            </button>
          )}
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
