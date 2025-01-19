import React from "react";

const Notification = () => {
  const noticeData = [
    {
      heading: "Important Update",
      body: "Please be informed that the system will be undergoing maintenance on Saturday from 2 AM to 4 AM. During this time, the system will be unavailable.",
      links: [
        { text: "Maintenance Details", url: "https://example.com/maintenance" },
        { text: "Support", url: "https://example.com/support" },
      ],
      sentBy: "Admin Team",
      date: new Date(),
    },
    {
      heading: "Important Update",
      body: "Please be informed that the system will be undergoing maintenance on Saturday from 2 AM to 4 AM. During this time, the system will be unavailable.",
      links: [
        { text: "Maintenance Details", url: "https://example.com/maintenance" },
        { text: "Support", url: "https://example.com/support" },
      ],
      sentBy: "Admin Team",
      date: new Date(),
    },
    {
      heading: "Important Update",
      body: "Please be informed that the system will be undergoing maintenance on Saturday from 2 AM to 4 AM. During this time, the system will be unavailable.",
      links: [
        { text: "Maintenance Details", url: "https://example.com/maintenance" },
        { text: "Support", url: "https://example.com/support" },
      ],
      sentBy: "Admin Team",
      date: new Date(),
    },
  ];

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="flex-col h-full space-y-5 p-4">
      {noticeData.map((notice, index) => (
        <div key={index} className="bg-white w-full text-black flex space-x-8 px-4 py-2 rounded-lg shadow-md">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">{formatDate(notice.date)}</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold">{notice.heading}</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">{notice.body}</span>
        </div>
      ))}
    </div>
  );
};

export default Notification;
