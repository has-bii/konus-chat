import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="w-full mt-2 font-bold bg-white my-button h-11 rounded-xl text-green-leaf"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}
