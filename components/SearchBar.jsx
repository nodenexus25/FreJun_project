import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, onReset, onDownload }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search comments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={onReset} className="btn reset-btn">🔄 Reset</button>
      <button onClick={onDownload} className="btn download-btn">📥 Download CSV</button>
    </div>
  );
};

export default SearchBar;
