import React, { Component } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="d-flex flex-column content-box">
                    <Navbar />
                    <Landing />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
