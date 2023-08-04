import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUserAsync, selectLoggedInUser } from "../authSlice";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(logoutUserAsync(user.id));
    console.log("logout user :", user.id);
  }, [dispatch, user.id]);

  return <div>{!user && <Navigate to={"/"} replace={true}></Navigate>}</div>;
}
