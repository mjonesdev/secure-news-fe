import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { getTopics } from "../api";
import "./SortAndFilter.css";

function SortAndFilter() {
  const [sidebar, setSidebar] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((response) => {
      const topicsObj = response.map((topicArea) => topicArea.slug);
      setTopics(topicsObj);
    });
  }, []);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="sort__container">
      <IconContext.Provider value={{ color: "#393E46" }}>
        <h3 className="sort__label">Sort</h3>
        <div>
          <Link to="#" className="sort__menu-bars">
            <GiHamburgerMenu onClick={showSidebar} />
          </Link>
        </div>
        <div className={sidebar ? "sort__menu active" : "sort__menu"}>
          <ul className="sort__menu-items" onClick={showSidebar}>
            <li className="sort__menuToggle">
              <Link to="#" className="sort__menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            <li className="sort__menu-text">Topics</li>
            {topics.map((topic) => {
              return (
                <li key={topic} className="sort__sub-menu-text">
                  <Link to={"/articles/" + topic}>
                    <GoPrimitiveDot />{" "}
                    <span>
                      {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="sort__menu-text">Sort</li>
            <li className="sort__menu-text">
              <Link to='/articles'><span className="sort__menu-reset">Reset</span></Link>
            </li>
          </ul>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default SortAndFilter;
