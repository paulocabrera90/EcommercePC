const translate = require('node-google-translate-skidz');
const IDIOMA = 'es';


async function translateAllProducts(products) {
    const translateProducts = [];
    await Promise.all(products.map( async prod => {
        translateProducts.push({ 
                ...prod,
                title: await translateText(prod.title),
                description: await translateText(prod.description),
                category: (await translateText(prod.category)).toLowerCase()
            })
            return translateProducts;
    }));

    return translateProducts;
}

async function translateCategories(categories) {
    const translate = [];
    for (const category of categories) {
      const traduccion = await translateText(category);
      translate.push(traduccion);
    }
    return translate;
  }

function translateText(texto) {
    return new Promise((resolve, reject) => {
      translate({
        text: texto,
        source: 'auto',
        target: IDIOMA
      }, function (result) {
        resolve(result.translation);
      });
    });
}

module.exports= {
    translateAllProducts,
    translateCategories
}