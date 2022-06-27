import React from "react";

export default function PostHeader({ post }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="w-11 h-11">
          <img
            className="w-full rounded-full h-full"
            src={post.user.avatar}
            alt="header_pic"
          />
        </div>
        <div className="pl-1">
          <h3 className="font-semibold capitalize">{post.user.username}</h3>
          <p>1 hr</p>
        </div>
      </div>
      <button className="font-bold text-xl">...</button>
    </div>
  );
}
