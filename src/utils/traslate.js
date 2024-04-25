const translate = require('node-google-translate-skidz');
const LANGUAGE = 'es';

async function translateAllProducts(products) {
    const translateProducts = [];
    await Promise.all(products.map( async prod => {
        translateProducts.push({ 
                ...prod,
                title: await translateText(prod.title, LANGUAGE),
                description: await translateText(prod.description, LANGUAGE),
                category: (await translateText(prod.category, LANGUAGE)).toLowerCase()
            })
            return translateProducts;
    }));

    return translateProducts;
}

async function translateCategories(categories) {
    const translate = [];
    for (const category of categories) {
      const traduccion = await translateText(category, LANGUAGE);
      translate.push(traduccion);
    }
    return translate;
  }

function translateText(texto, language) {
    return new Promise((resolve, reject) => {
      translate({
        text: texto,
        source: 'auto',
        target: language
      }, function (result) {
        resolve(result.translation);
      });
    });
}

module.exports= {
    translateAllProducts,
    translateCategories,
    translateText
}