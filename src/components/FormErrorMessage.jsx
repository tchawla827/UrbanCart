import React from 'react';

const FormErrorMessage = ({ message }) => {
  return (
    <div className="mt-2 bg-red-100 border border-red-400 text-red-700 py-1 px-1 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default FormErrorMessage;