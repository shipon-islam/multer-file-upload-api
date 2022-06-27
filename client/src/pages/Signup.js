import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const form = useRef(null);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    try {
      const data = await axios.post("/user/signup", formData);

      if (data && data.data.errors) {
        ["username", "email", "password"].forEach((ele) => {
          form.current[ele].nextElementSibling.classList.add("hidden");
          form.current[ele].classList.remove("border-2");
          form.current[ele].classList.remove("border-red-500");
        });

        const newerror = Object.keys(data.data.errors);
        newerror.forEach((err) => {
          const newdata = form.current[err].nextElementSibling;
          form.current[err].classList.add("border-2");
          form.current[err].classList.add("border-red-500");
          newdata.classList.remove("hidden");
          newdata.innerText = data.data.errors[err].msg;
        });
      } else if (data && data.data.username) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Signup
            </h2>

            <form ref={form} onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="username"
                  className="leading-7 text-sm text-gray-600"
                >
                  username
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  name="username"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="error err-username hidden">error;</p>
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="error err-email hidden">error;</p>
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className="error err-password hidden">error;</p>
              </div>
              <input
                type="file"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                id=""
              />

              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                signup
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
