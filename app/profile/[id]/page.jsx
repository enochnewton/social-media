"use client";
import Profile from "@components/Profile";
import React from "react";
import { useParams } from "next/navigation";

const UserProfile = () => {
  const { id } = useParams();
  return <Profile id={id} userProfile='true' />;
};

export default UserProfile;
