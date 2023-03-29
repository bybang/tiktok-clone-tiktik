import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "./NoResults";
import useAuthStore from "../store/authStore";

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
  const { userProfile } = useAuthStore();

  return (
    <div className="border-gray-200 border-t-2 border-b-2 pt-4 px-10 bg-[#F8F8F8] pb-[100px] lg:pb-0">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length ? (
          <div>videos</div>
        ) : (
          <NoResults text="No comments yet!" />
        )}
      </div>

      {userProfile && (
        <div className="absolute pb-6 px-2 md:px-10 bottom-0 right-0">
          <form onSubmit={addComment} action="" className="flex gap-4">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              value={comment}
              placeholder="Add comment..."
              className="flex-1 bg-primary text-base font-medium border-2 border-gray-100 px-6 py-4 rounded-lg w-[250px] md:w-[700px] lg:w-[350px] focus:outline-none focus:border-2 focus:border-gray-300"
            />
            <button onClick={addComment} className="text-base text-gray-400">
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
