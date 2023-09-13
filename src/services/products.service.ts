import ProductModel, { ProductInputtableTypes, 
  ProductSequelizeModel } from '../database/models/product.model';
import { ProductCreated } from '../types/Product';
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

async function getAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const allProducts = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: allProducts };
}

export default {
  create,
  getAll,
};