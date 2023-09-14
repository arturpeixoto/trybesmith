import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import ordersMock from '../../mocks/orders.mock';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import { OrderWithProductIdsAsObjects } from '../../../src/types/Order';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('retorna todas as ordens', async function() { 
    //Arrange
    const createOrders = OrderModel.bulkBuild(ordersMock.finalOrders, {include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }]});
    sinon.stub(OrderModel, 'findAll').resolves(createOrders);
    //Act
    const httpResponse = await chai
        .request(app)
        .get('/orders');    
    //Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(ordersMock.validOrders)
  })
});
