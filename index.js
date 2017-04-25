function ChunkListWebpackPlugin(options) {
  this.opts                    = {};
  this.opts.output             = options.output           || 'chunks-list.json';
  this.opts.groupByExtension   = options.groupByExtension || false;
  this.opts.extensions         = options.extensions       || null;
}

ChunkListWebpackPlugin.prototype.apply = function(compiler) {
  var OPTS = this.opts;
  var chunksList = [];

  compiler.plugin('emit', function(compilation, callback) {
    compilation.chunks.forEach(function(chunk) {
      chunk.files.forEach(function(filename) {
        var ext = getFileExtension(filename);

        if (shouldIncludeFile(OPTS.extensions, ext)) {
          chunksList.push(filename);
        }
      });
    });

    var result = prepareResult(chunksList, OPTS.groupByExtension);
    var resultString = JSON.stringify(result);

    compilation.assets[OPTS.output] = {
      source: function() {
        return new Buffer(resultString);
      },
      size: function() {
        return Buffer.byteLength(resultString);
      }
    };

    callback();

  });
};

function prepareResult(list, groupByExtension) {
  if (!groupByExtension) {
    return list;
  }

  return list.reduce(function(acc, filename) {
      var ext = getFileExtension(filename);

      acc[ext] = acc[ext] || [];
      acc[ext].push(filename);

      return acc;
  }, {});
}

function shouldIncludeFile (whitelist, extension) {
  if (!whitelist) {
    return true;
  }

  return whitelist && whitelist.indexOf(extension) > -1;
}

function getFileExtension (filename) {
  var extension = filename.split('.').reverse()[0];

  if (!extension.length) {
    extension = null;
  }

  return extension;
}

module.exports = ChunkListWebpackPlugin;
