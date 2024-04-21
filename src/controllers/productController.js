const globalConstants = require('../const/globalConst');
const traslate = require('../utils/traslate');
const { getProducts, getCategories } = require('../services/productService');

const port = globalConstants.PORT;
const applicationName = globalConstants.APPLICATION_NAME;

let productsResponse;
let categoriesResponse;

async function findAll(req, res) {
    try{

        if (!productsResponse) {
            productsResponse = await getProducts();
            productsResponse = await traslate.translateAllProducts(productsResponse);
        }

        if(!categoriesResponse) { 
            await findAllCategories(); 
        }
             
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

async function findAllCategories() {
    
    try{
        categoriesResponse = await getCategories();

        categoriesResponse = await traslate.translateCategories(categoriesResponse);
        return categoriesResponse;

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

