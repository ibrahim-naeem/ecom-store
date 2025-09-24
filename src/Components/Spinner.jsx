import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></span>
    </div>
  );
}

export default Spinner;
