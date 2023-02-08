import React from 'react';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[50%] text-center m-auto">
      <h1 className="text-center text-2xl mb-7 font-bold pt-12">Account</h1>
      <div>
        <a
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
        >
          Back to home
        </a>
        <p className="mt-5">Welcome, {user?.email}</p>
      </div>
      <button
        onClick={handleSignOut}
        className="mt-7 inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
