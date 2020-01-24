

import React, { Component } from 'react';
import logo from '../../images/tinnat-logo.png';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content">
                    <div className="logo">
                        <img src={logo} height="45px" width="80px" />
                    </div>
                    <div className="menu">
                        <div className="menu-item">
                            Home
                        </div>
                        <div className="menu-item">
                            About
                        </div>
                        <div className="menu-item">
                            Products
                        </div>
                        <div className="menu-item">
                            Cart
                        </div>
                        <div className="menu-item">
                            Contact Us
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear" />
                </div>
            </div>
        )
    }
}