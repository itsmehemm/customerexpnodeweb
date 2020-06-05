export default class CostDetailsModal {

    constructor(r) {
        this.rawdata = r;
        this.data = null;
        this.mapResponseToData();
    }

    getDefaultData = () => {
        return {
            discount: {
                type: 'NO_DISCOUNT',
                value: 0
            },
            cost: {
                amount: 0,
                currency: 'INR'
            },
        };
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata) {
            data.discount = this.rawdata.discount;
            data.cost = this.rawdata.cost;
        }
        this.data = data;
    }

    updateData(d) {
        let data = {};
        data.discount = d.discount;
        data.cost = d.cost;
        this.data = d;
    }

    updateDataFromState(state) {
        let data = {};
        data.discount = state.discount;
        data.cost = state.cost;
        this.data = data;
    }

    getData = () => this.data;
};