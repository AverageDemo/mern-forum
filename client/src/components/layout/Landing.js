import React, { Component } from "react";

class Landing extends Component {
    render() {
        return (
            <main role="main" className="container flex-fill p-3">
                <p className="mb-3">
                    <span className="forum-banner-name">Forum Name</span>
                    <span className="forum-banner-tag"> - Tagline</span>
                </p>

                <div className="card">
                    <div className="card-header">Category 1</div>
                    <div className="card-body">Random text</div>
                </div>

                <div className="card">
                    <div className="card-header">Category 2</div>
                    <div className="card-body">Random text</div>
                </div>
            </main>
        );
    }
}

export default Landing;
