import Image from "next/image";
import PropTypes from "prop-types";

function Users({ users = [], search }) {
  return (
    <>
      <div className="overflow-y-auto no-scrollbar">
        {users
          .filter((user) => {
            return search.toLowerCase() === ""
              ? user
              : user.username.toLowerCase().includes(search);
          })
          .map((user) => (
            <a
              key={user._id}
              href="#"
              className="flex items-center justify-center p-4 m-2 overflow-hidden transition rounded-xl bg-black/10 hover:bg-black/20"
            >
              {/* Image */}
              <div className="flex">
                <div className="relative w-16 h-16 mr-2 overflow-hidden rounded-full">
                  <Image
                    src={user.image ? user.image : "/img/profile.jpg"}
                    fill={true}
                    alt="Profile"
                    sizes="(max-width: 768px) 100vw"
                    quality={50}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* user */}
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-end w-full gap-4">
                  <div className="flex-1 w-12 text-2xl font-medium text-white truncate">
                    {user.name}
                  </div>
                </div>
                <div className="flex flex-row items-center w-full gap-4">
                  <div className="flex-1 w-12 truncate text-md text-white/75">
                    @{user.username}
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    </>
  );
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Users;
