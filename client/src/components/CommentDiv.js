import axios from "axios";
import React from "react";
import { UserAuth } from "../api/PostApi";

export default function CommentDiv({ posts }) {
  const { setData } = UserAuth();
  const handleComment = (id) => {
    const modal = document.getElementById(id);
    modal.classList.toggle("hidden");
  };
  const handleClick = async (id) => {
    const res = await axios.put(`/profile/likes/${id}`);
    setData(res);
    console.log(res);
  };
  return (
    <div>
      <hr />
      <div className="flex justify-between py-1 ">
        <button className="btn" onClick={() => handleClick(posts._id)}>
          like({posts.likes.length})
        </button>
        <button className="btn" onClick={() => handleComment(posts._id)}>
          comment({posts.comments.length})
        </button>
        <button className="btn">share</button>
      </div>
    </div>
  );
}
