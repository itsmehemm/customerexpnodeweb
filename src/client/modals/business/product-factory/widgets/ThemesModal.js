import uniqid from 'uniqid';
import {
    COMPONENT_STATUS_INVALID,
    COMPONENT_STATUS_VALID
} from '../../../../lib/constants';

export default class Themes {

    constructor(r) {
        this.data = [];
        this.rawdata = r;
        this.mapResponseToData();
    }

    getDefaultTheme() {
        return {
            id: uniqid('t-').toUpperCase(),
            size: '',
            color: '',
            picture_links: [],
            amount: {
                maximum_retail_price: '',
                discount: {
                    type: "NO_DISCOUNT",
                    value: ''
                },
                subtotal: 0,
                correction: 0,
                currency: 'INR'
            },
            stock_quantity: "UNLIMITED",
            status: COMPONENT_STATUS_INVALID,
            saved: false
        };
    }

    getDefaultData() {
        return [
            this.getDefaultTheme()
        ];
    }

    updateDataFromState(state) {
        let data = [];
        data = state;
        this.data = data;
    }

    updateData(d) {
        let data = [];
        data = d && d.themes;
        this.data = data;
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata &&
            this.rawdata.themes &&
            Array.isArray(this.rawdata.themes) &&
            this.rawdata.themes.length > 0) {
            data = [];
            this.rawdata.themes.forEach(theme => {
                data.push({
                    status: COMPONENT_STATUS_VALID,
                    saved: true,
                    id: uniqid('t-').toUpperCase(),
                    ...theme
                });
            });
        }
        this.data = data;
    }

    getData() { return this.data; }
};