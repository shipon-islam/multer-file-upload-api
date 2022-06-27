import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const userContext = createContext();
const UserAuth = () => useContext(userContext);

export default function PostApi({ children }) {
  const [Data, setData] = useState({});
  const [apidata, setapidata] = useState([]);
  const [user, setuser] = useState(false);
  const [status, setstatus] = useState([]);
  useEffect(() => {
    const controller = new AbortController();

    const fetchdata = async () => {
      const data = await axios.get("/profile/allstatus");
      setapidata(data.data);
      console.log(data.data);
    };

    fetchdata();
    return () => controller.abort();
  }, [Data]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchdata = async () => {
      const data = await axios.get("/profile/getstatus");

      setstatus(data.data);
      console.log(data.data);
    };
    fetchdata();
    return () => controller.abort();
  }, [Data]);

  return (
    <userContext.Provider
      value={{ apidata, Data, setData, user, setuser, status }}
    >
      {children}
    </userContext.Provider>
  );
}
export { UserAuth };
