export const HandlerError = error => {
  switch (String(error)) {
    case "Error: Request failed with status code 400":
      return 400;
    case "Error: Request failed with status code 401":
      return 401;
    case "Error: Request failed with status code 403":
      return 403;
    case "Error: Request failed with status code 404":
      return 404;
    default:
      return 500;
  }
};
