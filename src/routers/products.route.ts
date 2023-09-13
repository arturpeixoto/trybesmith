import { Router } from 'express';
import productsController from '../controllers/products.controller';
import checkProductsFieldsMiddleware from '../middlewares/checkProductsFields.middleware';

const productsRouter = Router();

productsRouter.post(
  '/products', 
  checkProductsFieldsMiddleware.checkPostFields,
  checkProductsFieldsMiddleware.checkInputtableFields,
  productsController.create,
);

export default productsRouter;