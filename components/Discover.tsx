import React from "react";
import { topics } from "../utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "flex items-center justify-center px-3 py-2 gap-2 rounded text-[#FF1997] xl:rounded-full xl:border-2 xl:border-[#F51997] hover:bg-primary cursor-pointer";

  const topicStyle =
    "flex items-center justify-center px-3 py-2 gap-2 rounded text-black xl:rounded-full xl:border-2 xl:border-gray-300 hover:bg-primary cursor-pointer";

  return (
    <div className="xl:border-gray-200 xl:border-b-2 pb-6">
      <p className="m-3 mt-4 text-gray-500 font-semibold hidden xl:block">
        Popular Topics
      </p>
      <div className="flex flex-wrap gap-3">
        {topics.map((item) => (
          <Link key={item.name} href={`/?topic=${item.name}`}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-base">
                {item.icon}
              </span>
              <span className="font-medium text-base capitalize hidden xl:block">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
