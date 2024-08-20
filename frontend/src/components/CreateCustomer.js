import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCustomer extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: "",
      name: "",
      gender: "",
      phone: ""
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { id, name, gender, phone } = this.state;

    const data = {
      id: id,
      name: name,
      gender: gender,
      phone: phone
    };
    console.log(data);

    axios.post("/customer/save", data).then((res) => {
      if (res.data.success) {
        this.setState({
          id: "",
          name: "",
          gender: "",
          phone: ""
        });
        this.props.navigate('/cusdashboard');

      }
    }).catch((err) => {
      console.error("Error saving customer:", err);
    });
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
    <h1 className="h3 mb-3 text-light">Create New Customer</h1>
    <form className="needs-validation bg-dark p-4 rounded-3 text-light" noValidate>
        <div className="form-group mb-3">
            <label>ID</label>
            <input className="form-control bg-secondary text-light border-0" 
                type="text" 
                name="id" 
                placeholder="Enter ID" 
                value={this.state.id} 
                onChange={this.handleInputChange} />
        </div>

        <div className="form-group mb-3">
            <label>Name</label>
            <input className="form-control bg-secondary text-light border-0" 
                type="text" 
                name="name"
                placeholder="Enter name" 
                value={this.state.name} 
                onChange={this.handleInputChange} />
        </div>

        <div className="form-group mb-3">
            <label>Gender</label>
            <div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderMale"
                        value="Male"
                        checked={this.state.gender === 'Male'}
                        onChange={this.handleInputChange}
                    />
                    <label className="form-check-label text-light" htmlFor="genderMale">
                        Male
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderFemale"
                        value="Female"
                        checked={this.state.gender === 'Female'}
                        onChange={this.handleInputChange}
                    />
                    <label className="form-check-label text-light" htmlFor="genderFemale">
                        Female
                    </label>
                </div>
            </div>
        </div>

        <div className="form-group mb-3">
            <label>Phone</label>
            <input className="form-control bg-secondary text-light border-0" 
                type="text" 
                name="phone"
                placeholder="Enter phone" 
                value={this.state.phone}  
                onChange={this.handleInputChange} />
        </div>

        <button className="btn btn-success me-2" type="submit" onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; Save
        </button>
        <a className="btn btn-warning" href={`/cusdashboard`}>
            <i className="fas fa-edit"></i> &nbsp;Cancel
        </a>
    </form>
</div>

    );
  }
}
