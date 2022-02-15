import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import SearchResult from "../SearchResult/SearchResult";
import "./search.css";

const Search = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get("/users");
      setUsers(res.data);
    }

    fetchUsers();
  }, []);

  const getSearchResult = (qurey) => {
    const temp_result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(qurey) ||
        user.lastName.toLowerCase().includes(qurey)
    );
    setResult(temp_result);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input) {
          getSearchResult(input.toLowerCase());
          setShow(true);
        }
      }}
    >
      <BsSearch className="searchIcon" />
      <input
        placeholder="Search for friends"
        type="text"
        className="searchInput"
        onChange={(e) => setInput(e.target.value)}
      />
      <SearchResult result={result} show={show} setShow={setShow} />
    </form>
  );
};

export default Search;
