import { expect } from 'chai';
import sinon from 'sinon';
import ordersService from '../../../src/services/orders.service';
import OrderModel from '../../../src/database/models/order.model';
import ordersMock from '../../mocks/orders.mock';
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('retorna status sucesso e o objeto correto', async function() {
    //Arrange
    const createOrders = OrderModel.bulkBuild(ordersMock.finalOrders, 
      {include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }]});
    
    sinon.stub(OrderModel, 'findAll').resolves(createOrders);
    // Act
    const serviceResponse = await ordersService.getAll();
    // Assert
    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(ordersMock.validOrders)
  })
});
