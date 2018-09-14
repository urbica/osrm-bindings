# osrm-bindings

[![Build Status](https://travis-ci.org/urbica/osrm-bindings.svg?branch=master)](https://travis-ci.org/urbica/osrm-bindings)

Extract and contract [OSRM](http://project-osrm.org/) graph using NodeJS.

![](https://raw.githubusercontent.com/urbica/osrm-bindings/master/osrm_logo.svg?sanitize=true)

## Installation

```shell
npm i osrm-bindings
```

## Usage

Extract and contract OSRM graph

```js
const path = require("path");
const { extract, contract } = require("osrm-bindings");

const extractPath = path.join(__dirname, "data.osm");
const profileName = "car";

const options = {
  stdoutStream: process.stdout,
  stderrStream: process.stderr
};

extract(extractPath, profileName, options).then(graphPath =>
  contract(graphPath, options)
);
```
