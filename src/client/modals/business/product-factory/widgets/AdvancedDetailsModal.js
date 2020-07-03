export default class AdvancedDetailsModal {

    constructor(r) {
        this.rawdata = r;
        this.data = null;
        this.mapResponseToData();
    }

    getDefaultData = () => {
        return {
            type: "",
            sleeve: "",
            fit: "",
            fabric: "",
            pack_size: "",
            neck_type: "",
            ideal_gender: "",
            occasion: "",
            brand_color: "",
            fabric_care: "",
            brand_fit: "",
        };
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata && this.rawdata.advanced_details) {
            data.type = this.rawdata.advanced_details.type
            data.sleeve = this.rawdata.advanced_details.sleeve;
            data.fit = this.rawdata.advanced_details.fit;
            data.fabric = this.rawdata.advanced_details.fabric;
            data.pack_size = this.rawdata.advanced_details.pack_size;
            data.neck_type = this.rawdata.advanced_details.neck_type;
            data.ideal_gender = this.rawdata.advanced_details.ideal_gender;
            data.occasion = this.rawdata.advanced_details.occasion;
            data.brand_color = this.rawdata.advanced_details.brand_color;
            data.fabric_care = this.rawdata.advanced_details.fabric_care;
            data.brand_fit = this.rawdata.advanced_details.brand_fit;
        }
        this.data = data;
    }

    updateData(d) {
        let data = {};
        data.type = d.type
        data.sleeve = d.sleeve;
        data.fit = d.fit;
        data.fabric = d.fabric;
        data.pack_size = d.pack_size;
        data.neck_type = d.neck_type;
        data.ideal_gender = d.ideal_gender;
        data.occasion = d.occasion;
        data.brand_color = d.brand_color;
        data.fabric_care = d.fabric_care;
        data.brand_fit = d.brand_fit;
        this.data = d;
    }

    updateDataFromState(state) {
        let data = {};
        data.type = state.type
        data.sleeve = state.sleeve;
        data.fit = state.fit;
        data.fabric = state.fabric;
        data.pack_size = state.pack_size;
        data.neck_type = state.neck_type;
        data.ideal_gender = state.ideal_gender;
        data.occasion = state.occasion;
        data.brand_color = state.brand_color;
        data.fabric_care = state.fabric_care;
        data.brand_fit = state.brand_fit;
        this.data = data;
    }

    getData = () => this.data;
};