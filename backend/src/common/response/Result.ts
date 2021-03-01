export interface IResult<T> {
  data: T | null;
  message: string;
  error: string;
  isSuccses: boolean;
}
export class ResultSuccses<T> implements IResult<T> {
  data: T;
  message: string;
  error: string;
  isSuccses: boolean;

  constructor(data: T, message: string, error: string, isSuccess: boolean) {
    this.data = data;
    this.message = message;
    this.error = error;
    this.isSuccses = isSuccess;
  }
}
export class Result<T> implements IResult<T>{
  data: T | null;
  message: string;
  error: string;
  isSuccses: boolean;

  constructor(data: T , message: string, error: string, isSuccess: boolean) {
    this.data = data;
    this.message = message;
    this.error = error;
    this.isSuccses = isSuccess;
  }
}
