import React from "react";
import PropTypes from 'prop-types';

function Search({search, setSearch, setSearchParams}) {

  function handleChange(e) {
    let text = e.target.value;
    setSearch(text); 
    setSearchParams(text);
  }

  return (
    <div className="search">
      <input
        id="search"
        className="search-book"
        type="text"
        placeholder="Search.."
        value={search}
        onChange={handleChange}
      />     
    </div>
  )
};

Search.propTypes = { 
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
}

export default Search;
