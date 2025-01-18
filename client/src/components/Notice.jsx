import React from "react";

const Notice = ({ heading, body, links, sentBy, date }) => {
  return (
    <div className="p-6 h-full bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <p className="mb-4">{body}</p>
      <div className="mb-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="text-blue-500 hover:underline pr-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-500">Sent by: {sentBy}</p>
      <p className="text-sm text-gray-500">Date: {new Date(date).toLocaleDateString()}</p>
    </div>
  );
};

export default Notice;