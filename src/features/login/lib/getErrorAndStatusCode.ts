export const getErrorAndStatusCode = (
  e: unknown
): { error: string; statusCode: number } => {
  let error = "";
  let statusCode = 0;
  if (typeof e === "object" && e !== null) {
    const errObj = e as ErrorWithResponse;
    if (typeof errObj.error === "string") {
      error = errObj.error;
    }
    if (typeof errObj.statusCode === "number") {
      statusCode = errObj.statusCode;
    }
  }
  return { error, statusCode };
};

export const messageError = (e: unknown): string => {
  if (typeof e === "object" && e !== null && "response" in e) {
    const err = e as ErrorWithResponse;
    if (typeof err.response?.data?.message === "string") {
      return err.response.data.message;
    }
  }
  return "Something went wrong";
};

type ErrorWithResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
  error?: string;
  statusCode?: number;
};