exports.validateCarData = async req => {
  const carName = req.body.carName;
  const model = req.body.model;
  return new Promise((resolve, reject) => {
    if (!carName) {
      reject("Kindly add the car name");
    }
    if (!model) {
      reject("Kindly add the car model");
    }
    resolve();
  });
};
