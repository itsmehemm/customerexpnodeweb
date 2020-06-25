
const mongoClient = require('../mongo/mongodb');
const { COLLECTION } = require('../lib/constants/mongo-constants');
const ThemeAsProductModal = require('./ThemeAsProductModal');

class FilteredProductsModal {
    constructor(filters) {
        this.filters = filters;
        this.valid = false;
        this.themeproducts = [];
        this.filteredproducts = [];
    }

    async load() {
        const products = await new Promise((resolve) => {
            mongoClient.connection(db => {
                db.
                    collection(COLLECTION.PRODUCT)
                    .find({})
                    .toArray()
                    .then(result => {
                        if (Array.isArray(result)) {
                            return resolve(result);
                        }
                        return resolve([]);
                    })
                    .catch(() => resolve([]))
            })
        });
        if (products.length === 0) {
            console.log('FILTERED_PRODUCTS_MODAL', `failed to load products from database.`);
            return;
        }
        console.log('FILTERED_PRODUCTS_MODAL', `loaded products from database. total: ${products.length}`);
        let themeproducts = [];
        products.forEach(product => {
            const themeAsProductModal = new ThemeAsProductModal(product);
            themeproducts = [
                ...themeproducts,
                ...themeAsProductModal.getProducts()
            ];
        });
        this.themeproducts = themeproducts;
    }

    async process() {
        if (!this.filters) {
            return;
        }
        await this.load();
        console.log('FILTERED_PRODUCTS_MODAL', 'themeproducts to filter, size:', this.themeproducts.length);
        if (this.themeproducts.size === 0)
            return;
        let filteredproducts = this.themeproducts;
        this.valid = true;
        // Subcategory filter
        const subcategories = this.filters.sub_categories;
        if (subcategories && Array.isArray(subcategories) && subcategories.length > 0) {
            console.log('FILTERING', `subcategory: ${JSON.stringify(subcategories)}`);
            filteredproducts = this.themeproducts.filter(product => subcategories.includes(product.sub_category_code));
        }
        // Size filter 
        const sizes = this.filters.size;
        if (sizes && Array.isArray(sizes) && sizes.length > 0) {
            console.log('FILTERING', `sizes: ${JSON.stringify(sizes)}`);
            filteredproducts = this.themeproducts.filter(product => sizes.includes(product.size));
        }
        // Minimum price
        const priceRange = this.filters.price_range;
        if (priceRange && priceRange.min && parseInt(priceRange.min) >= 0) {
            const minPrice = parseInt(priceRange.min);
            console.log('FILTERING', `minimum price: ${JSON.stringify(minPrice)}`);
            filteredproducts = filteredproducts.filter((product) => {
                const productPrice = parseInt(product.amount.subtotal);
                if (productPrice >= minPrice) {
                    return true;
                }
                return false;
            });
        }
        // Maximum price
        if (priceRange && priceRange.max && parseInt(priceRange.max) >= 0) {
            const maxPrice = parseInt(priceRange.max);
            console.log('FILTERING', `maximum price: ${JSON.stringify(maxPrice)}`);
            filteredproducts = filteredproducts.filter((product) => {
                const productPrice = parseInt(product.amount.subtotal);
                if (productPrice <= maxPrice) {
                    return true;
                }
                return false;
            });
        }
        this.filteredproducts = filteredproducts;
    }

    isValidFilter() { return this.valid }

    getProducts() {
        return this.filteredproducts;
    }
};

module.exports = FilteredProductsModal;
