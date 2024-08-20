import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class CustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {},
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props;

    axios.get(`/customer/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            customer: res.data.customer,
            isLoading: false
          });
        }
      })
      .catch((err) => {
        this.setState({ error: "Error fetching customer details", isLoading: false });
        console.error("Error fetching customer:", err);
      });
    }
  
  render() {
    const { id, name, gender, phone } = this.state.customer;
    const { isLoading, error } = this.state;

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

    return (
<div className="container mt-5">
    <div className="card shadow-lg p-4 rounded-3 bg-dark text-light">
        <div className="card-header bg-secondary text-light text-center rounded-3">
            <h4 className="mb-0">Customer Details</h4>
        </div>
        <div className="card-body mt-3">
            <dl className="row">
                <dt className="col-sm-3 fw-bold">ID</dt>
                <dd className="col-sm-9">{id}</dd>

                <dt className="col-sm-3 fw-bold">Name</dt>
                <dd className="col-sm-9">{name}</dd>

                <dt className="col-sm-3 fw-bold">Gender</dt>
                <dd className="col-sm-9">{gender}</dd>

                <dt className="col-sm-3 fw-bold">Phone</dt>
                <dd className="col-sm-9">{phone}</dd>
            </dl>
            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-outline-primary me-2">Edit</button>
                <button className="btn btn-outline-danger">Delete</button>
            </div>
        </div>
    </div>
</div>

    );
  }
}

function CustomerDetailsWithParams() {
  const { id } = useParams();
  return <CustomerDetails id={id} />;
}

export default CustomerDetailsWithParams;
