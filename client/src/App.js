import React from "react";
import PostApi from "./api/PostApi";
import Routers from "./routes/Routers";

export default function App() {
  return (
    <PostApi>
      <Routers />
    </PostApi>
  );
}
