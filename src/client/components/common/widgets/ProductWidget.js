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
        <Card variant="outlined">
            <Box m={1}>
                <ProductImages
                    images={themes[0].picture_links}
                    properties={{
                        arrows: false,
                        infinite: false
                    }}
                    style={{
                        width: '300px',
                        height: '300px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        cursor: 'pointer'
                    }}
                    onClick={onClick}
                />
            </Box>
            <Box>
                <Box m={0}>
                    <Typography
                        className="t-text-link"
                        align='center'
                        text={name}
                        onClick={onClick}
                    />
                </Box>
                <Box m={0}>
                    <Typography
                        align='center'
                        size="subtitle1"
                        text={description} />
                </Box>
                <Box m={0}>
                    <Amount amount={themes[0].amount} />
                </Box>
            </Box>
        </Card>
    );
};

export default ProductWidget;