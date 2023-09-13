import { Product } from "../../src/types/Product";

const validName = 'Cajado de Merlin';
const validPrice = '50 peças de ouro';
const twoCharacterString = 'Ol'
const noString = 1234;
const orderId = 4;

const noNamePostProductBody = { price: validPrice, orderId };
const noPricePostProductBody = { name: validName, orderId};
const noStringNameProductBody = { name: noString, price: validPrice, orderId };
const noStringPriceProductBody = { name: validName, price: noString, orderId };
const twoCharacterNameProductBody = { name: twoCharacterString, price: validPrice, orderId };
const twoCharacterPriceProductBody = { name: validName, price: twoCharacterString, orderId};
const validProductBody = { name: validName, price: validPrice, orderId };
const validProductBodyFromDB = { name: validName, price: validPrice, orderId, id: 1 };
const returnCreatedProduct = { name: validName, price: validPrice, id: 1 };
const returnGetAllProduct = [{ name: validName, price: validPrice, id: 1, orderId }];

export default {
  noNamePostProductBody,
  noPricePostProductBody,
  noStringNameProductBody,
  noStringPriceProductBody,
  twoCharacterNameProductBody,
  twoCharacterPriceProductBody,
  validProductBody,
  returnCreatedProduct,
  validProductBodyFromDB,
  returnGetAllProduct,
}