import React, { Component } from 'react';
import tshirt from '../../images/tshirt.jpg';
import getProductById from '../../actions/get-product-by-id';
import SmallButtonGroup from '../common/elements/SmallButtonGroup';
import Amount from '../common/elements/Amount';
import ProductImages from '../product/ProductImages';
import LargeBtn from '../common/elements/LargeBtn';

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
                <div className="incontent-wrapper">
                    <div className="content">
                        {/* Product Images and Buttons */}
                        <div className="content-6 rigid-content-6">
                            <ProductImages images={productinfo.picture_links} />
                            <LargeBtn
                                name="ADD TO CART"
                                color="#2874f0"
                                icon="add_shopping_cart" />
                            <LargeBtn
                                name="BUY NOW"
                                color="#fb641b"
                                icon="trending_up" />
                        </div>

                        {/* Product Information */}
                        <div className="content-6 rigid-content-6">
                            <div className="t-box">
                                <div className="t-h2">{productinfo.name}</div>
                                <div className="t-h4">{productinfo.description}</div>
                            </div>
                            <div className="t-box under-line">
                                <Amount cost={productinfo.cost} discount={productinfo.discount} />
                            </div>
                            <div className="t-box under-line">
                                <div className="content-3">
                                    <span className="t-h4">Size</span>
                                </div>
                                <SmallButtonGroup
                                    onSelect={() => { }}
                                    defaultButton={productinfo.default_size}
                                    buttons={productinfo.available_sizes}
                                />
                                <div className="clear" />
                            </div>
                            <div className="t-box under-line">
                                <div className="content-3">
                                    <span className="t-h4">Color</span>
                                </div>
                                <SmallButtonGroup
                                    onSelect={() => { }}
                                    defaultButton={productinfo.default_color}
                                    buttons={productinfo.available_colors}
                                />
                                <div className="clear" />
                            </div>
                            <div className="t-box under-line">
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
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            )
        else return <div> Product not found </div>
    }
}