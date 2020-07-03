import React, { Component } from 'react';
import ComponentLoader from '../../common/loaders/ComponentLoader';
import Component404 from '../../common/errors/Component404';
import ProductFactory from './ProductFactory';
import { getProductById } from '../../../actions/index.js';
import ProductFactoryModal from '../../../modals/business/product-factory/ProductFactoryModal';
import {
    COMPONENT_LOADER,
    COMPONENT_PRODUCT_FACTORY,
    COMPONENT_PRODUCT_FACTORY_INVALID
} from '../../../lib/constants';

export default class ProductFactoryWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: new ProductFactoryModal().getDefaultData(),
            component: COMPONENT_LOADER
        }
    }

    async componentDidMount() {
        const productid = this.props &&
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.productid;
        if (productid) {
            try {
                const product = await getProductById(productid);
                if (product && product.id) {
                    const productFactoryModal = new ProductFactoryModal(product);
                    await this.setState({
                        product: productFactoryModal.getData(),
                        component: COMPONENT_PRODUCT_FACTORY
                    });
                } else {
                    await this.setState({
                        product: new ProductFactoryModal().getDefaultData(),
                        component: COMPONENT_PRODUCT_FACTORY_INVALID
                    })
                }
            } catch (error) {
                await this.setState({
                    product: new ProductFactoryModal().getDefaultData(),
                    component: COMPONENT_PRODUCT_FACTORY_INVALID
                })
            }
        } else {
            await this.setState({
                product: new ProductFactoryModal().getDefaultData(),
                component: COMPONENT_PRODUCT_FACTORY
            });
        }
    }

    render() {
        const { component, product } = this.state;
        switch (component) {
            case COMPONENT_LOADER:
                return <ComponentLoader />;
            case COMPONENT_PRODUCT_FACTORY_INVALID:
                return <Component404 />;
            case COMPONENT_PRODUCT_FACTORY:
                return <ProductFactory product={product} />;
            default:
                return <ProductFactory />;
        }
    }
}