import React, { Component } from 'react';
import ComponentLoader from '../../common/loaders/ComponentLoader';
import Component404 from '../../common/errors/widgets/Component404';
import ProductFactory from './ProductFactory';
import { getProductById } from '../../../actions/index.js';
import ProductFactoryModal from '../../../modals/business/warehouse/ProductFactoryModal';
import {
    OPERATION_LOADING,
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING_ERROR
} from '../../../lib/constants';

export default class ProductFactoryWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: new ProductFactoryModal().getDefaultData(),
            status: OPERATION_LOADING
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
                        status: OPERATION_LOADING_COMPLETED
                    });
                } else {
                    await this.setState({
                        product: new ProductFactoryModal().getDefaultData(),
                        status: OPERATION_LOADING_ERROR
                    })
                }
            } catch (error) {
                await this.setState({
                    product: new ProductFactoryModal().getDefaultData(),
                    status: OPERATION_LOADING_ERROR
                })
            }
        } else {
            await this.setState({
                product: new ProductFactoryModal().getDefaultData(),
                status: OPERATION_LOADING_COMPLETED
            });
        }
    }

    render() {
        const {
            status,
            product
        } = this.state;
        switch (status) {
            case OPERATION_LOADING:
                return <ComponentLoader />;
            case OPERATION_LOADING_ERROR:
                return <Component404 />;
            case OPERATION_LOADING_COMPLETED:
                return <ProductFactory product={product} />;
            default:
                return <ProductFactory />;
        };
    }
};