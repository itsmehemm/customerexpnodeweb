import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '../common/elements/Typography';
import TextField from '../common/elements/TextField';
import PrimaryIconButton from '../common/elements/PrimaryIconButton';
import ButtonLoader from '../common/elements/ButtonLoader';
import ComponentLoader from '../common/loaders/ComponentLoader';
import LogTable from './LogTable';
import { getLogsById } from '../../actions';
import {
    OPERATION_LOADING_COMPLETED,
    OPERATION_LOADING,
    LOGS_NOT_FOUND,
    OPERATION_LOADING_ERROR
} from '../../lib/constants';

export default class Idsearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: OPERATION_LOADING,
            debugId: null,
            logs: null,
            formatted: [],
            error: null
        };
    }

    async componentDidMount() {
        const debugId = this.props.match.params.debugid;
        if (debugId) {
            await this.setState({ debugId: debugId });
            await this.search();
        } else {
            await this.setState({ status: OPERATION_LOADING_COMPLETED });
        }
    }

    async search() {
        await this.setState({
            status: OPERATION_LOADING,
            logs: null,
            formatted: [],
            error: null
        });
        const { debugId } = this.state;
        const response = await getLogsById(debugId);
        if (response && response.logs) {
            this.setState({
                status: OPERATION_LOADING_COMPLETED,
                logs: response.logs,
                formatted: response.formatted,
                error: null
            });
        } else if (response && response.message === LOGS_NOT_FOUND) {
            this.setState({
                status: OPERATION_LOADING_ERROR,
                error: response.description,
                logs: null,
                formatted: []
            });
        }
    }

    async update(name, data) {
        await this.setState({ [name]: data });
    }

    render() {
        const {
            debugId,
            formatted,
            status,
            error
        } = this.state;
        return (
            <Container maxWidth={"lg"}>
                <Box m={2}>
                    <Card variant="outlined">
                        <Grid container>
                            <Grid item xs={12}>
                                <Box m={2}>
                                    <Typography variant="button" text="Logger management idsearch" />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Box m={2}>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <TextField
                                                placeholder="Enter debug id"
                                                value={debugId}
                                                onChange={(data) => this.update('debugId', data)}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            {
                                                status !== OPERATION_LOADING &&
                                                <PrimaryIconButton
                                                    Icon={<SearchIcon style={{ fontSize: '2em' }} />}
                                                    onClick={() => this.search()}
                                                />
                                            }
                                            {
                                                status === OPERATION_LOADING &&
                                                <ButtonLoader />
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            {
                                error &&
                                <Grid item align="center" xs={12}>
                                    <Box m={2}>
                                        <Typography variant="subtitle1" style={{ color: 'rgb(247, 36, 52)' }} text={error} />
                                    </Box>
                                </Grid>
                            }
                            {
                                status === OPERATION_LOADING &&
                                <ComponentLoader />
                            }
                            {
                                status === OPERATION_LOADING_COMPLETED &&
                                formatted &&
                                formatted.length > 0 &&
                                <LogTable
                                    logs={formatted}
                                    columns={{
                                        date: true,
                                        component: true,
                                        operation: true,
                                        additional_data: true,
                                    }}
                                />
                            }
                        </Grid>
                    </Card>
                </Box>
            </Container>
        );
    }
};