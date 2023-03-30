import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";

import Link from "next/link";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink =
    "flex items-center justify-center rounded gap-3 hover:bg-primary p-3 xl:justify-start cursor-pointer font-semibold text-[#F51997]";

  return (
    <div>
      <div
        onClick={() => setShowSidebar((prev) => !prev)}
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="flex flex-col xl:w-400 w-20 justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
