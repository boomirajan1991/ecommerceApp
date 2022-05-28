import React, { useEffect } from "react";
import ProfileForm from "./ProfileForm";
import { useDispatch } from "react-redux";
import { fetchAsyncProfile } from "../features/settings/settingSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log("Profile");
    const currentUser = { user_id: user._id };
    dispatch(fetchAsyncProfile(currentUser));
  }, [dispatch, user._id]);
  return (
    <div>
      <ProfileForm user={user}></ProfileForm>
    </div>
  );
};

export default Profile;
