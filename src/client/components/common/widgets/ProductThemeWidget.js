import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Amount from '../elements/Amount';
import Typography from '../elements/Typography';
import ProductImages from './ProductImages';

const ColorPallette = ({ color }) => <Grid item xs={1}> <div className="t-color-pallette" style={{ backgroundColor: color }} /></Grid>

const ProductThemeWidget = (props) => {
    const {
        name,
        description,
        onClick,
        amount,
        picture_links,
        size,
        color
    } = props;
    return (
        <Card variant="outlined">
            <Box m={1}>
                <ProductImages
                    images={picture_links}
                    style={{
                        width: '100%',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        cursor: 'pointer'
                    }}
                    properties={{
                        infinite: false,
                        arrows: false
                    }}
                    onClick={onClick}
                />
            </Box>
            <Box m={1}>
                <Box m={0}>
                    <Typography
                        className="t-text-link-3"
                        variant="button"
                        align='center'
                        text={name}
                        onClick={onClick}
                    />
                </Box>
                <Box m={0}>
                    <Typography
                        align='center'
                        size="body2"
                        text={description} />
                </Box>
                <Box m={0} align="center">
                    <Amount amount={amount} />
                </Box>
            </Box>
            <Divider />
            <Grid container>
                <Grid item xs={6}>
                    <Box m={1}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="button" text="Size" />
                            </Grid>
                            <Grid item>
                                <Typography variant="button" text={size} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item>
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                    <Box m={1}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="button" text="Color" />
                            </Grid>
                            <Grid item>
                                <ColorPallette color={color} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductThemeWidget;