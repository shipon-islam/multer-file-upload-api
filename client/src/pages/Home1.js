import React from "react";
import { UserAuth } from "../api/PostApi";
import Home from "./Home";

export default function Home1() {
  const { apidata } = UserAuth();
  return (
    <div>
      <Home apidata={apidata} />
    </div>
  );
}
