import axios from "axios";
import React, { useState } from "react";
import { UserAuth } from "../api/PostApi";
import Replay from "./Replay";

export default function CommentShowArea({ status }) {
  const [commentValue, setCommentValue] = useState("");
  const { setData } = UserAuth();
  const handleReplay = (id) => {
    const modal = document.getElementById(id);
    modal.classList.toggle("hidden");
  };
  const handleComment = async (postId) => {
    try {
      if (!commentValue) {
        alert("plzz write comment then try");
      } else {
        const data = await axios.post("/profile/comment/" + postId, {
          coment: commentValue,
        });
        console.log(data);
        setData(data);
        setCommentValue("");
      }
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <input
          className="border border-gray-600 focus:outline-none rounded-md pl-1"
          type="text"
          placeholder="write comment"
          onChange={(e) => setCommentValue(e.target.value)}
          value={commentValue}
        />
        <button
          onClick={() => handleComment(status._id)}
          className="bg-gray-600/40 px-2 py-[1.4px] ml-[1px] rounded-md"
        >
          ok
        </button>
      </div>
      {status.comments.map((comments) => (
        <div key={comments._id}>
          <div className="flex mt-2">
            <div>
              <img
                className="w-[30px] h-[34px] rounded-full"
                src={comments.user.avatar}
                alt="user"
              />
            </div>{" "}
            <div className="bg-gray-600/10 px-1 py-2 rounded-md">
              <h5 className="font-semibold capitalize text-sm">
                {comments.user.username}
              </h5>
              <p className="font-sans w-[180px]">{comments.body}</p>
            </div>
          </div>
          <button
            className="block ml-auto w-[300px]"
            onClick={() => handleReplay(comments._id)}
          >
            replay
          </button>
          <div id={comments._id} className="hidden">
            <Replay replays={comments} />
          </div>
        </div>
      ))}
    </div>
  );
}
