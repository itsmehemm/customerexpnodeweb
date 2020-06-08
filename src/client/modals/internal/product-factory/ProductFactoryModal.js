import BasicDetailsModal from './widgets/BasicDetailsModal';
import ThemesModal from './widgets/ThemesModal';
import AdvancedDetailsModal from './widgets/AdvancedDetailsModal';
import PreferencesModal from './widgets/PreferencesModal';

export default class ProductFactoryModal {

    constructor(r) {
        this.rawdata = r;
        this.data = null;
        this.mapResponseToData();
    }

    getDefaultData() {
        return {
            id: null,
            basic_details: new BasicDetailsModal().getDefaultData(),
            themes: new ThemesModal().getDefaultData(),
            advanced_details: new AdvancedDetailsModal().getDefaultData(),
            preferences: new PreferencesModal().getDefaultData()
        };
    }

    mapResponseToData() {
        let data = this.getDefaultData();
        if (this.rawdata) {
            const basicDetails = new BasicDetailsModal(this.rawdata);
            const themes = new ThemesModal(this.rawdata);
            const advancedDetails = new AdvancedDetailsModal(this.rawdata);
            const preferences = new PreferencesModal(this.rawdata);
            data.id = this.rawdata.id;
            data.basic_details = basicDetails.getData();
            data.themes = themes.getData();
            data.advanced_details = advancedDetails.getData();
            data.preferences = preferences.getData();
        }
        this.data = data;
    }

    updateData(d) {
        const basicDetails = new BasicDetailsModal();
        const themes = new ThemesModal();
        const advancedDetails = new AdvancedDetailsModal();
        const preferences = new PreferencesModal();
        basicDetails.updateDataFromState(d.basic_details);
        themes.updateDataFromState(d.themes);
        advancedDetails.updateDataFromState(d.advanced_details);
        preferences.updateDataFromState(d.preferences);
        let data = {};
        data.id = d.id;
        data.basic_details = basicDetails.getData();
        data.themes = themes.getData();
        data.advanced_details = advancedDetails.getData();
        data.preferences = preferences.getData();
        this.data = data;
    }

    updateDataFromState(state) {
        const basicDetails = new BasicDetailsModal();
        const themes = new ThemesModal();
        const advancedDetails = new AdvancedDetailsModal();
        const preferences = new PreferencesModal();
        basicDetails.updateDataFromState(state.basic_details);
        themes.updateDataFromState(state.themes);
        advancedDetails.updateDataFromState(state.advanced_details);
        preferences.updateDataFromState(state.preferences);
        let data = {};
        data.id = state.id;
        data.basic_details = basicDetails.getData();
        data.themes = themes.getData();
        data.advanced_details = advancedDetails.getData();
        data.preferences = preferences.getData();
        console.log(JSON.stringify(data, undefined, 2));
        this.data = data;
    }

    buildRequest() {
        return {
            "id": this.data.id,
            "name": this.data.basic_details.name,
            "description": this.data.basic_details.description,
            "product_code": this.data.basic_details.product_code,
            "category_code": this.data.basic_details.category_code,
            "themes": this.data.themes,
            "featured": this.data.preferences.featured,
            "thirty_day_exchange": this.data.preferences.thirty_day_exchange,
            "fifteen_day_exchange": this.data.preferences.fifteen_day_exchange,
            "payment_options": this.data.preferences.payment_options,
            "advanced_details": {
                "type": this.data.advanced_details.type,
                "sleeve": this.data.advanced_details.sleeve,
                "fit": this.data.advanced_details.fit,
                "fabric": this.data.advanced_details.fabric,
                "pack_size": this.data.advanced_details.pack_size,
                "neck_type": this.data.advanced_details.neck_type,
                "ideal_gender": this.data.advanced_details.ideal_gender,
                "occasion": this.data.advanced_details.occasion,
                "brand_color": this.data.advanced_details.brand_color,
                "fabric_care": this.data.advanced_details.fabric_care,
                "brand_fit": this.data.advanced_details.brand_fit,
            }
        };
    }

    getData = () => this.data;
}