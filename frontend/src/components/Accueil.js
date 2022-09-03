import React, { Component } from "react";

export default class Accueil extends Component {


    render() {

        return (
            <div className="container mt-2">
                <p>
                    Well, hello there!
                </p>
                <p>
                    We're going to now talk to the GitHub API. Ready?
                    <a href="https://github.com/login/oauth/authorize?client_id=Iv1.3557116d6bcf2043">Click here</a> to begin!
                </p>
                <p>
                    If that link doesn't work, remember to provide your own <a href="/apps/building-oauth-apps/authorizing-oauth-apps/">Client ID</a>!
                </p>
            </div>
        );
    }
}