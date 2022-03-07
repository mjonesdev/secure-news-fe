import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import "./SortAndFilter.css";

function SortAndFilter() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="sort__container">
      <IconContext.Provider value={{ color: "#393E46" }}>
        <h3 className="sort__label" >Sort</h3>
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
          </ul>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default SortAndFilter;
