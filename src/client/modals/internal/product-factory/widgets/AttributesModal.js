export default class BasicDetailsModal {

    constructor(r) {
        this.rawdata = r;
        this.data = null;
        this.mapResponseToData();
    }

    getDefaultData = () => {
        return {
            default_size: '',
            default_color: '',
            available_sizes: [],
            available_colors: [],
            stock_quantity: 'UNLIMITED',
        };
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata) {
            data.default_size = this.rawdata.default_size;
            data.default_color = this.rawdata.default_color;
            data.available_sizes = this.rawdata.available_sizes;
            data.available_colors = this.rawdata.available_colors;
            data.stock_quantity = this.rawdata.stock_quantity;
        }
        this.data = data;
    }

    updateData(d) {
        let data = {};
        data.default_size = d.default_size;
        data.default_color = d.default_color;
        data.available_sizes = d.available_sizes;
        data.available_colors = d.available_colors;
        data.stock_quantity = d.stock_quantity;
        this.data = d;
    }

    updateDataFromState(state) {
        let data = {};
        data.default_size = state.default_size;
        data.default_color = state.default_color;
        data.available_sizes = state.available_sizes;
        data.available_colors = state.available_colors;
        data.stock_quantity = state.stock_quantity;
        this.data = data;
    }

    getData = () => this.data;
};