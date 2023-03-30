import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { IUser } from "../types";
import Image from "next/image";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  // As soon as the page loads, fetch all users
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="border-gray-200 pb-4 xl:border-b-2">
      <p className="m-3 mt-4 text-gray-500 font-semibold hidden xl:block">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className="flex gap-3 p-2 font-semibold rounded hover:bg-primary cursor-pointer">
              <div className="w-8 h-8">
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  alt="user profile"
                  layout="responsive"
                  className="rounded-full"
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-base text-primary font-bold lowercase">
                  {user.userName.replaceAll(" ", "")}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
