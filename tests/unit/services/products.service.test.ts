import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';
import productsService from '../../../src/services/products.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('cria com sucesso um produto', async function() {
    //Arrange
    const mockCreateReturn = ProductModel.build(productsMock.validProductBodyFromDB);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    //Act
    const serviceResponse = await productsService.create(productsMock.validProductBody)
    //Assert
    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(productsMock.returnCreatedProduct)
  })
  it('recupera com sucesso todos os produtos', async function() {
    //Arrange
    const mockCreateReturn = ProductModel.build(productsMock.validProductBodyFromDB);
    sinon.stub(ProductModel, 'findAll').resolves([mockCreateReturn]);
    //Act
    const httpResponse = await productsService.getAll()
    //Assert
    expect(httpResponse.status).to.equal('SUCCESSFUL');
    expect(httpResponse.data).to.be.deep.equal(productsMock.returnGetAllProduct)
  })
});
