import React from "react";
import Navbar from "./../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

export default function UserProfilePage() {
  return (
    <Navbar>
      <h1 className="mx-auto text-2xl">User Profile</h1>
      <UserProfile></UserProfile>
    </Navbar>
  );
}
