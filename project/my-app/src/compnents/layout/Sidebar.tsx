import React from 'react';
import { useState } from "react";
import { FiHome,FiCreditCard, FiBarChart2,FiCrosshair,FiCoffee,FiChevronLeft } from "react-icons/fi";
import { IconContext } from "react-icons";


const Sidebar = () => {
     const [open, setOpen] = useState(false);
     const Menus = [
    { title: "Admin", src: <FiHome/> },
    { title: "Inbox", src: <FiCreditCard/> },
    { title: "Accounts", src:<FiBarChart2/>},
    { title: "Schedule ", src: <FiCrosshair/> },
    { title: "Search", src: <FiCoffee/> },
  ];
    return (
            <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray-200 h-screen p-5  pt-8 relative duration-300`}
      >
      <IconContext.Provider value={{ color: "#459ca7", className: "global-class-name text-4xl absolute cursor-pointer -right-3 top-[300px] w-7 bg-white border-2 rounded-full" }}>
        <FiChevronLeft
        className={ `${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}/>
      </IconContext.Provider>
       
        <ul className="">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-xl items-center gap-x-4 
              ${"mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <IconContext.Provider value={{ color: "#459ca7", className: "global-class-name text-4xl " }}>
                  {Menu.src}
              </IconContext.Provider>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
}


export default Sidebar;