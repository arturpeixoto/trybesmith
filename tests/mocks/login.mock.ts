const validUsername = 'Hagar';
const validPassword = 'terrivel';
const notValidUsername = 'JonSnow'
const notValidPassword = 'xablau'

const noUsernameLoginBody = {password: validPassword}
const noPasswordLoginBody = {username: validUsername}
const wrongPasswordLoginBody = {username: validUsername, password: notValidPassword}
const wrongUsernameLoginBody = {username: notValidUsername, password: notValidPassword}
const validLoginBody = { username: validUsername, password: validPassword }
const validLoginFromDB = { id: 1, username: validUsername, level: 10, vocation: 'Rougue', password: validPassword }

export default {
  noUsernameLoginBody,
  noPasswordLoginBody,
  wrongPasswordLoginBody,
  wrongUsernameLoginBody,
  validLoginBody,
  validLoginFromDB,
}