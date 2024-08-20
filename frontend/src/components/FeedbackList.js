import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FeedbackDetails = () => {
  const [feedback, setFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Use useParams to get the route parameter

  useEffect(() => {
    axios.get(`/feedback/${id}`)
      .then((res) => {
        if (res.data.success) {
          setFeedback(res.data.feedback || {});
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError("Error fetching feedback details");
        setIsLoading(false);
        console.error("Error fetching feedback:", err);
      });
  }, [id]); // Dependency array includes id to refetch if id changes

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  const { fid, cus_id, jwel_id, feedback: feedbackText, Rating } = feedback;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-3 bg-dark text-light">
        <div className="card-header bg-secondary text-light text-center rounded-3">
          <h4 className="mb-3">Feedback Details</h4>
          <hr className="bg-light"/>

          <dl className="row">
            <dt className="col-sm-3 fw-bold">Feedback ID</dt>
            <dd className="col-sm-9">{fid}</dd>

            <dt className="col-sm-3 fw-bold">Customer ID</dt>
            <dd className="col-sm-9">{cus_id}</dd>

            <dt className="col-sm-3 fw-bold">Jeweler ID</dt>
            <dd className="col-sm-9">{jwel_id}</dd>

            <dt className="col-sm-3 fw-bold">Feedback</dt>
            <dd className="col-sm-9">{feedbackText}</dd>

            <dt className="col-sm-3 fw-bold">Rating</dt>
            <dd className="col-sm-9">{Rating}</dd>
          </dl>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-outline-primary me-2">Edit</button>
            <button className="btn btn-outline-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
