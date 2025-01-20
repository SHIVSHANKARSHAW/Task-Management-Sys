import React, { createContext, useState, useEffect } from "react";
import axios from "../helpers/AxiosSetup";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/users/current", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Fetched user data:", response.data); 
          setUser(response.data);
        } else {
          console.log("No token found in localStorage"); 
        }
      } catch (error) {
        toast.error("Error fetching user details:", error);
        console.error("Error fetching user details:", error); 
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;