import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { OrderWithProductIdsAsArray, OrderWithProductIdsAsObjects } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

async function getAll(): Promise<ServiceResponse<OrderWithProductIdsAsArray[]>> {
  const allOrders = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });

  const testOrders = allOrders
    .map((order) => order.dataValues) as unknown as OrderWithProductIdsAsObjects[];
  const returnData = testOrders.map((each) => ({
    id: each.id,
    userId: each.userId,
    productIds: each.productIds.map((productId) => productId.id),
  }));
  
  return { status: 'SUCCESSFUL', data: returnData };
}

export default {
  getAll,
};