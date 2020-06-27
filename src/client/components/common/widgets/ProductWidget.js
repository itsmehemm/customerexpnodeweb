import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Amount from '../elements/Amount';
import Typography from '../elements/Typography';
import ProductImages from './ProductImages';

const ColorPallette = ({ color }) => <Grid item xs={1}> <div className="t-color-pallette" style={{ backgroundColor: color }} /></Grid>

const ProductWidget = (props) => {
    const {
        name,
        description,
        picture_links,
        onClick,
        amount,
        formatted
    } = props;
    return (
        <Card variant="outlined">
            <Box m={1}>
                <ProductImages
                    images={picture_links}
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
                    <Amount amount={amount} />
                </Box>
            </Box>
            {
                formatted && formatted.available_sizes_string &&
                <Box m={1}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography
                                text="Size"
                                variant="button"
                                align="left"
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography
                                text={formatted.available_sizes_string}
                                variant="button"
                                align="left"
                            />
                        </Grid>
                    </Grid>
                </Box>
            }
            {
                formatted && formatted.available_colors &&
                <Box m={1}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography
                                text="Color"
                                variant="button"
                                align="left"
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={1}>
                                {formatted.available_colors.map(color => <ColorPallette color={color} />)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            }
        </Card >
    );
};

export default ProductWidget;