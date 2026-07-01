import { ProductRepository } from "./product.repository";
import { ProductService } from "./prouct.service";


const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)


export {productService}