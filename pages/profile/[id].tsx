import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";
import { GoVerified } from "react-icons/go";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const videos = showUserVideos ? "border-black border-b-2" : "text-gray-400";
  const liked = !showUserVideos ? "border-black border-b-2" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userVideos, userLikedVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 mb-4 md:gap-10 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            alt="user profile"
            layout="responsive"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="flex gap-1 items-center justify-center text-base text-primary font-bold lowercase md:text-2xl tracking-wider">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="text-xs text-gray-400 capitalize md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>

      {/* videos and liked tabs */}
      <div>
        <div className="flex border-gray-200 border-b-2 bg-white gap-10 mt-10 mb-10 w-full">
          <p
            onClick={() => setShowUserVideos(true)}
            className={`text-xl font-semibold mt-2 cursor-pointer ${videos}`}
          >
            Videos
          </p>
          <p
            onClick={() => setShowUserVideos(false)}
            className={`text-xl font-semibold mt-2 cursor-pointer ${liked}`}
          >
            Liked
          </p>
        </div>

        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
