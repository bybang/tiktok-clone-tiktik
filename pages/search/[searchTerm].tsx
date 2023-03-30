import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";
import { GoVerified } from "react-icons/go";
import { useRouter } from "next/router";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import useAuthStore from "../../store/authStore";
import Link from "next/link";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);

  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const accounts = isAccounts ? "border-black border-b-2" : "text-gray-400";
  const isVideos = !isAccounts ? "border-black border-b-2" : "text-gray-400";

  console.log(videos);
  return (
    <div className="w-full">
      <div className="flex border-gray-200 border-b-2 bg-white gap-10 mt-10 mb-10 w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold mt-2 cursor-pointer ${accounts}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold mt-2 cursor-pointer ${isVideos}`}
        >
          Videos
        </p>
      </div>

      {/* acutal content here */}
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className="flex gap-3 font-semibold rounded border-b-2 border-gray-300 p-2 cursor-pointer mt-5">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      alt="user profile"
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
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:justify-start md:mt-16">
          {videos.length > 0 ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard key={idx} post={video} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
