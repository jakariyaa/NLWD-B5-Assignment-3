export interface MongoError extends Error {
  code?: number;
  errors?: object;
}
