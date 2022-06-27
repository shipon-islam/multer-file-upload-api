import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar/avatar.jpg";

export default function Logout() {
  const navigate = useNavigate();

  const [users, setuser] = useState({});
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    axios
      .get("/user/get")
      .then((res) => {
        if (res) {
          setuser(res.data);
          setIsUser(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = async () => {
    const res = await axios.delete("/user/logout");

    if (res) {
      console.log("logout successfull");
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-200 w-full h-screen">
      <div className="bg-white py-16 w-1/5">
        <div className="flex flex-col mx-4 space-y-2">
          <img
            className="w-16 h-16 mx-auto rounded-full border-2 border-blue-600"
            src={isUser ? users.avatar : avatar}
            alt="dfd"
          />
          <p className="uppercase text-center font-mono font-bold ">
            {isUser ? users.username : "mr.john"}
          </p>
          <p className="uppercase text-center font-mono font-bold ">
            {isUser ? users.email : "john@gmail.com"}
          </p>
          <div>
            <button
              className="bg-blue-500 px-3 uppercase text-white rounded-md mx-auto block"
              onClick={logout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
