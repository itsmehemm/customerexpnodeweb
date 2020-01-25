import React, { Component } from 'react';
import tshirt from '../../images/t-shirt.jpg';
import getProductById from '../../actions/get-product-by-id';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productinfo: null
        }
    }

    componentDidMount() {
        const productid = this.props.match.params.productid;
        getProductById(productid)
            .then(productinfo => this.setState({ productinfo: productinfo }));
    }

    render() {
        const { productinfo } = this.state;

        if (productinfo)
            return (
                <div>
                    <div className="content-wrapper">
                        <div className="content">
                            <div className="p-content">
                                <div className="p-images">
                                    <img src={productinfo && productinfo.picture_links && productinfo.picture_links[0] || tshirt} height="400px" width="400px" />
                                </div>
                                <div className="p-infos">
                                    <div className="header-text-large">{productinfo.name}</div>
                                    <div className="header-text-large">₹ {productinfo.cost.amount}</div>
                                    <div className="header-text-medium">{productinfo.description}</div>
                                </div>
                                <div className="clear" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        else return <div> Product not found </div>
    }
}