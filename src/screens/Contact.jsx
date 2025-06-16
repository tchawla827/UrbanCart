import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Feel free to reach out through any of the platforms below.</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Email: <a href="mailto:tavish.chawla.13@gmail.com" className="text-blue-600 underline">tavish.chawla.13@gmail.com</a>
        </li>
        <li>
          GitHub: <a href="https://github.com/tchawla827" className="text-blue-600 underline">tchawla827</a>
        </li>
        <li>
          LinkedIn: <a href="https://www.linkedin.com/in/tavish-chawla-3b1673278/" className="text-blue-600 underline">Tavish Chawla</a>
        </li>
      </ul>
    </div>
  );
}
