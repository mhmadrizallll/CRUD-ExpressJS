const logger = require("./winston");

const logProcess = (req, res, next) => {
  //   console.log({
  //     method: req.method,
  //     url: req.url,
  //     path: req.path,
  //   });
  for (let i = 0; i < 2; i++) {
    logger.error("ini console error" + i);
    logger.warn("ini console warn" + i);
    logger.info("ini console info" + i);
    logger.http("ini console http" + i);
    logger.verbose("ini console verbose" + i);
    logger.debug("ini console debug" + i);
    logger.silly("ini console silly" + i);
  }

  next();
};

module.exports = logProcess;
