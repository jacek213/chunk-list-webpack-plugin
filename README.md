## Chunk List Webpack Plugin
This is a [webpack](http://webpack.github.io/) plugin which creates a json file listing all chunks produced during build.

### Getting started

Install the plugin:

```
npm install --save-dev chunk-list-webpack-plugin
```

### Usage

`new ChunkListWebpackPlugin(options)`

### Options

* `output` - output file path within destination directory. Default: `chunks-list.json`.
* `extensions` - only files with whitelisted extensions will be listed in file. Default: `false`.
* `groupByExtension` - If set to true, output will contain object with files grouped by extensions as keys. If set to false - output returns an array. Default: `false`
* `externalChunks` - optional array of external file names added to output chunk list json file.

### License

MIT
