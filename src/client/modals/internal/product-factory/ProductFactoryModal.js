
import BasicDetailsModal from './widgets/BasicDetailsModal';
import AttributesModal from './widgets/AttributesModal';
import CostDetailsModal from './widgets/CostDetailsModal';
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
            basic_details: new BasicDetailsModal().getData(),
            attributes: new AttributesModal().getData(),
            cost_details: new CostDetailsModal().getData(),
            advanced_details: new AdvancedDetailsModal().getData(),
            preferences: new PreferencesModal().getData()
        }
    }

    mapResponseToData() {
        const basicDetails = new BasicDetailsModal(this.rawdata);
        const attributes = new AttributesModal(this.rawdata);
        const costDetails = new CostDetailsModal(this.rawdata);
        const advancedDetails = new AdvancedDetailsModal(this.rawdata);
        const preferences = new PreferencesModal(this.rawdata);

        let data = this.getDefaultData();

        if (this.rawdata) {
            data.id = this.rawdata.id;
        }
        data.basic_details = basicDetails.getData();
        data.attributes = attributes.getData();
        data.cost_details = costDetails.getData();
        data.advanced_details = advancedDetails.getData();
        data.preferences = preferences.getData();

        this.data = data;
    }

    updateData(d) {
        const basicDetails = new BasicDetailsModal();
        const attributes = new AttributesModal();
        const costDetails = new CostDetailsModal();
        const advancedDetails = new AdvancedDetailsModal();
        const preferences = new PreferencesModal();

        basicDetails.updateDataFromState(d.basic_details);
        attributes.updateDataFromState(d.attributes);
        costDetails.updateDataFromState(d.cost_details);
        advancedDetails.updateDataFromState(d.advanced_details);
        preferences.updateDataFromState(d.preferences);

        let data = {};
        data.id = d.id;
        data.basic_details = basicDetails.getData();
        data.attributes = attributes.getData();
        data.cost_details = costDetails.getData();
        data.advanced_details = advancedDetails.getData();
        data.preferences = preferences.getData();
        this.data = data;
    }

    updateDataFromState(state) {
        const basicDetails = new BasicDetailsModal();
        const attributes = new AttributesModal();
        const costDetails = new CostDetailsModal();
        const advancedDetails = new AdvancedDetailsModal();
        const preferences = new PreferencesModal();

        basicDetails.updateDataFromState(state.basic_details);
        attributes.updateDataFromState(state.attributes);
        costDetails.updateDataFromState(state.cost_details);
        advancedDetails.updateDataFromState(state.advanced_details);
        preferences.updateDataFromState(state.preferences);

        let data = {};
        data.id = state.id;
        data.basic_details = basicDetails.getData();
        data.attributes = attributes.getData();
        data.cost_details = costDetails.getData();
        data.advanced_details = advancedDetails.getData();
        data.preferences = preferences.getData();
        this.data = data;
    }

    buildRequest() {
        return {
            "id": this.data.id,
            "name": this.data.basic_details.name,
            "description": this.data.basic_details.description,
            "product_code": this.data.basic_details.product_code,
            "category_code": this.data.basic_details.category_code,
            "default_size": this.data.attributes.default_size,
            "default_color": this.data.attributes.default_color,
            "available_sizes": this.data.attributes.available_sizes,
            "available_colors": this.data.attributes.available_colors,
            "stock_quantity": this.data.attributes.stock_quantity,
            "discount": this.data.cost_details.discount,
            "cost": this.data.cost_details.cost,
            "picture_links": [
                "https://images.bewakoof.com/t540/apna-time-ayega-half-sleeve-t-shirt-men-s-printed-t-shirts-208166-1547201568.jpg"
            ],
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
        }
    }

    getData = () => this.data;
}