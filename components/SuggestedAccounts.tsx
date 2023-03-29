import useAuthStore from "@/store/authStore";
import React, { useEffect } from "react";
import { GoVerified } from "react-icons/go";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return <div></div>;
};

export default SuggestedAccounts;
