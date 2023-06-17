import React from "react";
import PropTypes from 'prop-types';
import Search from "./Search";

function SearchBar({search, setSearch, setSearchParams}) {
  return (
    <div className="search-container">
      <Search 
        search={search}
        setSearch={setSearch}
        setSearchParams={setSearchParams}
      />
    </div>  
  ) 
};

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired, 
}

export default SearchBar;