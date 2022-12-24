module.exports = {
  ControllerService: args => {
    return function authenticate(target, key, descriptor) {
      // const originalMethod = descriptor.value;
      // descriptor.value = target;
      descriptor.value = function (req, res, next) {
        const bodyRequest = req.body;
        const paramsRequest = req.params;
        const queryRequest = req.query;
        let bodyHandle = args.body;
        let paramsHandle = args.params;
        let queryHandle = args.query;
        let errorMissing = [];
        let errorValidator = [];
        for (let i = 0; i < bodyHandle.length; i++) {
          if (!bodyRequest[bodyHandle[i].name]) {
            errorMissing.push(`${bodyHandle[i].name} is missing`);
          }
          let result = bodyHandle[i].validator(
            bodyHandle[i].name,
            bodyRequest[bodyHandle[i].name]
          );
          if (result) {
            errorValidator.push(result);
          }
        }
        for (let i = 0; i < paramsHandle.length; i++) {
          if (!paramsRequest[paramsHandle[i].name]) {
            errorMissing.push(`${paramsHandle[i].name} is missing`);
          }
          let result = paramsHandle[i].validator(
            paramsHandle[i].name,
            paramsRequest[paramsHandle[i].name]
          );
          if (result) {
            errorValidator.push(result);
          }
        }
        for (let i = 0; i < queryHandle.length; i++) {
          if (!queryRequest[queryHandle[i].name]) {
            errorMissing.push(`${queryHandle[i].name} is missing`);
          }
          let result = queryHandle[i].validator(
            queryHandle[i].name,
            queryRequest[queryHandle[i].name]
          );
          if (result) {
            errorValidator.push(result);
          }
        }
        if (errorMissing.length != 0) {
          return res
            .status(400)
            .send({ message: errorMissing.toString().replaceAll(',', '\n') });
        }
        if (errorValidator.length != 0) {
          return res
            .status(400)
            .send({ message: errorMissing.toString().replaceAll(',', '\n') });
        }
        // return originalMethod.apply(this, arguments);
      };
      return descriptor;
    };
  },
};
