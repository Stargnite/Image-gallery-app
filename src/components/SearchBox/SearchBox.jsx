import "./searchbox.css";
import { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm.toLowerCase());
  };

  return (
    <div>
      <form className="search_form">
        <input
          type="text"
          className="searchbox"
          placeholder="Input or click on any of the tags below"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search_btn" onClick={handleSearch}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
