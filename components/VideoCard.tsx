import { NextPage } from "next";
import { Video } from "../types";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  // same as using document.getelementbyid in html, this videoRef is going to attached to the html video element(then this ref has pause() and play())
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col pb-6 border-gray-200 border-b-2">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href="">
              <>
                <Image
                  src={post.postedBy.image}
                  width={62}
                  height={62}
                  alt="profile photo"
                  className="rounded-full"
                  layout="responsive"
                />
              </>
            </Link>
          </div>

          <div>
            <Link href="">
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 font-bold text-primary md:text-base">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-base" />
                </p>
                <p className="font-medium text-xs text-gray-500 capitalize hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Videos  */}
      <div className="flex gap-4 relative lg:ml-20">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className="h-[300px] w-[200px] rounded-2xl md:h-[400px] lg:h-[530px] lg:w-[600px] bg-gray-100 cursor-pointer"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute flex p-3 gap-10 w-[100px] bottom-6 left-10 md:w-[50px] md:left-10 lg:left-0 lg:justify-between cursor-pointer lg:w-[600px] lg:px-10">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-2xl text-black lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-2xl text-black lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-2xl text-black lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-2xl text-black lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
