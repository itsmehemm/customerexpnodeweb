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
                    <div onClick={() => window.location = '/'} className="logo">
                        <img src={logo} height="45px" width="80px" />
                    </div>
                    <div className="menu">
                        <div onClick={() => window.location = '/'} className="menu-item">
                            Home
                        </div>
                        <div onClick={() => window.location = '/about'} className="menu-item">
                            About
                        </div>
                        <div onClick={() => window.location = '/products'} className="menu-item">
                            Products
                        </div>
                        <div onClick={() => window.location = '/cart'} className="menu-item">
                            Cart
                        </div>
                        <div onClick={() => window.location = '/contact'} className="menu-item">
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