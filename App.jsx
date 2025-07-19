import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CommentTable from "./components/CommentTable";
import { exportToCSV } from "./utils/utils";
import './App.css';

const App = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/comments");
        const data = await res.json();
        setComments(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch comments", err);
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleEdit = (id, field, value) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, [field]: value } : comment
      )
    );
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Reset failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onReset={handleReset}
          onDownload={() => exportToCSV(comments)}
        />
        {loading ? (
          <p className="loading-text">Loading comments...</p>
        ) : (
          <CommentTable
            comments={comments}
            searchTerm={searchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
