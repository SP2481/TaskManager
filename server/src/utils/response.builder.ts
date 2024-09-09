import { ResponseStructure } from '../types/response';

export const ResponseBuilder = <T>(
  data: T,
  statusCode: number
): ResponseStructure<T> => {
  return {
    success: true,
    statusCode,
    data,
  };
};
