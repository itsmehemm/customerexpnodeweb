import React, { Component } from 'react';
import getFeaturedProducts from '../../actions/get-featured-products';

export default class FeaturedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featured: []
        }
    }

    componentDidMount() {
        getFeaturedProducts()
            .then(featured => this.setState({ featured: featured }));
    }

    render() {
        return (
            <div className="content">
                <div className="header">
                    <span className="header-large">
                        Featured Products
                    </span>
                </div>
                <div className="content-wrapper">
                    {
                        this.state.featured.map((product, key) =>
                            <div onClick={() => window.open(`/product/${product.id}`)} key={key} className="l-item">
                                <div className="p-widget">
                                    <img src={product.picture_links[0]} height="200px" width="200px" />
                                    <div className="p-widget-header">
                                        {product.name}
                                    </div>
                                    <div className="p-widget-info">
                                        <span className="text-large-bold">
                                            ₹ {product.cost.amount}
                                        </span>
                                    </div>
                                </div>
                            </div>)
                    }

                    {
                        this.state.featured.length === 0 &&
                        <div> There are no featured products</div>
                    }
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}