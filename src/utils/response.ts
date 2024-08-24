export const responseBuilder = (
  res: any,
  status: boolean,
  httpCode: number,
  data: any,
  error?: any
) => {
  if ((httpCode === 200 || httpCode === 201) && status) {
    res.status(httpCode).send({
      status: status,
      httpCode: httpCode,
      message: "success",
      data: data,
    });
  } else {
    res.status(httpCode).send({
      status: status,
      //   httpCode: httpCode,
      message: error,
    });
  }
};
