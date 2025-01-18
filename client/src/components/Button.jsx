import React from "react";

const Button = (props) => {
  const { px, py, content } = props;
  const paddingX = px ? `px-${px}` : "px-10";
  const paddingY = py ? `py-${py}` : "py-4";

  return (
    <div
      className={`relative inline-flex items-center justify-center ${paddingX} ${paddingY} overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group`}
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-600"></span>
      <span className="relative">{content}</span>
    </div>
  );
};

export default Button;