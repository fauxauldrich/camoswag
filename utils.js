let Swagmock = require("swagmock");
module.exports.getMocks = async function getMocks(openAPI) {
  let Mockgen = Swagmock(openAPI, {});
  const data = await Mockgen.responses({});
  return data;
};
