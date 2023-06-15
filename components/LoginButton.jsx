export default function LoginButton({ alert }) {
  return (
    <button className="inline-flex items-center justify-center w-full gap-2 mt-2 font-bold text-center bg-white h-11 rounded-xl text-green-leaf ">
      {alert.status === "loading" ? (
        <div className="w-5 h-5 border-4 border-black border-solid rounded-full animate-spin border-t-transparent"></div>
      ) : (
        ""
      )}
      Sign in
    </button>
  );
}
