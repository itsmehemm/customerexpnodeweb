import { OPERATION_LOADING_COMPLETED } from '../../lib/constants';

export default class ProductDetailModal {

    constructor(data) {
        this.rawdata = data;
        this.data = null;
        if (data) {
            this.update(data);
        }
    }

    getDefaultData() {
        return {
            id: null,
            availableSizes: [],
            availableColors: [],
            amount: null,
            stockQuantity: null,
            pictureLinks: [],
            selection: {
                themeId: null,
                color: null,
                size: null,
                quantity: 1
            },
            notification: {
                status: false,
                message: null
            },
            delivery_status: OPERATION_LOADING_COMPLETED,
            create_order_status: OPERATION_LOADING_COMPLETED,
            pincode: ''
        };
    }

    getAvailableSizes(themes) {
        let availableSizes = new Set();
        themes.forEach(theme => availableSizes.add(theme.size));
        return Array.from(availableSizes);
    }

    getAvailableColors(themes, size) {
        let availableColors = [];
        themes.forEach(theme => {
            if (theme.size === size) {
                availableColors.push({
                    color: theme.color,
                    picture_links: theme.picture_links
                });
            }
        });
        return availableColors;
    }

    getStockQuantity(themes, size, color) {
        let stockQuantity = null;
        themes.forEach(theme => {
            if (theme.size === size && theme.color === color) {
                stockQuantity = theme.stock_quantity;
            }
        });
        return stockQuantity;
    }

    getAmount(themes, size, color) {
        if (!size) return null;
        let amount = null, defaultAmount = null;
        themes.forEach(theme => {
            if (theme.size === size && !defaultAmount) {
                defaultAmount = theme.amount;
            }
            if (theme.size === size && theme.color === color) {
                amount = theme.amount;
            }
        });
        return amount || defaultAmount;
    }

    getPictureLinks(themes, size, color) {
        if (!size) return [];
        let pictureLinks = null, defaultPictureLinks = null;
        themes.forEach(theme => {
            if (theme.size === size && !defaultPictureLinks) {
                defaultPictureLinks = theme.picture_links;
            }
            if (theme.size === size && theme.color === color) {
                pictureLinks = theme.picture_links;
            }
        });
        return pictureLinks || defaultPictureLinks;
    }

    getThemeId(themes, size, color) {
        let themeId = null;
        themes.forEach(theme => {
            if (theme.size === size && theme.color === color) {
                themeId = theme.id;
            }
        });
        return themeId;
    }

    update(data) {
        const { default_theme, themes, formatted } = data;
        this.data = {
            id: data.id,
            availableSizes: formatted.available_sizes,
            availableColors: this.getAvailableColors(themes, default_theme.size),
            amount: default_theme.amount,
            stockQuantity: null,
            pictureLinks: this.getPictureLinks(themes, default_theme.size),
            selection: {
                themeId: data.default_theme.id,
                size: default_theme.size,
                color: null,
                quantity: 1
            },
            notification: {
                status: false,
                message: null
            },
            delivery: data.delivery,
            delivery_status: OPERATION_LOADING_COMPLETED,
            create_order_status: OPERATION_LOADING_COMPLETED,
            pincode: data.delivery && data.delivery.address && data.delivery.address.pincode
        };
    }

    getData() { return this.data }
}