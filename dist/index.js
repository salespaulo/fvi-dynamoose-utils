'use strict';

var globalIndexString = function globalIndexString() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var rangeKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var project = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var throughput = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
  return {
    type: String,
    trim: true,
    required: true,
    index: {
      name: name,
      rangeKey: rangeKey,
      project: project,
      throughput: throughput,
      global: true
    }
  };
};

var requiredString = function requiredString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return {
    type: String,
    required: true,
    "default": value,
    trim: trim
  };
};

var optionalString = function optionalString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return {
    type: String,
    required: false,
    "default": value,
    trim: trim
  };
};

var requiredEnumString = function requiredEnumString() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!values) {
    var e = new Error("[Dynamoose Utils]: Enum String Values is Empty!");
    e.name = 'RequiredEnumStringDynamooseError';
    throw e;
  }

  return {
    type: String,
    trim: true,
    "enum": values,
    required: true,
    "default": value
  };
};

var optionalEnumString = function optionalEnumString() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!values) {
    var e = new Error("[Dynamoose Utils]: Enum String Values is Empty!");
    e.name = 'OptionalEnumStringDynamooseError';
    throw e;
  }

  return {
    type: String,
    trim: true,
    "enum": values,
    required: false,
    "default": value
  };
};

var requiredArrayString = function requiredArrayString() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: Set,
    schema: [String],
    "default": values,
    required: true
  };
};

var optionalArrayString = function optionalArrayString() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: Set,
    schema: [String],
    "default": values,
    required: false
  };
};

var hashKeyString = function hashKeyString() {
  return {
    type: String,
    trim: true,
    hashKey: true
  };
};

var rangeKeyString = function rangeKeyString() {
  return {
    type: String,
    rangeKey: true,
    trim: true
  };
};

var optionalObject = function optionalObject() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: Object,
    "default": value,
    required: false
  };
};

var requiredObject = function requiredObject() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: Object,
    "default": value,
    required: true
  };
};

var requiredInt = function requiredInt() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: Number,
    "default": value,
    required: true
  };
};

var optionalInt = function optionalInt() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: Number,
    "default": value,
    required: false
  };
};

module.exports = {
  optionalObject: optionalObject,
  requiredObject: requiredObject,
  requiredInt: requiredInt,
  optionalInt: optionalInt,
  requiredString: requiredString,
  optionalString: optionalString,
  requiredEnumString: requiredEnumString,
  optionalEnumString: optionalEnumString,
  requiredArrayString: requiredArrayString,
  optionalArrayString: optionalArrayString,
  hashKeyString: hashKeyString,
  rangeKeyString: rangeKeyString,
  globalIndexString: globalIndexString
};