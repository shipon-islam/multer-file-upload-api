import axios from "axios";
import React, { useState } from "react";
import { UserAuth } from "../api/PostApi";

export default function Replay({ replays }) {
  const [replayValue, setReplayValue] = useState("");
  const { setData } = UserAuth();
  const handleReplay = async (postId) => {
    try {
      if (!replayValue) {
        alert("plzz write comment then try");
      } else {
        const data = await axios.post("/profile/replay/" + postId, {
          rebody: replayValue,
        });
        setData(data);
        console.log(data);
        setReplayValue("");
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="ml-9">
        {replays.replies.length <= 0 ? (
          <p>You Have No Reply</p>
        ) : (
          replays.replies.map((replay) => (
            <div key={replay._id} className="flex mt-2">
              <div>
                <img
                  className="w-[25px] h-[29px] rounded-full"
                  src={replay.user.avatar}
                  alt="userf"
                />
              </div>{" "}
              <div className="bg-gray-600/10 px-1 py-2 rounded-md">
                <h5 className="font-semibold capitalize text-[0.8rem]">
                  {replay.user.username}
                </h5>
                <p className="font-sans w-[150px]">{replay.body}</p>
              </div>
            </div>
          ))
        )}
        <div>
          <input
            className="border border-gray-600 focus:outline-none rounded-md pl-1 w-[150px]"
            type="text"
            value={replayValue}
            placeholder="write comment"
            onChange={(e) => setReplayValue(e.target.value)}
          />
          <button
            className="bg-gray-600/40 px-2 py-[1.4px] ml-[1px] rounded-md"
            onClick={() => handleReplay(replays._id)}
          >
            ok
          </button>
        </div>
      </div>
    </div>
  );
}
