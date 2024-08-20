import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Ensure this has a default export
import CreateCustomer from './components/CreateCustomer'; // Ensure this has a default export
import EditCustomer from './components/EditCustomer'; // Ensure this has a default export
import CustomerDetailsWithParams from './components/CustomerDetails'; // Ensure this has a default export
import Navbar from './components/Navbar'; // Ensure this has a default export

// Dummy imports for missing components
import CustomerDashboard from './components/CustomerDashboard'; // Ensure this has a default export
import FeedbackDashboard from './components/FeedbackDashboard'; // Ensure this has a default export
import CreateFeedback from './components/CreateFeedback'; // Ensure this has a default export
import EditFeedback from './components/EditFeedback'; // Ensure this has a default export
import FeedbackListWithParams from './components/FeedbackList'; // Ensure this has a default export

export default class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cusdashboard" element={<CustomerDashboard />} />
            <Route path="/fbdashboard" element={<FeedbackDashboard />} />
            <Route path="/cusadd" element={<CreateCustomer />} />
            <Route path="/fbadd" element={<CreateFeedback />} />
            <Route path="/cusedit/:id" element={<EditCustomer />} />
            <Route path="/fbedit/:id" element={<EditFeedback />} />
            <Route path="/fbpost/:id" element={<FeedbackListWithParams />} />
            <Route path="/cuspost/:id" element={<CustomerDetailsWithParams />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  componentDidMount() {
    document.body.style.backgroundColor = "#212529"; // Darker shade with a hint of blue
}


}
