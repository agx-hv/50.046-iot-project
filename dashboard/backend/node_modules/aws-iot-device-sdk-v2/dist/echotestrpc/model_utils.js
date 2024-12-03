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
exports.deserializeEventstreamMessageToGetAllCustomersResponse = exports.deserializeGetAllProductsRequest = exports.deserializeGetAllProductsResponse = exports.deserializeCauseServiceErrorRequest = exports.deserializeCauseServiceErrorResponse = exports.deserializeEchoStreamingRequest = exports.deserializeEchoStreamingResponse = exports.deserializeEchoMessageRequest = exports.deserializeEchoMessageResponse = exports.deserializeGetAllCustomersRequest = exports.deserializeGetAllCustomersResponse = exports.deserializeServiceError = exports.deserializeEchoStreamingMessage = exports.deserializeMessageData = exports.deserializeCustomer = exports.deserializePair = exports.deserializeProduct = exports.validateGetAllProductsRequest = exports.validateGetAllProductsResponse = exports.validateCauseServiceErrorRequest = exports.validateCauseServiceErrorResponse = exports.validateEchoStreamingRequest = exports.validateEchoStreamingResponse = exports.validateEchoMessageRequest = exports.validateEchoMessageResponse = exports.validateGetAllCustomersRequest = exports.validateGetAllCustomersResponse = exports.validateServiceError = exports.validateEchoStreamingMessage = exports.validateMessageData = exports.validateCustomer = exports.validatePair = exports.validateProduct = exports.normalizeGetAllProductsRequest = exports.normalizeGetAllProductsResponse = exports.normalizeCauseServiceErrorRequest = exports.normalizeCauseServiceErrorResponse = exports.normalizeEchoStreamingRequest = exports.normalizeEchoStreamingResponse = exports.normalizeEchoMessageRequest = exports.normalizeEchoMessageResponse = exports.normalizeGetAllCustomersRequest = exports.normalizeGetAllCustomersResponse = exports.normalizeServiceError = exports.normalizeEchoStreamingMessage = exports.normalizeMessageData = exports.normalizeCustomer = exports.normalizePair = exports.normalizeProduct = exports.makeServiceModel = void 0;
exports.serializeEchoStreamingMessageToEventstreamMessage = exports.serializeEchoStreamingRequestToEventstreamMessage = exports.serializeCauseServiceErrorRequestToEventstreamMessage = exports.serializeGetAllCustomersRequestToEventstreamMessage = exports.serializeEchoMessageRequestToEventstreamMessage = exports.serializeGetAllProductsRequestToEventstreamMessage = exports.deserializeEventstreamMessageToEchoStreamingMessage = exports.deserializeEventstreamMessageToGetAllProductsResponse = exports.deserializeEventstreamMessageToEchoMessageResponse = exports.deserializeEventstreamMessageToCauseServiceErrorResponse = exports.deserializeEventstreamMessageToEchoStreamingResponse = exports.deserializeEventstreamMessageToServiceError = void 0;
/* This file is generated */
const eventstream_rpc_utils = __importStar(require("../eventstream_rpc_utils"));
const aws_crt_1 = require("aws-crt");
const util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
function createNormalizerMap() {
    return new Map([
        ["awstest#Product", normalizeProduct],
        ["awstest#Pair", normalizePair],
        ["awstest#Customer", normalizeCustomer],
        ["awstest#MessageData", normalizeMessageData],
        ["awstest#EchoStreamingMessage", normalizeEchoStreamingMessage],
        ["awstest#ServiceError", normalizeServiceError],
        ["awstest#GetAllCustomersResponse", normalizeGetAllCustomersResponse],
        ["awstest#GetAllCustomersRequest", normalizeGetAllCustomersRequest],
        ["awstest#EchoMessageResponse", normalizeEchoMessageResponse],
        ["awstest#EchoMessageRequest", normalizeEchoMessageRequest],
        ["awstest#EchoStreamingResponse", normalizeEchoStreamingResponse],
        ["awstest#EchoStreamingRequest", normalizeEchoStreamingRequest],
        ["awstest#CauseServiceErrorResponse", normalizeCauseServiceErrorResponse],
        ["awstest#CauseServiceErrorRequest", normalizeCauseServiceErrorRequest],
        ["awstest#GetAllProductsResponse", normalizeGetAllProductsResponse],
        ["awstest#GetAllProductsRequest", normalizeGetAllProductsRequest]
    ]);
}
function createValidatorMap() {
    return new Map([
        ["awstest#Product", validateProduct],
        ["awstest#Pair", validatePair],
        ["awstest#Customer", validateCustomer],
        ["awstest#MessageData", validateMessageData],
        ["awstest#EchoStreamingMessage", validateEchoStreamingMessage],
        ["awstest#ServiceError", validateServiceError],
        ["awstest#GetAllCustomersResponse", validateGetAllCustomersResponse],
        ["awstest#GetAllCustomersRequest", validateGetAllCustomersRequest],
        ["awstest#EchoMessageResponse", validateEchoMessageResponse],
        ["awstest#EchoMessageRequest", validateEchoMessageRequest],
        ["awstest#EchoStreamingResponse", validateEchoStreamingResponse],
        ["awstest#EchoStreamingRequest", validateEchoStreamingRequest],
        ["awstest#CauseServiceErrorResponse", validateCauseServiceErrorResponse],
        ["awstest#CauseServiceErrorRequest", validateCauseServiceErrorRequest],
        ["awstest#GetAllProductsResponse", validateGetAllProductsResponse],
        ["awstest#GetAllProductsRequest", validateGetAllProductsRequest]
    ]);
}
function createDeserializerMap() {
    return new Map([
        ["awstest#GetAllCustomersResponse", deserializeEventstreamMessageToGetAllCustomersResponse],
        ["awstest#ServiceError", deserializeEventstreamMessageToServiceError],
        ["awstest#EchoStreamingResponse", deserializeEventstreamMessageToEchoStreamingResponse],
        ["awstest#CauseServiceErrorResponse", deserializeEventstreamMessageToCauseServiceErrorResponse],
        ["awstest#EchoMessageResponse", deserializeEventstreamMessageToEchoMessageResponse],
        ["awstest#GetAllProductsResponse", deserializeEventstreamMessageToGetAllProductsResponse],
        ["awstest#EchoStreamingMessage", deserializeEventstreamMessageToEchoStreamingMessage]
    ]);
}
function createSerializerMap() {
    return new Map([
        ["awstest#GetAllProductsRequest", serializeGetAllProductsRequestToEventstreamMessage],
        ["awstest#EchoMessageRequest", serializeEchoMessageRequestToEventstreamMessage],
        ["awstest#GetAllCustomersRequest", serializeGetAllCustomersRequestToEventstreamMessage],
        ["awstest#CauseServiceErrorRequest", serializeCauseServiceErrorRequestToEventstreamMessage],
        ["awstest#EchoStreamingRequest", serializeEchoStreamingRequestToEventstreamMessage],
        ["awstest#EchoStreamingMessage", serializeEchoStreamingMessageToEventstreamMessage]
    ]);
}
function createOperationMap() {
    return new Map([
        ["awstest#CauseServiceError", {
                requestShape: "awstest#CauseServiceErrorRequest",
                responseShape: "awstest#CauseServiceErrorResponse",
                errorShapes: new Set([
                    "awstest#ServiceError"
                ])
            }],
        ["awstest#CauseStreamServiceToError", {
                requestShape: "awstest#EchoStreamingRequest",
                responseShape: "awstest#EchoStreamingResponse",
                outboundMessageShape: "awstest#EchoStreamingMessage",
                inboundMessageShape: "awstest#EchoStreamingMessage",
                errorShapes: new Set([
                    "awstest#ServiceError"
                ])
            }],
        ["awstest#EchoMessage", {
                requestShape: "awstest#EchoMessageRequest",
                responseShape: "awstest#EchoMessageResponse",
                errorShapes: new Set([])
            }],
        ["awstest#EchoStreamMessages", {
                requestShape: "awstest#EchoStreamingRequest",
                responseShape: "awstest#EchoStreamingResponse",
                outboundMessageShape: "awstest#EchoStreamingMessage",
                inboundMessageShape: "awstest#EchoStreamingMessage",
                errorShapes: new Set([])
            }],
        ["awstest#GetAllCustomers", {
                requestShape: "awstest#GetAllCustomersRequest",
                responseShape: "awstest#GetAllCustomersResponse",
                errorShapes: new Set([
                    "awstest#ServiceError"
                ])
            }],
        ["awstest#GetAllProducts", {
                requestShape: "awstest#GetAllProductsRequest",
                responseShape: "awstest#GetAllProductsResponse",
                errorShapes: new Set([
                    "awstest#ServiceError"
                ])
            }]
    ]);
}
const FruitEnumValues = new Set([
    "apl",
    "org",
    "ban",
    "pin"
]);
function createEnumsMap() {
    return new Map([
        ["FruitEnum", FruitEnumValues],
    ]);
}
function makeServiceModel() {
    return {
        normalizers: createNormalizerMap(),
        validators: createValidatorMap(),
        deserializers: createDeserializerMap(),
        serializers: createSerializerMap(),
        operations: createOperationMap(),
        enums: createEnumsMap()
    };
}
exports.makeServiceModel = makeServiceModel;
function normalizeProduct(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'name', value.name);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'price', value.price);
    return normalizedValue;
}
exports.normalizeProduct = normalizeProduct;
function normalizePair(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'key', value.key);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'value', value.value);
    return normalizedValue;
}
exports.normalizePair = normalizePair;
function normalizeCustomer(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'id', value.id);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'firstName', value.firstName);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'lastName', value.lastName);
    return normalizedValue;
}
exports.normalizeCustomer = normalizeCustomer;
function normalizeMessageData(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'stringMessage', value.stringMessage);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'booleanMessage', value.booleanMessage);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'timeMessage', value.timeMessage, eventstream_rpc_utils.encodeDateAsNumber);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'documentMessage', value.documentMessage);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'enumMessage', value.enumMessage);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'blobMessage', value.blobMessage, eventstream_rpc_utils.encodePayloadAsString);
    eventstream_rpc_utils.setDefinedArrayProperty(normalizedValue, 'stringListMessage', value.stringListMessage, undefined);
    eventstream_rpc_utils.setDefinedArrayProperty(normalizedValue, 'keyValuePairList', value.keyValuePairList, normalizePair);
    eventstream_rpc_utils.setDefinedMapPropertyAsObject(normalizedValue, 'stringToValue', value.stringToValue, undefined, normalizeProduct);
    return normalizedValue;
}
exports.normalizeMessageData = normalizeMessageData;
function normalizeEchoStreamingMessage(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'streamMessage', value.streamMessage, normalizeMessageData);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'keyValuePair', value.keyValuePair, normalizePair);
    return normalizedValue;
}
exports.normalizeEchoStreamingMessage = normalizeEchoStreamingMessage;
function normalizeServiceError(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'message', value.message);
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'value', value.value);
    return normalizedValue;
}
exports.normalizeServiceError = normalizeServiceError;
function normalizeGetAllCustomersResponse(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedArrayProperty(normalizedValue, 'customers', value.customers, normalizeCustomer);
    return normalizedValue;
}
exports.normalizeGetAllCustomersResponse = normalizeGetAllCustomersResponse;
function normalizeGetAllCustomersRequest(value) {
    let normalizedValue = {};
    return normalizedValue;
}
exports.normalizeGetAllCustomersRequest = normalizeGetAllCustomersRequest;
function normalizeEchoMessageResponse(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'message', value.message, normalizeMessageData);
    return normalizedValue;
}
exports.normalizeEchoMessageResponse = normalizeEchoMessageResponse;
function normalizeEchoMessageRequest(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedProperty(normalizedValue, 'message', value.message, normalizeMessageData);
    return normalizedValue;
}
exports.normalizeEchoMessageRequest = normalizeEchoMessageRequest;
function normalizeEchoStreamingResponse(value) {
    let normalizedValue = {};
    return normalizedValue;
}
exports.normalizeEchoStreamingResponse = normalizeEchoStreamingResponse;
function normalizeEchoStreamingRequest(value) {
    let normalizedValue = {};
    return normalizedValue;
}
exports.normalizeEchoStreamingRequest = normalizeEchoStreamingRequest;
function normalizeCauseServiceErrorResponse(value) {
    let normalizedValue = {};
    return normalizedValue;
}
exports.normalizeCauseServiceErrorResponse = normalizeCauseServiceErrorResponse;
function normalizeCauseServiceErrorRequest(value) {
    let normalizedValue = {};
    return normalizedValue;
}
exports.normalizeCauseServiceErrorRequest = normalizeCauseServiceErrorRequest;
function normalizeGetAllProductsResponse(value) {
    let normalizedValue = {};
    eventstream_rpc_utils.setDefinedMapPropertyAsObject(normalizedValue, 'products', value.products, undefined, normalizeProduct);
    return normalizedValue;
}
exports.normalizeGetAllProductsResponse = normalizeGetAllProductsResponse;
function normalizeGetAllProductsRequest(value) {
    let normalizedValue = {};
    return normalizedValue;
}
exports.normalizeGetAllProductsRequest = normalizeGetAllProductsRequest;
function validateProduct(value) {
    eventstream_rpc_utils.validateValueAsOptionalString(value.name, 'name', 'Product');
    eventstream_rpc_utils.validateValueAsOptionalNumber(value.price, 'price', 'Product');
}
exports.validateProduct = validateProduct;
function validatePair(value) {
    eventstream_rpc_utils.validateValueAsString(value.key, 'key', 'Pair');
    eventstream_rpc_utils.validateValueAsString(value.value, 'value', 'Pair');
}
exports.validatePair = validatePair;
function validateCustomer(value) {
    eventstream_rpc_utils.validateValueAsOptionalInteger(value.id, 'id', 'Customer');
    eventstream_rpc_utils.validateValueAsOptionalString(value.firstName, 'firstName', 'Customer');
    eventstream_rpc_utils.validateValueAsOptionalString(value.lastName, 'lastName', 'Customer');
}
exports.validateCustomer = validateCustomer;
function validateMessageData(value) {
    eventstream_rpc_utils.validateValueAsOptionalString(value.stringMessage, 'stringMessage', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalBoolean(value.booleanMessage, 'booleanMessage', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalDate(value.timeMessage, 'timeMessage', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalAny(value.documentMessage, 'documentMessage', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalString(value.enumMessage, 'enumMessage', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalBlob(value.blobMessage, 'blobMessage', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalArray(value.stringListMessage, eventstream_rpc_utils.validateValueAsString, 'stringListMessage', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalArray(value.keyValuePairList, validatePair, 'keyValuePairList', 'MessageData');
    eventstream_rpc_utils.validateValueAsOptionalMap(value.stringToValue, eventstream_rpc_utils.validateValueAsString, validateProduct, 'stringToValue', 'MessageData');
}
exports.validateMessageData = validateMessageData;
const _EchoStreamingMessagePropertyValidators = new Map([
    ["streamMessage", validateMessageData],
    ["keyValuePair", validatePair]
]);
function validateEchoStreamingMessage(value) {
    eventstream_rpc_utils.validateValueAsUnion(value, _EchoStreamingMessagePropertyValidators);
}
exports.validateEchoStreamingMessage = validateEchoStreamingMessage;
function validateServiceError(value) {
    eventstream_rpc_utils.validateValueAsOptionalString(value.message, 'message', 'ServiceError');
    eventstream_rpc_utils.validateValueAsOptionalString(value.value, 'value', 'ServiceError');
}
exports.validateServiceError = validateServiceError;
function validateGetAllCustomersResponse(value) {
    eventstream_rpc_utils.validateValueAsOptionalArray(value.customers, validateCustomer, 'customers', 'GetAllCustomersResponse');
}
exports.validateGetAllCustomersResponse = validateGetAllCustomersResponse;
function validateGetAllCustomersRequest(value) {
}
exports.validateGetAllCustomersRequest = validateGetAllCustomersRequest;
function validateEchoMessageResponse(value) {
    eventstream_rpc_utils.validateValueAsOptionalObject(value.message, validateMessageData, 'message', 'EchoMessageResponse');
}
exports.validateEchoMessageResponse = validateEchoMessageResponse;
function validateEchoMessageRequest(value) {
    eventstream_rpc_utils.validateValueAsOptionalObject(value.message, validateMessageData, 'message', 'EchoMessageRequest');
}
exports.validateEchoMessageRequest = validateEchoMessageRequest;
function validateEchoStreamingResponse(value) {
}
exports.validateEchoStreamingResponse = validateEchoStreamingResponse;
function validateEchoStreamingRequest(value) {
}
exports.validateEchoStreamingRequest = validateEchoStreamingRequest;
function validateCauseServiceErrorResponse(value) {
}
exports.validateCauseServiceErrorResponse = validateCauseServiceErrorResponse;
function validateCauseServiceErrorRequest(value) {
}
exports.validateCauseServiceErrorRequest = validateCauseServiceErrorRequest;
function validateGetAllProductsResponse(value) {
    eventstream_rpc_utils.validateValueAsOptionalMap(value.products, eventstream_rpc_utils.validateValueAsString, validateProduct, 'products', 'GetAllProductsResponse');
}
exports.validateGetAllProductsResponse = validateGetAllProductsResponse;
function validateGetAllProductsRequest(value) {
}
exports.validateGetAllProductsRequest = validateGetAllProductsRequest;
function deserializeProduct(value) {
    return value;
}
exports.deserializeProduct = deserializeProduct;
function deserializePair(value) {
    return value;
}
exports.deserializePair = deserializePair;
function deserializeCustomer(value) {
    return value;
}
exports.deserializeCustomer = deserializeCustomer;
function deserializeMessageData(value) {
    eventstream_rpc_utils.setDefinedProperty(value, 'timeMessage', value.timeMessage, eventstream_rpc_utils.transformNumberAsDate);
    eventstream_rpc_utils.setDefinedProperty(value, 'blobMessage', value.blobMessage, eventstream_rpc_utils.transformStringAsPayload);
    eventstream_rpc_utils.setDefinedArrayProperty(value, 'keyValuePairList', value.keyValuePairList, deserializePair);
    eventstream_rpc_utils.setDefinedObjectPropertyAsMap(value, 'stringToValue', value.stringToValue, undefined, deserializeProduct);
    return value;
}
exports.deserializeMessageData = deserializeMessageData;
function deserializeEchoStreamingMessage(value) {
    eventstream_rpc_utils.setDefinedProperty(value, 'streamMessage', value.streamMessage, deserializeMessageData);
    eventstream_rpc_utils.setDefinedProperty(value, 'keyValuePair', value.keyValuePair, deserializePair);
    return value;
}
exports.deserializeEchoStreamingMessage = deserializeEchoStreamingMessage;
function deserializeServiceError(value) {
    return value;
}
exports.deserializeServiceError = deserializeServiceError;
function deserializeGetAllCustomersResponse(value) {
    eventstream_rpc_utils.setDefinedArrayProperty(value, 'customers', value.customers, deserializeCustomer);
    return value;
}
exports.deserializeGetAllCustomersResponse = deserializeGetAllCustomersResponse;
function deserializeGetAllCustomersRequest(value) {
    return value;
}
exports.deserializeGetAllCustomersRequest = deserializeGetAllCustomersRequest;
function deserializeEchoMessageResponse(value) {
    eventstream_rpc_utils.setDefinedProperty(value, 'message', value.message, deserializeMessageData);
    return value;
}
exports.deserializeEchoMessageResponse = deserializeEchoMessageResponse;
function deserializeEchoMessageRequest(value) {
    eventstream_rpc_utils.setDefinedProperty(value, 'message', value.message, deserializeMessageData);
    return value;
}
exports.deserializeEchoMessageRequest = deserializeEchoMessageRequest;
function deserializeEchoStreamingResponse(value) {
    return value;
}
exports.deserializeEchoStreamingResponse = deserializeEchoStreamingResponse;
function deserializeEchoStreamingRequest(value) {
    return value;
}
exports.deserializeEchoStreamingRequest = deserializeEchoStreamingRequest;
function deserializeCauseServiceErrorResponse(value) {
    return value;
}
exports.deserializeCauseServiceErrorResponse = deserializeCauseServiceErrorResponse;
function deserializeCauseServiceErrorRequest(value) {
    return value;
}
exports.deserializeCauseServiceErrorRequest = deserializeCauseServiceErrorRequest;
function deserializeGetAllProductsResponse(value) {
    eventstream_rpc_utils.setDefinedObjectPropertyAsMap(value, 'products', value.products, undefined, deserializeProduct);
    return value;
}
exports.deserializeGetAllProductsResponse = deserializeGetAllProductsResponse;
function deserializeGetAllProductsRequest(value) {
    return value;
}
exports.deserializeGetAllProductsRequest = deserializeGetAllProductsRequest;
function deserializeEventstreamMessageToGetAllCustomersResponse(message) {
    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
    let response = JSON.parse(payload_text);
    return deserializeGetAllCustomersResponse(response);
}
exports.deserializeEventstreamMessageToGetAllCustomersResponse = deserializeEventstreamMessageToGetAllCustomersResponse;
function deserializeEventstreamMessageToServiceError(message) {
    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
    let response = JSON.parse(payload_text);
    return deserializeServiceError(response);
}
exports.deserializeEventstreamMessageToServiceError = deserializeEventstreamMessageToServiceError;
function deserializeEventstreamMessageToEchoStreamingResponse(message) {
    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
    let response = JSON.parse(payload_text);
    return deserializeEchoStreamingResponse(response);
}
exports.deserializeEventstreamMessageToEchoStreamingResponse = deserializeEventstreamMessageToEchoStreamingResponse;
function deserializeEventstreamMessageToCauseServiceErrorResponse(message) {
    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
    let response = JSON.parse(payload_text);
    return deserializeCauseServiceErrorResponse(response);
}
exports.deserializeEventstreamMessageToCauseServiceErrorResponse = deserializeEventstreamMessageToCauseServiceErrorResponse;
function deserializeEventstreamMessageToEchoMessageResponse(message) {
    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
    let response = JSON.parse(payload_text);
    return deserializeEchoMessageResponse(response);
}
exports.deserializeEventstreamMessageToEchoMessageResponse = deserializeEventstreamMessageToEchoMessageResponse;
function deserializeEventstreamMessageToGetAllProductsResponse(message) {
    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
    let response = JSON.parse(payload_text);
    return deserializeGetAllProductsResponse(response);
}
exports.deserializeEventstreamMessageToGetAllProductsResponse = deserializeEventstreamMessageToGetAllProductsResponse;
function deserializeEventstreamMessageToEchoStreamingMessage(message) {
    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
    let response = JSON.parse(payload_text);
    return deserializeEchoStreamingMessage(response);
}
exports.deserializeEventstreamMessageToEchoStreamingMessage = deserializeEventstreamMessageToEchoStreamingMessage;
function serializeGetAllProductsRequestToEventstreamMessage(request) {
    return {
        type: aws_crt_1.eventstream.MessageType.ApplicationMessage,
        payload: JSON.stringify(normalizeGetAllProductsRequest(request))
    };
}
exports.serializeGetAllProductsRequestToEventstreamMessage = serializeGetAllProductsRequestToEventstreamMessage;
function serializeEchoMessageRequestToEventstreamMessage(request) {
    return {
        type: aws_crt_1.eventstream.MessageType.ApplicationMessage,
        payload: JSON.stringify(normalizeEchoMessageRequest(request))
    };
}
exports.serializeEchoMessageRequestToEventstreamMessage = serializeEchoMessageRequestToEventstreamMessage;
function serializeGetAllCustomersRequestToEventstreamMessage(request) {
    return {
        type: aws_crt_1.eventstream.MessageType.ApplicationMessage,
        payload: JSON.stringify(normalizeGetAllCustomersRequest(request))
    };
}
exports.serializeGetAllCustomersRequestToEventstreamMessage = serializeGetAllCustomersRequestToEventstreamMessage;
function serializeCauseServiceErrorRequestToEventstreamMessage(request) {
    return {
        type: aws_crt_1.eventstream.MessageType.ApplicationMessage,
        payload: JSON.stringify(normalizeCauseServiceErrorRequest(request))
    };
}
exports.serializeCauseServiceErrorRequestToEventstreamMessage = serializeCauseServiceErrorRequestToEventstreamMessage;
function serializeEchoStreamingRequestToEventstreamMessage(request) {
    return {
        type: aws_crt_1.eventstream.MessageType.ApplicationMessage,
        payload: JSON.stringify(normalizeEchoStreamingRequest(request))
    };
}
exports.serializeEchoStreamingRequestToEventstreamMessage = serializeEchoStreamingRequestToEventstreamMessage;
function serializeEchoStreamingMessageToEventstreamMessage(request) {
    return {
        type: aws_crt_1.eventstream.MessageType.ApplicationMessage,
        payload: JSON.stringify(normalizeEchoStreamingMessage(request))
    };
}
exports.serializeEchoStreamingMessageToEventstreamMessage = serializeEchoStreamingMessageToEventstreamMessage;
//# sourceMappingURL=model_utils.js.map