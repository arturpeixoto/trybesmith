import { expect } from 'chai';
import sinon from 'sinon';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';
import loginService from '../../../src/services/login.service';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('ao enviar username não existente, retorna erro',async function() {
    //Arrange
    const { username, password } = loginMock.wrongUsernameLoginBody;
    sinon.stub(UserModel, 'findOne').resolves(null);
    //Act
    const serviceResponse = await loginService.login(username, password);
    //Assert
    expect(serviceResponse.status).to.equal('UNAUTHORIZED');
    expect(serviceResponse.data).to.be.deep.equal({message: "Username or password invalid" })
  })
  it('ao enviar password incorreto, retorna erro', async function() {
    //Arrange
    const { username, password } = loginMock.wrongUsernameLoginBody;
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(loginMock.validLoginFromDB));
    //Act
    const serviceResponse = await loginService.login(username, password);
    //Assert
    expect(serviceResponse.status).to.equal('UNAUTHORIZED');
    expect(serviceResponse.data).to.be.deep.equal({message: "Username or password invalid" })
  })
  it('faz login corretamente', async function() {
    //Arrange
    const { username, password } = loginMock.validLoginBody;
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(loginMock.validLoginFromDB));
    sinon.stub(bcrypt, 'compare').resolves(true);
    //Act
    const serviceResponse = await loginService.login(username, password);
    //Assert
    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.have.property('token')
  })
});
