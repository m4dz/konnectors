// Generated by CoffeeScript 1.10.0
var currentPath, fs, getKonnectorModules, isCoffeeOrJsFile, modulesPath, path;

fs = require('fs');

path = require('path');

currentPath = path.dirname(fs.realpathSync(__filename));

modulesPath = path.join(currentPath, '..', 'konnectors');

isCoffeeOrJsFile = function(fileName) {
  var extension, firstChar;
  extension = fileName.split('.')[1];
  firstChar = fileName[0];
  return firstChar !== '.' && (extension === 'coffee' || extension === 'js');
};

getKonnectorModules = function() {
  var i, len, moduleFile, moduleFiles, modulePath, modules, name;
  modules = {};
  moduleFiles = fs.readdirSync(modulesPath);
  for (i = 0, len = moduleFiles.length; i < len; i++) {
    moduleFile = moduleFiles[i];
    if (isCoffeeOrJsFile(moduleFile)) {
      name = moduleFile.split('.')[0];
      modulePath = "../konnectors/" + name;
      modules[name] = require(modulePath);
    }
  }
  return modules;
};

module.exports = getKonnectorModules();