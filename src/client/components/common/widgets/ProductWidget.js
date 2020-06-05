import React from 'react';
import Amount from '../elements/Amount';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import ProductImages from '../ProductImages';
import Typography from '../elements/Typography';

const ProductWidget = (props) => {
    const { cost, discount, name, description, onClick, picture_links = [] } = props;
    return (
        <Card onClick={onClick} style={{ cursor: 'pointer' }} variant="outlined">
            <Box m={2}>
                <ProductImages
                    images={picture_links}
                    default_properties={{ indicators: false }}
                    style={{
                        width: '300px',
                        height: '300px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }} />
            </Box>
            <Box>
                <Box m={0}>
                    <Typography style={{ textAlign: 'center' }} text={name} />
                </Box>
                <Box m={0}>
                    <Typography style={{ textAlign: 'center' }} size="subtitle2" text={description} />
                </Box>
                <Box m={0}>
                    <Amount style={{ textAlign: 'center' }} cost={cost} discount={discount} />
                </Box>
            </Box>
        </Card>
    );
};

export default ProductWidget;