import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import style from "./header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  const openMenuBar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuBar = () => {
    if (isMobileDevice === true) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // Function to check whether to display mobile menu version or not
  const changeMenuVersion = () => {
    if (window.innerWidth >= 750) {
      // For larger device
      setIsMenuOpen(true);
      setIsMobileDevice(false);
    } else if (window.innerWidth <= 750) {
      // For smaller device
      setIsMenuOpen(false);
      setIsMobileDevice(true);
    }
  };

  /* Listening for width changes so that changeMenuVersion is fired to change
     between mobile and desktop menu version.
  */
  useEffect(() => {
    window.addEventListener("load", changeMenuVersion);
    window.addEventListener("resize", changeMenuVersion);
    return () => {
      window.removeEventListener("load", changeMenuVersion);
      window.removeEventListener("resize", changeMenuVersion);
    };
  });

  return (
    <header className={style.container}>
      <FiMenu className={style.menubar} onClick={openMenuBar} />
      {isMenuOpen && (
        <nav className={style.nav}>
          <NavLink exact to="/" activeClassName={style.selected} className={style.links}>
            <span onClick={closeMenuBar}>Create a task</span>
          </NavLink>
          <NavLink to="score-task" activeClassName={style.selected} className={style.links}>
            <span onClick={closeMenuBar}>Score tasks</span>
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
