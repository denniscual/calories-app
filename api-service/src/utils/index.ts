export enum MEALS {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
  snack = 'snack',
}

export enum HTTPStatuses {
  'SUCCESS' = 200,
  'CREATED_ONCE_SUCCESS' = 201,
  'DELETE_OR_PUT_SUCCESS' = 201,
  'UNAUTHORIZED' = 401,
  'NOT_FOUND' = 404,
  'BAD_REQUEST' = 500,
}

export function createResponseMessage(msg: string, data: object = {}) {
  const response: Record<string, unknown> = {
    message: msg,
  };
  if (data) {
    response.data = data;
  }
  return response;
}
