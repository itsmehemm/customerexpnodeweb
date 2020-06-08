
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
            sub_category_code: '',
            default_size: '',
            default_color: ''
        }
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata) {
            data.name = this.rawdata.name;
            data.description = this.rawdata.description;
            data.product_code = this.rawdata.product_code;
            data.category_code = this.rawdata.category_code;
            data.sub_category_code = this.rawdata.sub_category_code;
            data.default_size = this.rawdata.default_size;
            data.default_color = this.rawdata.default_color;
        }
        this.data = data;
    }

    updateData(d) {
        let data = {};
        data.name = d.name;
        data.description = d.description;
        data.product_code = d.product_code;
        data.category_code = d.category_code;
        data.sub_category_code = d.sub_category_code;
        data.default_size = d.default_size;
        data.default_color = d.default_color;
        this.data = d;
    }

    updateDataFromState(state) {
        let data = {};
        data.name = state.name;
        data.description = state.description;
        data.product_code = state.product_code;
        data.category_code = state.category_code;
        data.sub_category_code = state.sub_category_code;
        data.default_size = state.default_size;
        data.default_color = state.default_color;
        this.data = data;
    }

    getData = () => this.data;
};