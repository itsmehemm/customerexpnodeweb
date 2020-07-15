import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '../common/elements/Typography';
import '../../styles/footer.css';

const Footer = () => {
    return (
        <Container style={{
            backgroundColor: 'rgb(247, 36, 52)',
            color: '#fff'
        }} maxWidth={false}>
            <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={2}>
                    <Box m={2}>
                        <Typography variant="button" text="Quick Links" />
                        <Typography variant="body2" className="t-text-link-3" text="Home" />
                        <Typography variant="body2" className="t-text-link-3" text="All Products" />
                        <Typography variant="body2" className="t-text-link-3" text="Contact Us" />
                        <Typography variant="body2" className="t-text-link-3" text="About Us" />
                        <Typography variant="body2" className="t-text-link-3" text="Help" />
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box m={2}>
                        <Typography variant="button" text="Social" />
                        <Typography variant="body2" className="t-text-link-3" text="Facebook" />
                        <Typography variant="body2" className="t-text-link-3" text="Instagram" />
                        <Typography variant="body2" className="t-text-link-3" text="Youtube" />
                    </Box>
                </Grid>
                <Box m={2}>
                    <Divider orientation="vertical" style={{ backgroundColor: '#fff' }} />
                </Box>
                <Grid item xs={2}>
                    <Box m={2}>
                        <Typography variant="body1" text="Mail Us:" />
                        <Typography variant="body2" text="Tinnos India Private Limited," />
                        <Typography variant="body2" text="2/153, 2nd block, 2nd floor" />
                        <Typography variant="body2" text="Mogappair west" />
                        <Typography variant="body2" text="Chennai, 600 037" />
                        <Typography variant="body2" text="Tamil Nadu, India" />
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box m={2}>
                        <Typography variant="body1" text="Registered Address:" />
                        <Typography variant="body2" text="Tinnos India Private Limited," />
                        <Typography variant="body2" text="2/153, 2nd block, 2nd floor" />
                        <Typography variant="body2" text="Mogappair west" />
                        <Typography variant="body2" text="Chennai, 600 037" />
                        <Typography variant="body2" text="Tamil Nadu, India" />
                        <Typography variant="body2" text="GST: 33AOHPL2182F1Z6" />
                        <Typography variant="body2" text="Phone: +91 87787 46089" />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{ backgroundColor: '#fff' }} />
                </Grid>
                <Grid item xs={12}>
                    <Box m={2} align="center">
                        <Typography variant="body2" text={`© 2020 Tinnos India Private Limited`} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;