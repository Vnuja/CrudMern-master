import React from 'react';

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
            <div className="card p-4 shadow-lg bg-secondary border-0">
                <h2 className="text-center mb-4 text-white">Select a Dashboard</h2>
                <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-around">
                    <form className="w-100">
                        <div className="d-flex flex-row align-items-center">
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/Jwellerydashboard" className="text-white text-decoration-none">Jewellery Manager Dashboard</a>
                            </button>
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/Employeedashboard" className="text-white text-decoration-none">Employee Manager Dashboard</a>
                            </button>
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/appointmentdashboard" className="text-white text-decoration-none">Appointment Manager Dashboard</a>
                            </button>
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/orderdashboard" className="text-white text-decoration-none">Order Manager Dashboard</a>
                            </button><br></br>
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/supplierdashboard" className="text-white text-decoration-none">Supplier Manager Dashboard</a>
                            </button>
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/inventorydashboard" className="text-white text-decoration-none">Inventory Manager Dashboard</a>
                            </button>
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/cusdashboard" className="text-white text-decoration-none">Customer Manager Dashboard</a>
                            </button>
                            <button className="btn btn-outline-light mx-2 my-2 shadow-sm w-75">
                                <a href="/fbdashboard" className="text-white text-decoration-none">Feedback Manager Dashboard</a>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
