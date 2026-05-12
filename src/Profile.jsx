import { useEffect, useState } from "react";
import formatDate from "../utils/formatDate";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Profile() {
  const { userState, tokenState } = useAuth();
  console.log(userState);
  return (
    <>
      <h1>Welcome {userState.name}</h1>
      <h2>Profile Info:</h2>
      <div className="profile-info">
        <p>Name: {userState.name}</p>
        <p>Email: {userState.email}</p>
        <p>Role: {userState.usertype}</p>
        <p>Screenname: {userState.screenname}</p>
      </div>
      <div className="change-password">
        <h3>Change Password:</h3>
      </div>
    </>
  );
}

export default Profile;
