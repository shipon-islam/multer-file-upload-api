import axios from "axios";
import React, { useState } from "react";

export default function CreatePost() {
  const [post, setpost] = useState("");
  const [postImage, setpostImage] = useState("");
  const handlePost = async () => {
    console.log(postImage);
    const formData = new FormData();
    formData.append("profile_image", postImage);
    formData.append("post", post);
    const res = await axios.post("/profile/status", formData);
    console.log(res);
  };

  return (
    <div>
      <input
        className="border-2 border-red-500"
        type="text"
        onChange={(e) => setpost(e.target.value)}
      />
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => setpostImage(e.target.files[0])}
      />
      <button onClick={handlePost}>post</button>
    </div>
  );
}
