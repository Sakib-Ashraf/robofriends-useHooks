import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import SearchBar from "../components/SearchBar";
import "./App.css";

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchBox, setSearchBox] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => setRobots(users));
  }, []);

  const onSearchChange = (event) => {
    setSearchBox(event.target.value );
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchBox.toLowerCase());
  });
  return !robots.length ? (
    <h1> loading... </h1>
  ) : (
    <div className="tc">
      <h1 className="f1 pa2 ma2 tc">robofriends</h1>
      <SearchBar searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default App;
