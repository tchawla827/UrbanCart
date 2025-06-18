import React from 'react';

const FormErrorMessage = ({ message }) => {
  return (
    <div
      className="mt-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 py-2 px-3 rounded-lg relative animate-fade-in transition-all duration-200"
      role="alert"
    >
      <span className="block sm:inline text-sm font-medium">{message}</span>
    </div>
  );
};

export default FormErrorMessage;
