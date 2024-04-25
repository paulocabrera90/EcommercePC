const globalConstants = require('../const/globalConst');
const traslate = require('../utils/traslate');
const { getProducts, findAllCategories } = require('../services/productService');

const port = globalConstants.PORT;
const applicationName = globalConstants.APPLICATION_NAME;

let productsResponse;
let categoriesResponse;

async function findAll(req, res) {
    try{

        if (!productsResponse) {
            console.log(">> Obteniendo los productos");
            productsResponse = await getProducts();
            console.log("Find all, productsResponse- getProducts", JSON.stringify(productsResponse).substring(0, 50));
            productsResponse = await traslate.translateAllProducts(productsResponse);
        }

        if(!categoriesResponse) { 
            categoriesResponse = await findAllCategories(); 
        }

        console.log("ProductsResponse por renderizar: ", JSON.stringify(productsResponse).substring(0, 50));             
        res.render('products/products', { 
            productsResponse , 
            categoriesResponse,
            port,
            applicationName
        });

    } catch (error) {
        console.error("/GET Error al obtener productos: ", error);
        res.status(500).send("Error al obtener productos");
    }
}

async function findById(id) {
    try{              
        return id;
    } catch (error) {
      throw error;
    }
}

async function filterByCategory(req, res) {
    try{
            
        const category = req.query.category;

        if(category === 'all'){

            res.render('products/products', { 
                productsResponse, 
                categoriesResponse,
                port,
                applicationName
            });
        } else {

           const productsFiltered = productsResponse.filter(
                product => product.category === category.toLowerCase()
            );
            res.render('products/products', { 
                productsResponse: productsFiltered, 
                categoriesResponse,
                port,
                applicationName,
                selectedCategory: category
            });
        }
                    

    } catch (error) {
        console.error("/GET Error al obtener productos con filtro de categoria: ", error);
        res.status(500).send("Error al obtener productos con filtro de categoria");
    }
}

module.exports= { 
    findAll, 
    findById,
    findAllCategories,
    filterByCategory
}

