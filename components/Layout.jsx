export default function Layout({ children }) {
  return (
    <>
      <div className="_login-bg">
        <div className="flex items-center justify-center w-full h-screen">
          {children}
        </div>
      </div>
    </>
  );
}
