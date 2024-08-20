import React, { Component } from 'react';
import axios from 'axios';

class CreateFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fid: "",
      cus_id: "",
      jwel_id: "",
      feedback: "",
      Rating: 0 // Set initial rating to 0
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleStarClick = (rating) => {
    this.setState({ Rating: rating });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fid, cus_id, jwel_id, feedback, Rating } = this.state;

    const data = {
      fid,
      cus_id,
      jwel_id,
      feedback,
      Rating
    };

    axios.post("/feedback/save", data).then((res) => {
      if (res.data.success) {
        alert("Feedback created successfully");
        this.setState({
          fid: "",
          cus_id: "",
          jwel_id: "",
          feedback: "",
          Rating: 0 // Reset rating to 0
        });
      }
    }).catch((err) => {
      console.error("Error creating feedback:", err);
    });
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 text-light">Create New Feedback</h1>
        <form className="needs-validation bg-dark p-4 rounded-3 text-light" noValidate>
          <div className="form-group mb-3">
            <label>Feedback ID</label>
            <input className="form-control bg-secondary text-light border-0" 
                   type="text" 
                   name="fid" 
                   placeholder="Enter Feedback ID" 
                   value={this.state.fid} 
                   onChange={this.handleInputChange} />
          </div>

          <div className="form-group mb-3">
            <label>Customer ID</label>
            <input className="form-control bg-secondary text-light border-0" 
                   type="text" 
                   name="cus_id"
                   placeholder="Enter Customer ID" 
                   value={this.state.cus_id} 
                   onChange={this.handleInputChange} />
          </div>

          <div className="form-group mb-3">
            <label>Jeweler ID</label>
            <input className="form-control bg-secondary text-light border-0" 
                   type="text" 
                   name="jwel_id"
                   placeholder="Enter Jeweler ID" 
                   value={this.state.jwel_id} 
                   onChange={this.handleInputChange} />
          </div>

          <div className="form-group mb-3">
            <label>Feedback</label>
            <textarea className="form-control bg-secondary text-light border-0" 
                      name="feedback"
                      placeholder="Enter feedback" 
                      value={this.state.feedback} 
                      onChange={this.handleInputChange} />
          </div>

          <div className="form-group mb-3">
            <label>Rating</label>
            <div className="d-flex">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${this.state.Rating >= index + 1 ? 'text-warning' : 'text-light'}`}
                  onClick={() => this.handleStarClick(index + 1)}
                >
                  <h1>★</h1>
                </span>
              ))}
            </div>
          </div>

          <input
            type="hidden"
            name="Rating"
            value={this.state.Rating}
          />

          <button className="btn btn-success" type="submit" onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </button>
          <a className="btn btn-warning mx-sm-2 my-2 my-sm-0 shadow" href={`/fbdashboard`}>
            <i className="fas fa-edit"></i> &nbsp;Cancel
        </a>
        </form>
      </div>
    );
  }
}

export default CreateFeedback;
