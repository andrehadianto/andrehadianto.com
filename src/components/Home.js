import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../css/reuseable.css';
import '../css/home.css';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="profile-wrapper">
                    <div className="home-nav">
                        <Navbar expand="md">
                            <Nav className="mr-auto">
                                <Nav.Link>About Me</Nav.Link>
                                <Nav.Link>Portfolio</Nav.Link>
                                <Nav.Link>Photos</Nav.Link>
                                <Nav.Link>Contact</Nav.Link>
                            </Nav>
                        </Navbar>
                    </div>
                    <div className="home-content">
                        <h1><span className="jumbo-name">Andre Hadianto Lesmana</span></h1>
                        <p><span className="sub-jumbo-name">Finding inspiration :)</span></p>
                    </div>
                </div>
                <div className="hero-wrapper">
                    profile picture on the right side
                </div>
            </div>
        )
    }
}

export default Home;