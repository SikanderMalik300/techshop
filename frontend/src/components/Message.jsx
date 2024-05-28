import React from "react";

const Message = ({ variant, children }) => {
  const colors = {
    danger: "bg-red-100 text-red-700 border-red-400",
    success: "bg-green-100 text-green-700 border-green-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${colors[variant]}`}>
      <p className="text-sm">{children}</p>
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
