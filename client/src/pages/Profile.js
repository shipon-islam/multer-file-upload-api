import React from "react";
import { UserAuth } from "../api/PostApi";
import Home from "./Home";

export default function Profile() {
  const { status } = UserAuth();
  return (
    <div>
      <Home apidata={status} />
    </div>
  );
}
