export type Order = {
  id: number;
  userId: number;
};

export type OrderWithProductIdsAsObjects = {
  id: number,
  userId: number,
  productIds: { id: number }[],
};

export type OrderWithProductIdsAsArray = {
  id: number,
  userId: number,
  productIds: number[],
};