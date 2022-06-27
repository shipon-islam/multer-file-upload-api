import axios from "axios";
import React, { useRef, useState } from "react";
import { UserAuth } from "../api/PostApi";

export default function Post() {
  const fileRef = useRef();
  const [post, setpost] = useState("");
  const [postImage, setpostImage] = useState("");
  const { setData } = UserAuth();
  const [loading, setLoading] = useState(false);
  const handlePost = async () => {
    if (post || postImage) {
      const formData = new FormData();
      formData.append("profile_image", postImage);
      formData.append("post", post);
      setLoading(true);
      const res = await axios.post("/profile/status", formData);

      console.log(res);
      setpost("");
      setpostImage(null);
      setLoading(false);
      setData(res);
    } else {
      alert("plz fill the field");
    }
  };

  return (
    <div>
      <div className="flex">
        <div>
          <div>
            <input
              className="focus:outline-none border border-black rounded-lg w-[350px] pl-2 h-12 text-xl"
              type="text"
              placeholder="write your status.."
              onChange={(e) => setpost(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-1">
            <div>
              <button onClick={() => fileRef.current.click()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="inline uppercase font-bold relative top-1">
                  photo
                </div>
              </button>
              <input
                ref={fileRef}
                onChange={(e) => setpostImage(e.target.files[0])}
                multiple={false}
                type="file"
                className="hidden"
              />
            </div>
            <p className="w-[200px] overflow-hidden">
              {postImage && postImage.name}
            </p>
            <button
              className="bg-green-500/80 text-md font-bold uppercase px-2 rounded-md hover:bg-gray-500 hover:text-white"
              onClick={handlePost}
            >
              post
            </button>
          </div>
          {loading && <p>loading..</p>}
        </div>
      </div>
    </div>
  );
}
