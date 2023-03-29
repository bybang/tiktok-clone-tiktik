import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../utils";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { Video } from "../../types";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="absolute flex flex-wrap w-full bg-white top-0 left-0 lg:flex-nowrap">
      <div className="relative flex flex-2 items-center justify-center w-[1000px] bg-black lg:w-9/12">
        <div className="absolute flex gap-6 top-6 left-2 lg:left-6 z-50">
          <p onClick={() => router.back()} className="cursor-pointer">
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        <div className="relative">
          <div className="h-[60vh] lg:h-[100vh]">
            <video
              onClick={onVideoClick}
              src={post.video.asset.url}
              ref={videoRef}
              loop
              className="h-full cursor-pointer"
            ></video>
          </div>

          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 right-5 lg:bottom-10 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-2xl text-white lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-2xl text-white lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      {/* Profile */}
      <div className="relatvie w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="mt-10 lg:mt-20">
          <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
            <div className="ml-4 w-16 h-16 md:w-20 md:h-20">
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
                <div className="flex flex-col gap-2 mt-3">
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

          {/* Caption and Like button */}
          <p className="text-lg text-gray-600 px-10">{post.caption}</p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
                likes={post.likes}
              />
            )}
          </div>

          {/* Comments */}
          <div>
            <Comments
              comment={comment}
              comments={post.comments}
              setComment={setComment}
              addComment={addComment}
              isPostingComment={isPostingComment}
            />
          </div>
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
