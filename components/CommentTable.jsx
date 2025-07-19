import React, { useState } from "react";

const CommentTable = ({ comments, searchTerm, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const COMMENTS_PER_PAGE = 10;

  const filtered = comments
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey]?.toString().toLowerCase();
      const bVal = b[sortKey]?.toString().toLowerCase();
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

  const pageCount = Math.ceil(filtered.length / COMMENTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="table-container">
      <table className="comment-table">
        <thead>
          <tr>
            {["id", "name", "email", "body"].map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {key.toUpperCase()}
              </th>
            ))}
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>
                <input
                  value={comment.name}
                  onChange={(e) => onEdit(comment.id, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={comment.email}
                  onChange={(e) => onEdit(comment.id, "email", e.target.value)}
                />
              </td>
              <td>
                <textarea
                  value={comment.body}
                  onChange={(e) => onEdit(comment.id, "body", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => onDelete(comment.id)} className="btn delete-btn">
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No matching comments found.</p>
      )}
    </div>
  );
};

export default CommentTable;
