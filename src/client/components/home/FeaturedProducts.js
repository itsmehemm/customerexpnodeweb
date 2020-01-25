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
            <div className="in-content-wrapper">
                <div className="content">
                    <div className="content-header">
                        <span className="header-large">
                            Featured Products
                        </span>
                    </div>
                    <div className="in-content-wrapper">
                        {
                            this.state.featured.map((product, key) =>
                                <div onClick={() => window.open(`/product/${product.id}`)} key={key} className="l-item">
                                    <div className="p-widget">
                                        <img src={product.picture_links[0]} height="200px" width="200px" />
                                        <div className="p-widget-header">
                                            {product.name}
                                        </div>
                                        <div className="p-widget-info">
                                            {product.cost.currency} {product.cost.amount}
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
            </div>
        );
    }
}