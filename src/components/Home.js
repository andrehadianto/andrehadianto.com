import React from 'react';
import logo from '../resources/images/hero-logo.png';
import { Nav, Navbar } from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
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
                    <div className="hero-logo">
                        <img id="logo" src={logo} alt="brand-logo"/>
                    </div>
                    <div className="home-name">
                        <h2><span>Andre Hadianto</span></h2>
                    </div>
                    <div className="home-widgets">
                        <div className="social-widgets">

                        </div>
                    </div>
                </div>     

            </div>
        )
    }
}

export default Home;