import React from 'react';
import logo from '../resources/images/logo.png';
import { Nav, Navbar } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

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
                            <a href="https://github.com/andrehadianto" className="widget"><FaGithub/></a>
                            <a href="https://sg.linkedin.com/in/andre-hadianto-621570175" className="widget"><FaLinkedin/></a>
                            <a href="https://www.instagram.com/andrehl96/?hl=en" className="widget"><FaInstagram/></a>
                            <a href="mailto:andrehadianto@gmail.com" className="widget"><FaEnvelope/></a>

                        </div>
                    </div>
                </div>     

            </div>
        )
    }
}

export default Home;