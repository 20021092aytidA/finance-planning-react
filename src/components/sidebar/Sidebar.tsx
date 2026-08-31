import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(): React.ReactNode {
  return (
    <div className="h-screen bg-amber-50">
      <div className="h-full flex flex-col justify-between">
        {/* WEB NAVIGATION */}
        <ul>
          <li>
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
          <li>
            <Link to="/plans">Plans</Link>
          </li>
        </ul>
        <div>Finance Planning Web</div>
      </div>
    </div>
  );
}
