import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <p role="alert" className="text-[12px] font-bold" style={{ color: "#e05252" }}>
      {message}
    </p>
  );
}

export default React.memo(ErrorMessage);
