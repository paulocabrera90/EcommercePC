const { json } = require("express");

const porcentajes = [10, 15, 20];

function addOfferFields(products) {
    return products.map(product => {
        const newProduct = { ...product };
        newProduct.offer = Math.random() < 0.5;
        if (newProduct.offer) {
          
            newProduct.offerPercentage = porcentajes[Math.floor(Math.random() * 3)];
        } else {
            delete newProduct.offerPercentage;
        }
        return newProduct;
    });
}

module.exports = { 
    addOfferFields
};