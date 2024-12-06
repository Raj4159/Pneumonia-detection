import React from "react";
import { Link } from "react-router-dom";

const MyProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-lg p-8 text-center mb-4 w-full max-w-md">
        <div className="mb-4">
          <img
            src="profile_avtar.png"
            alt="Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <span className="text-xl font-bold">John Doe</span>
          <p>
            <strong>Email: </strong> john.doe@example.com
          </p>
          <p>
            Total Points: <strong>120</strong>
          </p>
        </div>

        <div className="text-left">
          <h2 className="text-lg font-semibold mt-6">Your History</h2>
          <div className="max-h-40 overflow-y-auto mt-4">
            <p>
              Total Score: <strong>85</strong>
            </p>
            <p>
              Last Assessment: <strong>High Risk</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded"
        >
          Go Back to Home
        </Link>
      </div>
      <button
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded mt-4"
        onClick={() => alert("Logging out...")}
      >
        Logout
      </button>
    </div>
  );
};

export default MyProfile;
