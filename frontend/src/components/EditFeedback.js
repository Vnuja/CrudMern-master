import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

class EditFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fid: "",
      cus_id: "",
      jwel_id: "",
      feedback: "",
      Rating: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.params;  // Correctly access `id` from `params`

    axios.get(`/feedback/${id}`).then((res) => {
      if (res.data.success) {
        const { fid, cus_id, jwel_id, feedback, Rating } = res.data.feedback;
        this.setState({
          fid,
          cus_id,
          jwel_id,
          feedback,
          Rating
        });
      }
    }).catch((err) => {
      console.error("Error fetching feedback:", err);
    });
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

    const { id } = this.props.params;  // Use the `id` from `params`
    const { fid, cus_id, jwel_id, feedback, Rating } = this.state;

    const data = {
      fid,
      cus_id,
      jwel_id,
      feedback,
      Rating
    };

    axios.put(`/feedback/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Feedback updated successfully");
        this.setState({
          fid: "",
          cus_id: "",
          jwel_id: "",
          feedback: "",
          Rating: ""
        });
        this.props.navigate('/fbdashboard');  // Navigate to the desired route after successful update
      }
    }).catch((err) => {
      console.error("Error updating feedback:", err);
    });
  }

  render() {
    const { jwel_id, feedback, Rating } = this.state;

    const onDelete = (id) => {
      axios.delete(`/feedback/delete/${id}`).then(res => {
        alert("Deleted successfully");
        this.props.navigate('/fbdashboard');  // Redirect after deletion
      }).catch(err => {
        console.error("Error deleting feedback:", err);
      });
    };

    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 text-light">Update Feedback</h1>
        <form className="needs-validation bg-dark p-4 rounded-3 text-light" noValidate>

          <div className="form-group mb-3">
            <label>Jeweler ID</label>
            <input className="form-control bg-secondary text-light border-0"
              type="text"
              name="jwel_id"
              placeholder="Enter Jeweler ID"
              value={jwel_id}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group mb-3">
            <label>Feedback</label>
            <textarea className="form-control bg-secondary text-light border-0"
              name="feedback"
              placeholder="Enter feedback"
              value={feedback}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group mb-3">
            <label>Rating</label>
            <div className="d-flex">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${Rating >= index + 1 ? 'text-warning' : 'text-light'}`}
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
            value={Rating}
          />

          <button className="btn btn-success" type="submit" onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </button>
          <a className="btn btn-warning mx-sm-2 my-2 my-sm-0 shadow" href={`/fbdashboard`}>
            <i className="fas fa-edit"></i> &nbsp;Cancel
          </a>
          <button className="btn btn-danger" onClick={() => onDelete(this.props.params.id)}>
            <i className="far fa-trash-alt"></i> Delete
          </button>
        </form>
      </div>
    );
  }
}

const EditFeedbackWithRouter = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return <EditFeedback {...props} params={params} navigate={navigate} />;
}

export default EditFeedbackWithRouter;
