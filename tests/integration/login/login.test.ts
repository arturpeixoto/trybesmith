import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('ao não enviar username, retorna erro',async function() {
    //Arrange
    const httpRequestBody = loginMock.noUsernameLoginBody;
    //Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({message: "\"username\" and \"password\" are required" })
  })
  it('ao não enviar password, retorna erro',async function() {
    //Arrange
    const httpRequestBody = loginMock.noPasswordLoginBody;
    //Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({message: "\"username\" and \"password\" are required" })
  })
  it('ao enviar username não existente, retorna erro',async function() {
    //Arrange
    const httpRequestBody = loginMock.wrongUsernameLoginBody;
    sinon.stub(UserModel, 'findOne').resolves(null);
    //Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({message: "Username or password invalid" })
  })
  it('ao enviar password incorreto, retorna erro', async function() {
    //Arrange
    const httpRequestBody = loginMock.wrongUsernameLoginBody;
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(loginMock.validLoginFromDB));
    //Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({message: "Username or password invalid" })
  })
  it('faz login corretamente', async function() {
    //Arrange
    const httpRequestBody = loginMock.validLoginBody;
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(loginMock.validLoginFromDB));
    sinon.stub(bcrypt, 'compare').resolves(true);
    //Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    //Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.property('token')
  })
});
