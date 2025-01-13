import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <h1>OOPS!</h1>
      <h2>404- PAGE NOT FOUND</h2>
      <p>
        The page you're looking for doesn't exist.
      </p>
      <a href="/" >
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
