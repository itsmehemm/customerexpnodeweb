import React, { Component } from 'react';
import logo from '../../images/tinnat-logo.png';
import '../../styles/header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-content-wrapper">
                <div className="header-content">
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
                        <div onClick={() => window.location = '/contact'} className="menu-item">
                            Help
                        </div>
                        <div onClick={() => window.location = '/contact'} className="menu-item">
                            Contact
                        </div>
                        <div onClick={() => window.location = '/contact'} className="menu-item">
                            <i className="material-icons">add_shopping_cart</i>&nbsp; (0)
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear" />
                </div>
            </div>
        )
    }
}