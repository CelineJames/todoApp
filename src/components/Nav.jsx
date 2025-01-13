import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchQuery, setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  console.log(searchQuery);

  return (
    <div
      className="search-bar"
      style={{
        position: "relative",
        width: window.innerWidth > 500 ? "20%" : "50%",
      }}
    >
      <div className="fa-search-box">
        <FaSearch className="fa-search" />
      </div>
      <input
        type="text"
        placeholder="search your task here..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}

function Hamburger({ isActive, toggleHamburger }) {
  return (
    <div
      className={`hamburger ${isActive ? "active" : ""}`}
      onClick={toggleHamburger}
    >
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
}

function NavList({ isActive, toggleHamburger }) {
  const navigate = useNavigate();

  return (
    <div className="nav-ul">
      <ul className={`nav-ul ${isActive ? "visible" : "hidden"}`}>
        <li onClick={() => navigate("/error-boundary")}>Error Boundary</li>
        <li onClick={() => navigate("/not-found")}>404 Error</li>
      </ul>
      <Hamburger isActive={isActive} toggleHamburger={toggleHamburger} />
    </div>
  );
}

function Nav({ searchQuery, setSearchQuery }) {
  const [isActive, setIsActive] = useState(false);

  const toggleHamburger = () => {
    setIsActive(!isActive);
  };

  const currentDate = new Date();
  const formattedDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="nav-bar">
      <div>
        <div className="date">
          <h4 className="weekday">{formattedDay},</h4>
          <p className="date">{formattedDate}</p>
        </div>
        <h2>
          <span>Dash</span>board
        </h2>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NavList isActive={isActive} toggleHamburger={toggleHamburger} />
    </div>
  );
}

export default Nav;
