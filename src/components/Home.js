import React from 'react';
import '../css/reuseable.css';
import '../css/home.css';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="profile-wrapper">
                    <div className="home-nav">
                        navigation
                    </div>
                    <div className="home-content">
                        my namee
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