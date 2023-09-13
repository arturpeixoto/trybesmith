import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

type ProductCreated = {
  id: number,
  name: string,
  price: string,
};

async function create(product: ProductInputtableTypes): Promise<ServiceResponse<ProductCreated>> {
  const createdProduct = await ProductModel.create(product);
  const returnData = {
    id: createdProduct.dataValues.id,
    name: createdProduct.dataValues.name,
    price: createdProduct.dataValues.price,
  };
  return { status: 'SUCCESSFUL', data: returnData };
}

export default {
  create,
};