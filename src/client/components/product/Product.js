import React, { Component } from 'react';
import tshirt from '../../images/tshirt.jpg';
import getProductById from '../../actions/get-product-by-id';
import SmallButtonGroup from '../common/elements/SmallButtonGroup';
import Amount from '../common/elements/Amount';

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
                                    <div className="p-item">
                                        <span className="header-text-large">{productinfo.name}</span>
                                    </div>

                                    <div className="p-item">
                                        <span className="header-text-medium">{productinfo.description}</span>
                                    </div>

                                    <div className="p-item">
                                        <Amount cost={productinfo.cost} discount={productinfo.discount} />
                                    </div>
                                    <div className="p-item">
                                        <SmallButtonGroup
                                            onSelect={() => { }}
                                            defaultButton={productinfo.default_size}
                                            buttons={productinfo.available_sizes}
                                        />
                                    </div>
                                    <div className="p-item">
                                        <SmallButtonGroup
                                            onSelect={() => { }}
                                            defaultButton={productinfo.default_color}
                                            buttons={productinfo.available_colors}
                                        />
                                    </div>
                                    <div className="p-item">
                                        {
                                            parseInt(productinfo.stock_quantity) > 0 ?
                                                <span className="small-header-text green-text">
                                                    <i className="material-icons">done</i>
                                                    &ensp; IN STOCK
                                                    </span> :
                                                <span className="small-header-text red-text">
                                                    <i className="material-icons">cancel</i>
                                                    &ensp; OUT OF STOCK
                                                    </span>
                                        }
                                    </div>
                                    <div className="p-item">
                                        <button className="add-cart-btn">
                                            <i className="material-icons">add_shopping_cart</i>
                                            &ensp;ADD TO CART </button>
                                    </div>

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