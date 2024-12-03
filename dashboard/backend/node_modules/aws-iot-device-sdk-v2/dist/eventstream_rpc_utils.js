"use strict";
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValueAsUnion = exports.validateValueAsOptionalObject = exports.validateValueAsObject = exports.validateValueAsOptionalMap = exports.validateValueAsMap = exports.validateValueAsOptionalArray = exports.validateValueAsArray = exports.validateValueAsOptionalAny = exports.validateValueAsAny = exports.validateValueAsOptionalBlob = exports.validateValueAsBlob = exports.validateValueAsOptionalDate = exports.validateValueAsDate = exports.validateValueAsOptionalBoolean = exports.validateValueAsBoolean = exports.validateValueAsOptionalInteger = exports.validateValueAsInteger = exports.validateValueAsOptionalNumber = exports.validateValueAsNumber = exports.validateValueAsOptionalString = exports.validateValueAsString = exports.setDefinedObjectPropertyAsMap = exports.setDefinedMapPropertyAsObject = exports.normalizeMapValueAsObject = exports.setDefinedArrayProperty = exports.normalizeArrayValue = exports.setDefinedProperty = exports.transformNumberAsDate = exports.encodeDateAsNumber = exports.transformStringAsPayload = exports.encodePayloadAsString = void 0;
const eventstream_rpc = __importStar(require("./eventstream_rpc"));
const aws_crt_1 = require("aws-crt");
/*
 * Internal utility functions for generated RPC clients to perform normalization, serialization, deserialization, and
 * validation.
 *
 * Don't export; don't make part of SDK documentation.
 */
/**
 * Transforms an eventstream payload type (an opaque blob) to a base64-encoded string
 *
 * @param payload blob to transform
 * @return a base64-encoded string
 */
function encodePayloadAsString(payload) {
    return Buffer.from(payload).toString("base64");
}
exports.encodePayloadAsString = encodePayloadAsString;
/**
 * Transforms a base64-encoded string to an ArrayBuffer with the raw bytes
 *
 * @param value a base64-encoded string
 * @return an ArrayBuffer of decoded bytes
 */
function transformStringAsPayload(value) {
    return Buffer.from(value, "base64");
}
exports.transformStringAsPayload = transformStringAsPayload;
/**
 * Transforms a Date to a fractional number: seconds elapsed since epoch
 * @param date Date to transform
 * @return seconds elapsed since epoch
 */
function encodeDateAsNumber(date) {
    return date.getTime() / 1000.0;
}
exports.encodeDateAsNumber = encodeDateAsNumber;
/**
 * Transforms a value representing seconds elapsed since epoch into a Date
 * @param value seconds elapsed since epoch
 * @return an equivalent Date
 */
function transformNumberAsDate(value) {
    return new Date(value * 1000.0);
}
exports.transformNumberAsDate = transformNumberAsDate;
/**
 * Normalization/deserialization helper that replaces a value, if it exists, with a potentially transformed value
 *
 * @param object object to potentially set a property on
 * @param propertyName name of property to replace
 * @param value value to set the property to (or transform and set the property to)
 * @param transformer optional transformation function to apply to value first before setting
 */
function setDefinedProperty(object, propertyName, value, transformer) {
    if (value === undefined || value == null) {
        return;
    }
    if (transformer) {
        object[propertyName] = transformer(value);
    }
    else {
        object[propertyName] = value;
    }
}
exports.setDefinedProperty = setDefinedProperty;
/**
 * Normalizes an array value
 *
 * @param value array to normalize
 * @param valueTransformer optional transformation to apply to all array values
 *
 * @return a normalized array
 */
function normalizeArrayValue(value, transformer) {
    if (transformer == undefined) {
        return value;
    }
    let array = new Array();
    for (const element of value) {
        array.push(transformer(element));
    }
    return array;
}
exports.normalizeArrayValue = normalizeArrayValue;
/**
 * Normalization/deserialization helper that replaces an array value, if it exists, with a potentially transformed value
 *
 * @param object object to potentially set an array property on
 * @param propertyName name of property to replace
 * @param value array value to set the property to (or transform and set the property to)
 * @param transformer optional transformation function to apply to all array elements
 */
function setDefinedArrayProperty(object, propertyName, value, transformer) {
    if (value === undefined || value == null) {
        return;
    }
    object[propertyName] = normalizeArrayValue(value, transformer);
}
exports.setDefinedArrayProperty = setDefinedArrayProperty;
/**
 * Transforms a map value into a generic object with optional key and value transformation
 *
 * @param value map to transform
 * @param keyTransformer optional transformation to apply to all map keys
 * @param valueTransformer optional transformation to apply to all map values
 *
 * @return map transformed into an object
 */
function normalizeMapValueAsObject(value, keyTransformer, valueTransformer) {
    let mapAsObject = {};
    for (const [key, val] of value.entries()) {
        let transformedKey = keyTransformer ? keyTransformer(key) : key;
        let transformedvalue = valueTransformer ? valueTransformer(val) : val;
        mapAsObject[transformedKey] = transformedvalue;
    }
    return mapAsObject;
}
exports.normalizeMapValueAsObject = normalizeMapValueAsObject;
/**
 * Normalization/deserialization helper that replaces a javascript Object, if it exists, with a map where the
 * values are potentially transformed
 *
 * @param object object to potentially set an object property on
 * @param propertyName name of property to replace
 * @param value object value to transform into a map
 * @param transformer optional transformation function to apply to all map values
 */
function setDefinedMapPropertyAsObject(object, propertyName, value, keyTransformer, valueTransformer) {
    if (value === undefined || value == null) {
        return;
    }
    object[propertyName] = normalizeMapValueAsObject(value);
}
exports.setDefinedMapPropertyAsObject = setDefinedMapPropertyAsObject;
/**
 * Normalization/deserialization helper that replaces an string-keyed map value, if it exists, with a map where the
 * values are potentially transformed
 *
 * @param object object to potentially set a map property on
 * @param propertyName name of property to set
 * @param value map value to set the property to (or transform and set the property to)
 * @param transformer optional transformation function to apply to all map values
 */
function setDefinedObjectPropertyAsMap(object, propertyName, value, keyTransformer, valueTransformer) {
    if (value === undefined || value == null) {
        return;
    }
    let map = new Map();
    for (const property in value) {
        let transformedKey = keyTransformer ? keyTransformer(property) : property;
        let transformedValue = valueTransformer ? valueTransformer(value[property]) : value[property];
        map.set(transformedKey, transformedValue);
    }
    object[propertyName] = map;
}
exports.setDefinedObjectPropertyAsMap = setDefinedObjectPropertyAsMap;
/**
 * Throws an RpcError with a detailed description, if possible, of what required property was missing
 *
 * @param propertyName optional, name of the missing property
 * @param type optional, type of object that the property was supposed to be on
 */
function throwMissingPropertyError(propertyName, type) {
    if (propertyName && type) {
        throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Missing required property '${propertyName}' of type '${type}'`);
    }
    else {
        throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Missing required property`);
    }
}
/**
 * Throws an RpcError with a detailed description, if possible, of what property had a bad value
 *
 * @param valueDescription additional context of what the value should have been
 * @param propertyName optional, name of the invalid property
 * @param type optional, type of object that the property is on
 */
function throwInvalidPropertyValueError(valueDescription, propertyName, type) {
    if (propertyName && type) {
        throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Property '${propertyName}' of type '${type}' must be ${valueDescription}`);
    }
    else {
        throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Property must be ${valueDescription}`);
    }
}
/**
 * Throws an error if a property value is not a string
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsString(value, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    if (typeof value !== 'string') {
        throwInvalidPropertyValueError('a string value', propertyName, type);
    }
}
exports.validateValueAsString = validateValueAsString;
/**
 * Throws an error if a property value is not a string or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalString(value, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsString(value, propertyName, type);
}
exports.validateValueAsOptionalString = validateValueAsOptionalString;
/**
 * Throws an error if a property value is not a number
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsNumber(value, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    if (typeof value !== 'number') {
        throwInvalidPropertyValueError('a number value', propertyName, type);
    }
}
exports.validateValueAsNumber = validateValueAsNumber;
/**
 * Throws an error if a property value is not a number or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalNumber(value, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsNumber(value, propertyName, type);
}
exports.validateValueAsOptionalNumber = validateValueAsOptionalNumber;
/**
 * Throws an error if a property value is not an integer
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsInteger(value, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
        throwInvalidPropertyValueError('an integer value', propertyName, type);
    }
}
exports.validateValueAsInteger = validateValueAsInteger;
/**
 * Throws an error if a property value is not an integer or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalInteger(value, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsInteger(value, propertyName, type);
}
exports.validateValueAsOptionalInteger = validateValueAsOptionalInteger;
/**
 * Throws an error if a property value is not a boolean
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsBoolean(value, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    if (typeof value !== 'boolean') {
        throwInvalidPropertyValueError('a boolean value', propertyName, type);
    }
}
exports.validateValueAsBoolean = validateValueAsBoolean;
/**
 * Throws an error if a property value is not a boolean or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalBoolean(value, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsBoolean(value, propertyName, type);
}
exports.validateValueAsOptionalBoolean = validateValueAsOptionalBoolean;
/**
 * Throws an error if a property value is not a Date
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsDate(value, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    if (!(value instanceof Date) || isNaN(value.getTime())) {
        throwInvalidPropertyValueError('a Date value', propertyName, type);
    }
}
exports.validateValueAsDate = validateValueAsDate;
/**
 * Throws an error if a property value is not a Date or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalDate(value, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsDate(value, propertyName, type);
}
exports.validateValueAsOptionalDate = validateValueAsOptionalDate;
/**
 * Throws an error if a property value is not a valid eventstream payload (blob) type
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsBlob(value, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    /* there doesn't seem to be a good way of checking if something is an ArrayBuffer */
    if ((typeof value !== 'string') && !ArrayBuffer.isView(value) && (!value.byteLength || !value.maxByteLength)) {
        throwInvalidPropertyValueError('a value convertible to a binary payload', propertyName, type);
    }
}
exports.validateValueAsBlob = validateValueAsBlob;
/**
 * Throws an error if a property value is not a valid eventstream payload type or undefined
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalBlob(value, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsBlob(value, propertyName, type);
}
exports.validateValueAsOptionalBlob = validateValueAsOptionalBlob;
/**
 * Throws an error if a property value is not a valid defined object
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsAny(value, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
}
exports.validateValueAsAny = validateValueAsAny;
/**
 * Throws an error if a property value is not a valid JS object or undefined (always succeeds)
 *
 * @param value value to check
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalAny(value, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsAny(value, propertyName, type);
}
exports.validateValueAsOptionalAny = validateValueAsOptionalAny;
/**
 * Throws an error if a property value is not a valid array type
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each array element
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsArray(value, elementValidator, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    if (!Array.isArray(value)) {
        throwInvalidPropertyValueError('an array value', propertyName, type);
    }
    for (const element of value) {
        try {
            elementValidator(element);
        }
        catch (err) {
            let rpcError = err;
            if (propertyName && type) {
                throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Array property '${propertyName}' of type '${type}' contains an invalid value`, new aws_crt_1.CrtError(rpcError.toString()));
            }
            else {
                throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Array contains an invalid value`, new aws_crt_1.CrtError(rpcError.toString()));
            }
        }
    }
}
exports.validateValueAsArray = validateValueAsArray;
/**
 * Throws an error if a property value is not a valid array type or undefined
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each array element
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalArray(value, elementValidator, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsArray(value, elementValidator, propertyName, type);
}
exports.validateValueAsOptionalArray = validateValueAsOptionalArray;
/**
 * Throws an error if a property value is not a valid map type
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each map value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsMap(value, keyValidator, valueValidator, propertyName, type) {
    if (value === undefined) {
        return;
    }
    if (!(value instanceof Map)) {
        throwInvalidPropertyValueError('a map value', propertyName, type);
    }
    let valueAsMap = value;
    for (const [key, val] of valueAsMap) {
        try {
            keyValidator(key);
        }
        catch (err) {
            let rpcError = err;
            if (propertyName && type) {
                throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Map property '${propertyName}' of type '${type}' contains an invalid key`, new aws_crt_1.CrtError(rpcError.toString()));
            }
            else {
                throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Map contains an invalid key`, new aws_crt_1.CrtError(rpcError.toString()));
            }
        }
        try {
            valueValidator(val);
        }
        catch (err) {
            let rpcError = err;
            if (propertyName && type) {
                throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Map property '${propertyName}' of type '${type}' contains an invalid value`, new aws_crt_1.CrtError(rpcError.toString()));
            }
            else {
                throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Map contains an invalid value`, new aws_crt_1.CrtError(rpcError.toString()));
            }
        }
    }
}
exports.validateValueAsMap = validateValueAsMap;
/**
 * Throws an error if a property value is not a valid map type or undefined
 *
 * @param value value to check
 * @param elementValidator validation function to apply to each map value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalMap(value, keyValidator, valueValidator, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsMap(value, keyValidator, valueValidator, propertyName, type);
}
exports.validateValueAsOptionalMap = validateValueAsOptionalMap;
/**
 * Throws an error if a property value does not pass a validation check
 *
 * @param value value to check
 * @param elementValidator validation function to apply to the property value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsObject(value, elementValidator, propertyName, type) {
    if (value === undefined) {
        throwMissingPropertyError(propertyName, type);
    }
    try {
        elementValidator(value);
    }
    catch (err) {
        let rpcError = err;
        throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Property '${propertyName}' of type '${type}' contains an invalid value`, new aws_crt_1.CrtError(rpcError.toString()));
    }
}
exports.validateValueAsObject = validateValueAsObject;
/**
 * Throws an error if a property value does not pass a validation check and is defined
 *
 * @param value value to check
 * @param elementValidator validation function to apply to the property value
 * @param propertyName optional, name of the property with this value
 * @param type optional, type of object that the property is on
 */
function validateValueAsOptionalObject(value, elementValidator, propertyName, type) {
    if (value === undefined) {
        return;
    }
    validateValueAsObject(value, elementValidator, propertyName, type);
}
exports.validateValueAsOptionalObject = validateValueAsOptionalObject;
/*
 * Unions must have exactly one property set.  This function helps check that.
 */
function getPropertyCount(value, propertyNames) {
    let propertyCount = 0;
    for (const propertyName of propertyNames) {
        if (value.hasOwnProperty(propertyName)) {
            propertyCount += 1;
        }
    }
    return propertyCount;
}
/**
 * Throws a validation error if:
 *   (1) the value does not have exactly one modeled property set, or
 *   (2) the set property does not pass validation
 *
 * @param value union value to check
 * @param validators a map of validators, from (union) property name to validation function
 */
function validateValueAsUnion(value, validators) {
    let propertyCount = getPropertyCount(value, validators.keys());
    if (propertyCount != 1) {
        throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Union has ${propertyCount} properties set`);
    }
    for (const [propertyName, validator] of validators.entries()) {
        let propertyValue = value[propertyName];
        if (propertyValue && validator) {
            try {
                validator(propertyValue);
            }
            catch (err) {
                let rpcError = err;
                throw eventstream_rpc.createRpcError(eventstream_rpc.RpcErrorType.ValidationError, `Union property '${propertyName}' contains an invalid value`, new aws_crt_1.CrtError(rpcError.toString()));
            }
        }
    }
}
exports.validateValueAsUnion = validateValueAsUnion;
//# sourceMappingURL=eventstream_rpc_utils.js.map