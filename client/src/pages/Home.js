import React from "react";
import CommentDiv from "../components/CommentDiv";
import CommentShowArea from "../components/CommentShowArea";
import Post from "../components/Post";
import PostHeader from "../components/PostHeader";

export default function Home({ apidata }) {
  return (
    <div className="container mx-auto  bg-gray-600/10">
      <div className="mx-auto w-fit mt-2">
        <Post />
        {apidata.map((post) => (
          <div key={post._id} className="w-[350px] px-2 mt-2 bg-white">
            <PostHeader post={post} />
            <p>{post.post}</p>
            {post.avatar && (
              <div className="">
                <img
                  src={post.avatar && post.avatar}
                  className="w-full max-h-[300px]"
                  alt=""
                />
              </div>
            )}
            <CommentDiv posts={post} />
            <hr />
            <div id={post._id} className="hidden bg-white mt-1">
              <CommentShowArea status={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
