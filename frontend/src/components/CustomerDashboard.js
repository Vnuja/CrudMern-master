import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      searchQuery: '',
      filteredCustomers: []
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  retrieveCustomers() {
    axios.get("/customer").then(res => {
      if (res.data.success) {
        this.setState({
          customers: res.data.customers,
          filteredCustomers: res.data.customers
        });

        console.log(this.state.customers);
      }
    }).catch(err => {
      console.error("Error retrieving customers:", err);
    });
  }

  onDelete = (id) => {
    axios.delete(`/customer/delete/${id}`).then(res => {
      alert("Deleted successfully");
      this.retrieveCustomers();
    }).catch(err => {
      console.error("Error deleting customer:", err);
    });
  }

  handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    this.setState({
      searchQuery: query,
      filteredCustomers: this.state.customers.filter(customer =>
        customer.name.toLowerCase().includes(query) ||
        customer.id.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query)||
        customer.gender.toLowerCase().includes(query)
      )
    });
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-light mb-4">All Customers</h2>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, ID, or phone"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredCustomers.length > 0 ? (
                this.state.filteredCustomers.map((customer, index) => (
                  <tr key={customer._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <a href={`/customer/${customer._id}`} className="text-light text-decoration-none">
                        {customer.id}
                      </a>
                    </td>
                    <td>{customer.name}</td>
                    <td>{customer.gender}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <a className="btn btn-outline-warning text-warning me-2" href={`/cusedit/${customer._id}`}>
                        <i className="fas fa-edit"></i> &nbsp;Edit
                      </a>
                      <button className="btn btn-outline-danger" onClick={() => this.onDelete(customer._id)}>
                        <i className="far fa-trash-alt"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <a href="/cusadd" className="btn btn-outline-success text-white">
            <i className="fas fa-plus"></i> &nbsp;Add New Customer
          </a>
        </div>
      </div>
    );
  }
}
