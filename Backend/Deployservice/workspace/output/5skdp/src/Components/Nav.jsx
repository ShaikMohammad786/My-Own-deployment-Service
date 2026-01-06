import React from "react";
import './Nav.css';
import "../index.css";

const Nav = () => {
  return (
    <nav className="flex justify-around items-center p-4 bg-slate-800">
       <h2 className="text-xl font-bold text-white mr-60 ">
          &lt; Pass<span className="text-blue-600">OP/&gt;</span>
        </h2>
      <ul className="flex space-x-6 text-blue-400 ">
        <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
          Home
        </li>
        <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
          About
        </li>
        <li className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
