import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-300 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Task </span>
            <span className="text-slate-700">Management</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            {" "}
            <li className=" sm:inline text-slate-700 hover:underline ">
              Signup
            </li>
          </Link>
          <Link to="/login">
            {" "}
            <li className="sm:inline text-slate-700 hover:underline ">
              Login
            </li>
          </Link>
          <Link to="/tasks">
            <li className="sm:inline text-slate-700 hover:underline ">
              All Tasks
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
