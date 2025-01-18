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
    <div className="flex-col h-full space-y-5">
      {noticeData.map((notice, index) => (
        <div key={index} className="bg-white w-full text-black space-x-8">
          <span className="">{formatDate(notice.date)}</span>
          <span className="">{notice.heading}</span>
          <span className="">{notice.body}</span>
        </div>
      ))}
    </div>
  );
};

export default Notification;
