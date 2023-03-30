import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "./NoResults";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: Boolean;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number; // optional
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  comments,
  setComment,
  addComment,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-gray-200 border-t-2 border-b-2 pt-4 px-10 bg-[#F8F8F8] pb-[100px] lg:pb-0">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  // is the user posted this specific comment?
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div key={idx} className="items-center p-2">
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              alt="user profile"
                              layout="responsive"
                              className="rounded-full cursor-pointer"
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

                      {/* Comment messages */}
                      <div>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet!" />
        )}
      </div>

      {userProfile && (
        <div className="absolute flex flex-1 pb-6 px-2 md:px-2 lg:px-6 bottom-0 right-0">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              value={comment}
              placeholder="Add comment..."
              className="flex-1 bg-primary text-base font-medium border-2 border-gray-100 px-6 py-4 rounded-lg w-[250px] md:w-[650px] lg:w-[350px] xl:w-[420px] 2xl:w-[550px] focus:outline-none focus:border-2 focus:border-gray-300"
            />
            <button onClick={addComment} className="text-base text-gray-400">
              {isPostingComment ? "Commenting" : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
