import React, { useEffect } from "react";
import SettingsFrom from "./SettingsForm";
import { useDispatch } from "react-redux";
import { fetchAsyncSettings } from "../features/settings/settingSlice";

const Settings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Settings");
    const value = { setting_id: "627bd58b16cc20581d15bded" };
    dispatch(fetchAsyncSettings(value));
  }, [dispatch]);
  return (
    <div>
      <SettingsFrom></SettingsFrom>
    </div>
  );
};

export default Settings;
