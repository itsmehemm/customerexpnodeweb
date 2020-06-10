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
            }
        };
    }

    getAvailableSizes(themes) {
        let availableSizes = new Set();
        themes.forEach(theme => availableSizes.add(theme.size));
        return [...availableSizes];
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
        let stockQuantity;
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
        const { themes } = data;
        this.data = {
            id: data.id,
            availableSizes: this.getAvailableSizes(themes),
            availableColors: this.getAvailableColors(themes, data.default_size),
            amount: this.getAmount(themes, data.default_size, data.default_color),
            stockQuantity: null,
            pictureLinks: this.getPictureLinks(themes, data.default_size, data.default_color),
            selection: {
                themeId: this.getThemeId(themes, data.default_size, data.default_color),
                size: data.default_size,
                color: null,
                quantity: 1
            },
            notification: {
                status: false,
                message: null
            }
        };
    }

    getData() { return this.data }
}