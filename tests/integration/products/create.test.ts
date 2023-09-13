import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products - INTEGRAÇÃO', function () { 
  beforeEach(function () { sinon.restore(); });
  it('ao não receber name, retorna erro', async function() {
    //Arrange
    const httpRequestBody = productsMock.noNamePostProductBody;
    //Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"name\" is required" })
  })
  it('ao não receber price, retorna erro', async function() {
    //Arrange
    const httpRequestBody = productsMock.noPricePostProductBody;
    //Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"price\" is required" })
  })
  it('ao receber name sem ser string, retorna erro', async function() {
    //Arrange
    const httpRequestBody = productsMock.noStringNameProductBody;
    //Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"name\" must be a string" })
  })
  it('ao receber price sem ser string, retorna erro', async function() {
    //Arrange
    const httpRequestBody = productsMock.noStringPriceProductBody;
    //Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"price\" must be a string" })
  })
  it('ao receber name com menos de 3 caracteres, retorna erro', async function() {
    //Arrange
    const httpRequestBody = productsMock.twoCharacterNameProductBody;
    //Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"name\" length must be at least 3 characters long" })
  })
  it('ao receber price com menos de 3 caracteres, retorna erro', async function() {
    //Arrange
    const httpRequestBody = productsMock.twoCharacterPriceProductBody;
    //Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"price\" length must be at least 3 characters long" })
  })
  it('cria com sucesso um produto', async function() {
    //Arrange
    const mockCreateReturn = ProductModel.build(productsMock.validProductBodyFromDB);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    //Act
    const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(productsMock.validProductBody);
    //Assert
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productsMock.returnCreatedProduct)
  })
  it('recupera com sucesso todos os produtos', async function() {
    //Arrange
    const mockCreateReturn = ProductModel.build(productsMock.validProductBodyFromDB);
    sinon.stub(ProductModel, 'findAll').resolves([mockCreateReturn]);
    //Act
    const httpResponse = await chai
        .request(app)
        .get('/products');
    //Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(productsMock.returnGetAllProduct)
  })
});
