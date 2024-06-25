//? paragraph errors / name function
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    // resuelve o devuelve una promesa / si la promesa rechaza entonces devuelve un error
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
