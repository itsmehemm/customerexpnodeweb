export default class PreferencesModal {

    constructor(r) {
        this.rawdata = r;
        this.data = null;
        this.mapResponseToData();
    }

    getDefaultData = () => {
        return {
            featured: false,
            active: true,
            thirty_day_exchange: false,
            fifteen_day_exchange: false,
            payment_options: ['CREDIT_OR_DEBIT_CARDS'],
        };
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata) {
            data.featured = this.rawdata.featured;
            data.active = this.rawdata.active;
            data.thirty_day_exchange = this.rawdata.thirty_day_exchange;
            data.fifteen_day_exchange = this.rawdata.fifteen_day_exchange;
            data.payment_options = this.rawdata.payment_options;
        }
        this.data = data;
    }

    updateData(d) {
        let data = {};
        data.featured = d.featured;
        data.active = d.active;
        data.thirty_day_exchange = d.thirty_day_exchange;
        data.fifteen_day_exchange = d.fifteen_day_exchange;
        data.payment_options = d.payment_options;
        this.data = d;
    }

    updateDataFromState(state) {
        let data = {};
        data.featured = state.featured;
        data.active = state.active;
        data.thirty_day_exchange = state.thirty_day_exchange;
        data.fifteen_day_exchange = state.fifteen_day_exchange;
        data.payment_options = state.payment_options;
        this.data = data;
    }

    getData = () => this.data;
};