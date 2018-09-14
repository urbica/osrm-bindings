const path = require('path');
const { spawn } = require('child_process');

const osrmBindingPath = path.join(__dirname, 'node_modules/osrm/lib/binding');
const osrmProfilesPath = path.join(__dirname, 'node_modules/osrm/profiles');

const osrmExctract = path.join(osrmBindingPath, 'osrm-extract');
const osrmContract = path.join(osrmBindingPath, 'osrm-contract');

const replaceExtension = (filePath, newExtension) => {
  const newFileName = path.basename(filePath, path.extname(filePath)) + newExtension;
  return path.join(path.dirname(filePath), newFileName);
};

const extract = (extractPath, profileName, options = {}) =>
  new Promise((resolve, reject) => {
    const { stdoutStream, stderrStream } = options;

    const extractProfile = path.join(osrmProfilesPath, `${profileName}.lua`);
    const graphPath = replaceExtension(extractPath, '.osrm');

    const extractProcess = spawn(osrmExctract, ['-p', extractProfile, extractPath]);

    if (stdoutStream) {
      extractProcess.stdout.on('data', data => stdoutStream.write(data));
    }

    if (stderrStream) {
      extractProcess.stderr.on('data', data => stderrStream.write(data));
    }

    extractProcess.on('close', exitCode => {
      if (exitCode === 0) {
        return resolve(graphPath);
      }

      return reject(
        new Error(`OSRM failed to extract graph from ${extractPath} with exit code ${exitCode}`)
      );
    });
  });

const contract = (graphPath, options = {}) =>
  new Promise((resolve, reject) => {
    const { stdoutStream, stderrStream } = options;

    const contractProcess = spawn(osrmContract, [graphPath]);

    if (stdoutStream) {
      contractProcess.stdout.on('data', data => stdoutStream.write(data));
    }

    if (stderrStream) {
      contractProcess.stderr.on('data', data => stderrStream.write(data));
    }

    contractProcess.on('close', exitCode => {
      if (exitCode === 0) {
        return resolve(graphPath);
      }

      return reject(
        new Error(`OSRM failed to contract graph from ${graphPath} with exit code ${exitCode}`)
      );
    });
  });

module.exports = { extract, contract };
