const utils = require("./utils");
const status = require("./status").status;
const path = require("path");
const fs = require("fs");

const createMocks = (specFilePath) => {
  const mockDir = path.resolve(process.cwd(), `camouflage-${Date.now()}`);
  fs.mkdirSync(mockDir);
  utils.getMocks(specFilePath).then((data) => {
    const urls = Object.keys(data);
    urls.forEach((url) => {
      const methods = Object.keys(data[url]);
      methods.forEach((method) => {
        const responses = data[url][method]["responses"];
        const urlFolder = url.replace(/{.*?}/g, "__");
        const mockFilePath = path.join(mockDir + urlFolder);
        if (!fs.existsSync(mockFilePath)) {
          fs.mkdirSync(mockFilePath, { recursive: true });
        }
        const statusCodes = Object.keys(responses);
        let fileContent = "";
        statusCodes.forEach((statusCode) => {
          fileContent = fileContent + `HTTP/1.1 ${statusCode} ${status[statusCode]}\nContent-Type: application/json\n\n`;
          if (typeof responses[statusCode] !== "undefined") {
            fileContent = fileContent + JSON.stringify(responses[statusCode], null, 2) + "\n";
          } else {
            fileContent = fileContent + `{\n\t"message": "More Configuration Needed"\n}\n`;
          }
          fileContent = fileContent + "====\n";
          fs.writeFileSync(path.join(mockFilePath, method.toUpperCase() + ".mock"), fileContent);
        });
      });
    });
  });
};
module.exports = createMocks;
