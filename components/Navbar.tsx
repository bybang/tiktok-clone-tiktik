import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";

import Logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import { IUser } from "../types";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState<IUser | null>();

  const { userProfile, addUser, removeUser }: any = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  // console.log("user: ", user);

  return (
    <div className="flex w-full items-center justify-between px-4 py-2 border-b-2 border-gray-200 ">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] md:h-[30px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            layout="responsive"
            priority={true}
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute top-10 -left-20 bg-white md:static"
        >
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            value={searchValue}
            placeholder="Search accounts and videos"
            className="font-medium border-2 border-gray-100 bg-primary p-3 rounded-full w-[300px] md:w-[350px] md:top-0 md:text-base focus:outline-none focus:border-2 focus:border-gray-300"
          />
          <button
            onClick={handleSearch}
            className="absolute border-l-2 border-gray-300 text-2xl text-gray-400 top-4 right-6 pl-4 md:right-5"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex items-center gap-2 text-md font-semibold px-2 border-2 md:px-4">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    alt="profile photo"
                    className="rounded-full cursor-pointer"
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="rounded-full border-2 p-2 outline-none shadow-md cursor-pointer"
            >
              <AiOutlineLogout fontSize={21} color="red" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
