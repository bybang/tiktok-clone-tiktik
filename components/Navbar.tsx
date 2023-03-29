import Image from "next/image";
import Link from "next/link";
import React from "react";
import useAuthStore from "../store/authStore";

import Logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className="flex w-full items-center justify-between px-4 py-2 border-b-2 border-gray-200">
      <Link href={"/"}>
        <div className="w-[100px] md:w-[130px]">
          <Image
            className=""
            src={Logo}
            alt="TikTik"
            layout="responsive"
            priority={true}
          />
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex items-center gap-2 text-md font-semibold px-2 border-2 md:px-4">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="">
                <>
                  <Image
                    src={userProfile.image}
                    width={40}
                    height={40}
                    alt="profile photo"
                    className="rounded-full cursor-pointer shadow-md"
                  />
                </>
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
