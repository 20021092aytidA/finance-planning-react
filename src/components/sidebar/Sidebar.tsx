import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(): React.ReactNode {
  return (
    <div className="p-2 h-screen bg-gray-700 text-white font-semibold">
      <div className="h-full flex flex-col justify-between">
        {/* WEB NAVIGATION */}
        <ul className="space-y-2">
          <li>
            <Link to="/subscription" className="hover:underline">
              Subscription
            </Link>
          </li>
          <li>
            <Link to="/plan" className="hover:underline">
              Plan
            </Link>
          </li>
        </ul>
        <div>Finance Planning Web</div>
      </div>
    </div>
  );
}
