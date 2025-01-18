import React from "react";
import { motion } from "framer-motion";
import { useUser } from "../context/ContextApi";

const Profile = () => {

  const { user } = useUser();

  return (
    <div className="flex justify-center items-center text-white">
      {user ? (
        <motion.div
          className="backdrop-blur-lg p-24 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome, {user.username}!
          </motion.h1>
          <motion.p
            className="text-xl mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ID: {user._id}
          </motion.p>
          <motion.p
            className="text-2xl mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Email: {user.email}
          </motion.p>
          <motion.p
            className="text-xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Role: {user.access}
          </motion.p>
        </motion.div>
      ) : (
        <p className="flex h-full place-content-center">Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;

