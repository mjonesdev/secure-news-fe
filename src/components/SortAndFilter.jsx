import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { getTopics } from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import "./SortAndFilter.css";

function SortAndFilter() {
  const [sidebar, setSidebar] = useState(false);
  const [topics, setTopics] = useState([]);
  const [params, setParams] = useState({});

  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getTopics().then((response) => {
      const topicsObj = response.map((topicArea) => topicArea.slug);
      setTopics(topicsObj);
    });
  }, []);

  useEffect(() => {
    setSearchParams(params);
  }, [params]);

  const handleOrderChange = (e) => {
    setParams((params) => {
      return { ...params, order: e.target.value };
    });
  };
  const handleSortByChange = (e) => {
    setParams((params) => {
      return { ...params, sort_by: e.target.value };
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setParams({});
  };

  const showSidebar = () => setSidebar(!sidebar);

  const topicHeader = topic ? (
    <h5 className="sort__topic-title">
      {topic.charAt(0).toUpperCase() + topic.slice(1)}
    </h5>
  ) : (
    <></>
  );

  return (
    <div className="sort__container">
      {topicHeader}
      <h3 className="sort__label">Sort</h3>
      <div className="sort__menu-bars sort__menu-bars-closed">
        <GiHamburgerMenu onClick={showSidebar} />
      </div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={sidebar ? "sort__menu active" : "sort__menu"}>
          <ul className="sort__menu-items" onClick={showSidebar}>
            <li key="menu_toggle" className="sort__menuToggle sort__menu-bars">
              <AiOutlineClose />
            </li>
            <li key="menu_title_topic" className="sort__menu-text">
              Topics
            </li>
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
            <li key="menu_title_sort" className="sort__menu-text">
              Sort
            </li>
            <li key="menu_sort_options" className="sort__menu-list-item">
              <span className="sort__menu-text-subheading">Order</span>
              <div>
                <label className="sort__menu-radio">
                  <input
                    type="radio"
                    value="asc"
                    checked={params.order === "asc"}
                    onChange={handleOrderChange}
                  />
                  <span>Ascending</span>
                </label>
                <label className="sort__menu-radio">
                  <input
                    type="radio"
                    value="desc"
                    checked={params.order === "desc"}
                    onChange={handleOrderChange}
                  />
                  <span>Descending</span>
                </label>
              </div>
              <span className="sort__menu-text-subheading">Sort by</span>
              <div>
                <label className="sort__menu-radio">
                  <input
                    type="radio"
                    value="created_at"
                    checked={params.sort_by === "created_at"}
                    onChange={handleSortByChange}
                  />
                  <span>Date</span>
                </label>
                <label className="sort__menu-radio">
                  <input
                    type="radio"
                    value="comment_count"
                    checked={params.sort_by === "comment_count"}
                    onChange={handleSortByChange}
                  />
                  <span>Comment Count</span>
                </label>
                <label className="sort__menu-radio">
                  <input
                    type="radio"
                    value="votes"
                    checked={params.sort_by === "votes"}
                    onChange={handleSortByChange}
                  />
                  <span>Likes</span>
                </label>
              </div>
            </li>
            <li key="menu_reset_button" className="sort__menu-text">
              <Link to="/articles">
                <span className="sort__menu-reset" onClick={handleReset}>
                  Reset
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default SortAndFilter;
