const productsFromDB = {id: 1, name: 'Cajado de Merlin', price: '50 peças de ouro', orderId: 1};
const ordersFromDB = {id: 1, userId: 1};
const finalOrders = [ { id: 1, userId: 1, productIds: [{id: 1}] } ]
const validOrders = [ {id: 1, userId: 1, productIds: [1]} ]
const notToUse = [
  {
    "id": 1,
    "userId": 1,
    "productIds": [
      2,
      1
    ]
  },
  {
    "id": 2,
    "userId": 3,
    "productIds": [
      4,
      3
    ]
  },
  {
    "id": 3,
    "userId": 2,
    "productIds": [
      5
    ]
  }
]

export default {
  productsFromDB,
  ordersFromDB,
  validOrders,
  notToUse,
  finalOrders
}