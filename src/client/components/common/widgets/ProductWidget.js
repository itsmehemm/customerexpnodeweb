import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Amount from '../elements/Amount';
import Typography from '../elements/Typography';
import ProductImages from './ProductImages';

const ProductWidget = (props) => {
    const {
        name,
        description,
        onClick,
        themes
    } = props;
    return (
        <Card onClick={onClick} style={{ cursor: 'pointer' }} variant="outlined">
            <Box m={2}>
                <ProductImages
                    images={themes[0].picture_links}
                    default_properties={{ indicators: false }}
                    style={{
                        width: '300px',
                        height: '300px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                />
            </Box>
            <Box>
                <Box m={0}>
                    <Typography style={{ textAlign: 'center' }} text={name} />
                </Box>
                <Box m={0}>
                    <Typography style={{ textAlign: 'center' }} size="subtitle2" text={description} />
                </Box>
                <Box m={0}>
                    <Amount
                        style={{ textAlign: 'center' }}
                        amount={themes[0].amount}
                    />
                </Box>
            </Box>
        </Card>
    );
};

export default ProductWidget;