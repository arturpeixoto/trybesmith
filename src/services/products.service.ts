import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product, ProductCreated } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function create(product: ProductInputtableTypes): Promise<ServiceResponse<ProductCreated>> {
  const createdProduct = await ProductModel.create(product);
  const returnData = {
    id: createdProduct.dataValues.id,
    name: createdProduct.dataValues.name,
    price: createdProduct.dataValues.price,
  };
  return { status: 'SUCCESSFUL', data: returnData };
}

async function getAll(): Promise<ServiceResponse<Product[]>> {
  const allProducts = await ProductModel.findAll();
  const returnData = allProducts.map((product) => product.dataValues);
  return { status: 'SUCCESSFUL', data: returnData };
}

export default {
  create,
  getAll,
};