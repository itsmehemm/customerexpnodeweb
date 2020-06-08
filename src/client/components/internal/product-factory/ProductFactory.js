import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '../../common/elements/Typography';
import BasicDetails from './widgets/BasicDetails';
import AdvancedDetails from './widgets/AdvancedDetails';
import Preferences from './widgets/Preferences';
import Themes from './widgets/Themes';
import ProductFactoryModal from '../../../modals/internal/product-factory/ProductFactoryModal';
import {
    COMPONENT_STATUS_INVALID,
    COMPONENT_MAPPER
} from '../../../lib/constants';
import {
    addProduct,
    updateProductById
} from '../../../actions/index.js';
import '../../../styles/admin.css';

export default class ProductFactory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...new ProductFactoryModal().getDefaultData(),
            errors: new Set(),
            notification: null
        }
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        const product = this.props && this.props.product;
        const productFactoryModal = new ProductFactoryModal(product);
        await this.setState({ ...productFactoryModal.getData() });
    }

    async update(name, value) {
        let { errors } = this.state;
        if (value.status === COMPONENT_STATUS_INVALID)
            errors.add(COMPONENT_MAPPER[name]);
        else
            errors.delete(COMPONENT_MAPPER[name]);
        await this.setState({
            [name]: value,
            errors: errors
        });
    }

    async addProduct() {
        const { errors } = this.state;
        if (errors.size === 0) {
            const productFactoryModal = new ProductFactoryModal();
            productFactoryModal.updateDataFromState(this.state);
            try {
                const response = await addProduct(productFactoryModal.buildRequest());
                if (response && response.id) {
                    this.setState({ notification: 'Product added to Tinnat warehouse.' });
                } else if (response && response.error && response.error.message) {
                    this.setState({ notification: `${response.error.message}: ${response.error.description}` });
                } else {
                    this.setState({ notification: `There was an error adding product. Please try again. Error: ${JSON.stringify(error)}` });
                }
            } catch (error) {
                this.setState({ notification: `There was an error adding product. Please try again. Error: ${JSON.stringify(error)}` });
            }
        } else {
            this.setState({ notification: `One or more required information is missing.` });
        }
    }

    async updateProduct() {
        const { errors } = this.state;
        if (errors.size === 0) {
            const productFactoryModal = new ProductFactoryModal();
            productFactoryModal.updateDataFromState(this.state);
            try {
                const response = await updateProductById(productFactoryModal.buildRequest());
                if (response && response.id) {
                    this.setState({ notification: 'Product updated to Tinnat warehouse.' });
                } else if (response && response.error) {
                    this.setState({ notification: `${response.error.message}: ${response.error.description}` });
                } else {
                    this.setState({ notification: `There was an API error updating product. Please try again. Error: ${JSON.stringify(error)}` });
                }
            } catch (error) {
                this.setState({ notification: `There was an error updating product. Please try again. Error: ${JSON.stringify(error)}` });
            }
        } else {
            this.setState({ notification: `One or more required information is missing.` });
        }
    }

    render() {
        const { notification } = this.state;
        return (
            <>
                <Container>
                    <Snackbar
                        autoHideDuration={5000}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        open={notification ? true : false}
                        message={notification}
                        onClose={() => this.setState({ notification: null })}
                        key={"topcenter"}
                    />
                    <Box m={2}>
                        <Typography
                            variant="h5"
                            text={`${this.state.id ? 'Edit product' : 'Add product'}`}
                            icon={`${this.state.id ? 'edit' : 'add'}`}
                        />
                    </Box>
                    <BasicDetails data={this.props.product} update={this.update} />
                    <Box m={2}><Divider /></Box>
                    <Themes data={this.props.product} update={this.update} />
                    <Box m={2}><Divider /></Box>
                    <AdvancedDetails data={this.props.product} update={this.update} />
                    <Box m={2}><Divider /></Box>
                    <Preferences data={this.props.product} update={this.update} />
                    <div className="t-container">
                        <Grid container spacing={3}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={2}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => this.state.id ? this.updateProduct() : this.addProduct()}
                                    startIcon={<Icon>{this.state.id ? 'edit' : 'done'}</Icon>}>
                                    {this.state.id ? 'Edit' : 'Add'}
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => window.location.reload()}
                                    startIcon={<Icon>refresh</Icon>}>
                                    Reset
                        </Button>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </div>
                </Container>
            </>
        );
    }
}