import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    retrieveFeedbacks();
  }, []);

  useEffect(() => {
    // Filter feedbacks whenever the search query changes
    setFilteredFeedbacks(
      feedbacks.filter(feedback =>
        feedback.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.cus_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.jwel_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, feedbacks]);

  const retrieveFeedbacks = () => {
    axios.get("/feedback").then(res => {
      if (res.data.success) {
        setFeedbacks(res.data.feedback);
      }
    }).catch(err => {
        console.error("Error retrieving feedbacks:", err);
    });
  };

  const onDelete = (id) => {
    axios.delete(`/feedback/delete/${id}`).then(res => {
      alert("Deleted successfully");
      retrieveFeedbacks();
    }).catch(err => {
        console.error("Error deleting feedback:", err);
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-light mb-4">All Feedbacks</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by feedback, customer ID, or jeweler ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Feedback ID</th>
              <th scope="col">Customer ID</th>
              <th scope="col">Jeweler ID</th>
              <th scope="col">Feedback</th>
              <th scope="col">Rating</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback, index) => (
                <tr key={feedback._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{feedback.fid}</td>
                  <td>{feedback.cus_id}</td>
                  <td>{feedback.jwel_id}</td>
                  <td>{feedback.feedback}</td>
                  <td>{feedback.Rating}</td>
                  <td>
                    <a className="btn btn-outline-warning me-2" href={`/fbedit/${feedback._id}`}>
                      <i className="fas fa-edit"></i> &nbsp;Edit
                    </a>
                    <button className="btn btn-danger" onClick={() => onDelete(feedback._id)}>
                      <i className="far fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No feedbacks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <a href="/fbadd" className="btn btn-outline-success text-white">
          <i className="fas fa-plus"></i> &nbsp;Add New Feedback
        </a>
      </div>
    </div>
  );
};

export default Home;
