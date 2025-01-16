import React, { useEffect, useState } from "react";
import axios from "../helpers/AxiosSetup";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/users/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center text-2xl font-bold h-full text-white">
        {user ? (
          <div>
            <p>Welcome, {user.username}!</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.access}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
