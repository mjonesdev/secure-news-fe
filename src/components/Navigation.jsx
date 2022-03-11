import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiFillHome } from "react-icons/ai";
import { RiArticleFill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { GoPrimitiveDot } from 'react-icons/go';
import { getTopics } from "../api";
import { IconContext } from "react-icons";
import "./Navigation.css";

function Navigation() {
  const [sidebar, setSidebar] = useState(false);
  const [topics, setTopics] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    getTopics().then((response) => {
      const topicsObj = response.map(
        (topicArea) =>
          topicArea.slug
      );
      setTopics(topicsObj);
    });
  }, []);

  const sidebarContent = [
    {
      title: "Home",
      path: "/",
      icon: <AiFillHome />,
      className: "nav__menu-text",
    },
    {
      title: "Articles",
      path: "/articles",
      icon: <RiArticleFill />,
      className: "nav__menu-text",
    },
    {
      title: "Account",
      path: "/user",
      icon: <MdAccountCircle />,
      className: "nav__menu-text",
    },
  ];

  return (
    <header className="nav__header">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div>
          <Link to="#" className="nav__menu-bars">
            <GiHamburgerMenu onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav__nav-menu active" : "nav__nav-menu"}>
          <ul className="nav__nav-menu-items" onClick={showSidebar}>
            <li key="nav_menu_open" className="nav__nav-menuToggle">
              <Link key="nav_menu_open_button" to="#" className="nav__menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {sidebarContent.map((item, index) => {
              return item.title === "Articles" ? (
                <>
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                    
                </li>
                {topics.map((topic) => {
                      return <li key={topic} className='nav__sub-menu-text' ><Link to={"/articles/" + topic}><GoPrimitiveDot /> <span>{topic.charAt(0).toUpperCase() + topic.slice(1)}</span></Link></li>
                    })}
                </>
                
              ) : (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <h1 className="nav__title">Secure News</h1>
      </IconContext.Provider>
    </header>
  );
}

export default Navigation;
