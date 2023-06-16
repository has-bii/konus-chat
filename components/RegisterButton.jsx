export default function RegisterButton({ alert }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center w-full gap-2 mt-2 font-bold text-center bg-white my-button group hover:bg-black hover:text-white h-11 rounded-xl"
    >
      {alert.status ? (
        <div className="w-5 h-5 border-4 border-black border-solid rounded-full group-hover:border-white animate-spin border-t-white group-hover:border-t-black"></div>
      ) : (
        ""
      )}
      Register
    </button>
  );
}
