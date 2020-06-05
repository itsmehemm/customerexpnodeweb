
import { DEFAULT_CATEGORY_CODE } from '../../../../lib/constants';

export default class BasicDetailsModal {

    constructor(r) {
        this.rawdata = r;
        this.data = null;
        this.mapResponseToData();
    }

    getDefaultData = () => {
        return {
            name: '',
            description: '',
            product_code: '',
            category_code: DEFAULT_CATEGORY_CODE,
        }
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata) {
            data.name = this.rawdata.name;
            data.description = this.rawdata.description;
            data.product_code = this.rawdata.product_code;
            data.category_code = this.rawdata.category_code;
        }
        this.data = data;
    }

    updateData(d) {
        let data = {};
        data.name = d.name;
        data.description = d.description;
        data.product_code = d.product_code;
        data.category_code = d.category_code;
        this.data = d;
    }

    updateDataFromState(state) {
        let data = {};
        data.name = state.name;
        data.description = state.description;
        data.product_code = state.product_code;
        data.category_code = state.category_code;
        this.data = data;
    }

    getData = () => this.data;
};