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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventstream_rpc = __importStar(require("./eventstream_rpc"));
const echo_rpc = __importStar(require("./echotestrpc"));
const assert_1 = __importDefault(require("assert"));
const model_utils = __importStar(require("./echotestrpc/model_utils"));
const events_1 = require("events");
jest.setTimeout(10000);
function hasEchoServerEnvironment() {
    if (process.env.AWS_TEST_EVENT_STREAM_ECHO_SERVER_HOST === undefined) {
        return false;
    }
    if (process.env.AWS_TEST_EVENT_STREAM_ECHO_SERVER_PORT === undefined) {
        return false;
    }
    return true;
}
const conditional_test = (condition) => condition ? it : it.skip;
function makeGoodConfig() {
    var _a, _b;
    let config = {
        hostName: (_a = process.env.AWS_TEST_EVENT_STREAM_ECHO_SERVER_HOST) !== null && _a !== void 0 ? _a : "",
        port: parseInt((_b = process.env.AWS_TEST_EVENT_STREAM_ECHO_SERVER_PORT) !== null && _b !== void 0 ? _b : "0"),
    };
    return config;
}
function doEchoRequestResponseSuccessTest(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let client = echo_rpc.createClient(makeGoodConfig());
                let disconnected = (0, events_1.once)(client, echo_rpc.Client.DISCONNECTION);
                yield client.connect();
                let response = yield client.echoMessage(request);
                expect(response).toBeDefined();
                assert_1.default.deepStrictEqual(request, response, "Mismatch between echo request and echo response");
                client.close();
                yield (disconnected);
                resolve();
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - string message', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            stringMessage: "Test!"
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - boolean message', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            booleanMessage: true
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - time message', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            timeMessage: new Date()
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - document message', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            documentMessage: {
                key1: ["value1", 5.0],
                key2: {
                    subKey: {
                        subSubKey: true
                    }
                }
            }
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - enum message', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            enumMessage: echo_rpc.model.FruitEnum.APPLE
        }
    });
}));
function doEchoRequestResponseSuccessTestBlob(request, blobAsBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let client = echo_rpc.createClient(makeGoodConfig());
                yield client.connect();
                let response = yield client.echoMessage(request);
                expect(response).toBeDefined();
                let responseBuffer = Buffer.from((_a = response.message) === null || _a === void 0 ? void 0 : _a.blobMessage);
                expect(responseBuffer).toEqual(blobAsBuffer);
                client.close();
                resolve();
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - blob message as string', () => __awaiter(void 0, void 0, void 0, function* () {
    let stringPayload = "Not Binary";
    let payloadBuffer = Buffer.from(stringPayload, "utf-8");
    yield doEchoRequestResponseSuccessTestBlob({
        message: {
            blobMessage: stringPayload
        }
    }, payloadBuffer);
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - blob message as buffer', () => __awaiter(void 0, void 0, void 0, function* () {
    let payloadBuffer = Buffer.from("This is binary", "utf-8");
    yield doEchoRequestResponseSuccessTestBlob({
        message: {
            blobMessage: payloadBuffer
        }
    }, payloadBuffer);
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - string list message empty', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            stringListMessage: []
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - string list message non-empty', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            stringListMessage: ["PUBACK", "Hello", "World"]
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - key-value list message empty', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            keyValuePairList: []
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - key-value list message non-empty', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            keyValuePairList: [{ key: "Key1", value: "Value1" }, { key: "Key2", value: "Value2" }]
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - string-to-value map message empty', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            stringToValue: new Map()
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response echo success test - string-to-value map message non-empty', () => __awaiter(void 0, void 0, void 0, function* () {
    yield doEchoRequestResponseSuccessTest({
        message: {
            stringToValue: new Map([['firstWidget', { name: 'Widget', price: 3 }], ['secondWidget', { name: 'PS10', price: 500000 }]])
        }
    });
}));
conditional_test(hasEchoServerEnvironment())('Request-response getAllProducts success test', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    let response = yield client.getAllProducts({});
    expect(response).toBeDefined();
    client.close();
}));
conditional_test(hasEchoServerEnvironment())('Request-response getAllCustomers success test', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    let response = yield client.getAllCustomers({});
    expect(response).toBeDefined();
    client.close();
}));
function doValidationFailureCheck(shape, shapeName) {
    let model = model_utils.makeServiceModel();
    let validator = model.validators.get(shapeName);
    expect(validator).toBeDefined();
    // @ts-ignore
    expect(() => { validator(shape); }).toThrow();
}
test('Echo RPC Pair Validation Failure - missing required property', () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    let badPair = {
        key: "NoValue"
    };
    doValidationFailureCheck(badPair, "awstest#Pair");
}));
test('Echo RPC Pair Validation Failure - invalid string property', () => __awaiter(void 0, void 0, void 0, function* () {
    let badPair = {
        key: "MyKey",
        // @ts-ignore
        value: 5
    };
    doValidationFailureCheck(badPair, "awstest#Pair");
}));
function doNormalizationCheck(messyValue, expectedNormalizedValue, shapeName) {
    let model = model_utils.makeServiceModel();
    let normalizer = model.normalizers.get(shapeName);
    // @ts-ignore
    assert_1.default.deepStrictEqual(normalizer(messyValue), expectedNormalizedValue, "Normalized value not equivalent");
}
test('Echo RPC Pair Normalization - prune unmodeled properties', () => __awaiter(void 0, void 0, void 0, function* () {
    let moreThanAPair = {
        key: "MyKey",
        value: "MyValue",
        // @ts-ignore
        derp: ["StripMe"],
        weird: {
            value: 5
        }
    };
    let expectedNormalizationResult = {
        key: "MyKey",
        value: "MyValue"
    };
    doNormalizationCheck(moreThanAPair, expectedNormalizationResult, "awstest#Pair");
}));
test('Echo RPC Product Validation Failure - invalid number property', () => __awaiter(void 0, void 0, void 0, function* () {
    let badProduct = {
        name: "Ronco Yogurt Slicer",
        // @ts-ignore
        price: "3.50"
    };
    doValidationFailureCheck(badProduct, "awstest#Product");
}));
test('Echo RPC Product Normalization - prune unmodeled properties', () => __awaiter(void 0, void 0, void 0, function* () {
    let moreThanAProduct = {
        name: "Acme Back Scratcher",
        price: 10,
        // @ts-ignore
        derp: ["StripMe"],
        weird: {
            value: 5
        }
    };
    let expectedNormalizationResult = {
        name: "Acme Back Scratcher",
        price: 10
    };
    doNormalizationCheck(moreThanAProduct, expectedNormalizationResult, "awstest#Product");
}));
test('Echo RPC MessageData Validation Failure - invalid boolean property', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        booleanMessage: "I'm not a boolean"
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - invalid timestamp property', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        timeMessage: "I'm not a Date"
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - invalid blob property', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        blobMessage: 5
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - invalid string list property, not an array', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        stringListMessage: 5
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - invalid string list property, element not a string', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        stringListMessage: ["Hello", 4]
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - invalid Pair list property, element an invalid Pair', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        keyValuePairList: [
            { key: "AKey", value: "AValue" },
            //@ts-ignore
            { key: "Wrong", value: [] }
        ]
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - invalid Map, key validation failure', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        stringToValue: new Map([
            ["Hello", {}],
            [5, { name: "Apple Peeler" }]
        ])
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - invalid Map, value validation failure', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        stringToValue: new Map([
            ["Hello", {}],
            ["There", { name: 6 }]
        ])
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
test('Echo RPC MessageData Validation Failure - enum property not a string', () => __awaiter(void 0, void 0, void 0, function* () {
    let badMessageData = {
        // @ts-ignore
        enumMessage: 5
    };
    doValidationFailureCheck(badMessageData, "awstest#MessageData");
}));
conditional_test(hasEchoServerEnvironment())('echoMessage failure test - client side validation', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    let badRequest = {
        message: {
            // @ts-ignore
            stringMessage: [5]
        }
    };
    yield expect(client.echoMessage(badRequest)).rejects.toBeDefined();
    client.close();
}));
conditional_test(hasEchoServerEnvironment())('echoMessage failure test - server side internal service error', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    let badRequest = {
        message: {
            // @ts-ignore
            stringMessage: [5]
        }
    };
    // jest doesn't expose a reliable API for arbitrarily digging into errors via promises
    // (https://github.com/facebook/jest/issues/8140).
    let error = undefined;
    try {
        yield client.echoMessage(badRequest, { disableValidation: true });
    }
    catch (err) {
        error = err;
    }
    expect(error).toBeDefined();
    expect(error === null || error === void 0 ? void 0 : error.description).toMatch("InternalServerError");
    client.close();
}));
conditional_test(hasEchoServerEnvironment())('causeServiceError (failure) test with modeled service error', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    // jest doesn't expose a reliable API for arbitrarily digging into errors via promises
    // (https://github.com/facebook/jest/issues/8140).
    let error = undefined;
    try {
        yield client.causeServiceError({});
    }
    catch (err) {
        error = err;
    }
    expect(error).toBeDefined();
    expect(error === null || error === void 0 ? void 0 : error.serviceError).toBeDefined();
    let serviceError = error === null || error === void 0 ? void 0 : error.serviceError;
    expect(serviceError.message).toMatch("Intentionally thrown");
    client.close();
}));
test('Eventstream validate union type success - message data', () => {
    let streamMessage = {
        streamMessage: {
            stringMessage: "a string",
            booleanMessage: true,
            timeMessage: new Date(),
            documentMessage: { key: "Akey", value: "Avalue" },
            enumMessage: echo_rpc.model.FruitEnum.ORANGE,
            blobMessage: "not binary",
            stringListMessage: ["Hello", "world"],
            keyValuePairList: [{ key: "Akey", value: "Avalue" }],
            stringToValue: new Map([["Acme", { name: "Toilet Plunger" }]])
        }
    };
    model_utils.validateEchoStreamingMessage(streamMessage);
});
test('Eventstream validate union type success - key value pair', () => {
    let streamMessage = {
        keyValuePair: {
            key: "What",
            value: "is love"
        }
    };
    model_utils.validateEchoStreamingMessage(streamMessage);
});
test('Eventstream validate union type failure - nothing set', () => {
    expect(() => { model_utils.validateEchoStreamingMessage({}); }).toThrow();
});
test('Eventstream validate union type failure - multiple set', () => {
    let streamingMessage = {
        streamMessage: {},
        keyValuePair: {
            key: "What",
            value: "is love"
        }
    };
    expect(() => { model_utils.validateEchoStreamingMessage(streamingMessage); }).toThrow();
});
test('Eventstream validate union type failure - nested object failure', () => {
    let streamingMessage = {
        streamMessage: {
            // @ts-ignore
            stringListMessage: [5, "world"]
        }
    };
    expect(() => { model_utils.validateEchoStreamingMessage(streamingMessage); }).toThrow();
});
test('Eventstream normalize EchoStreamingMessage', () => {
    let streamingMessage = {
        streamMessage: {
            stringListMessage: ["hello", "world"],
            // @ts-ignore
            alsoNotAValidProperty: 6,
        },
        keyValuePair: {
            key: "key",
            value: "value",
            // @ts-ignore
            shouldntBeHere: []
        },
        // @ts-ignore
        notAProperty: "Oof"
    };
    let expectedNormalizedValue = {
        streamMessage: {
            stringListMessage: ["hello", "world"]
        },
        keyValuePair: {
            key: "key",
            value: "value"
        }
    };
    expect(model_utils.normalizeEchoStreamingMessage(streamingMessage)).toEqual(expectedNormalizedValue);
});
function doStreamingEchoSuccessTest(streamingMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let client = echo_rpc.createClient(makeGoodConfig());
            yield client.connect();
            let streamingOperation = client.echoStreamMessages({});
            let streamingResponsePromise = (0, events_1.once)(streamingOperation, eventstream_rpc.StreamingOperation.MESSAGE);
            yield streamingOperation.activate();
            yield streamingOperation.sendMessage(streamingMessage);
            let response = (yield streamingResponsePromise)[0];
            expect(response).toEqual(streamingMessage);
            yield streamingOperation.close();
            client.close();
            resolve();
        }));
    });
}
conditional_test(hasEchoServerEnvironment())('echoStreamingMessage Success - send and receive a streamMessage', () => __awaiter(void 0, void 0, void 0, function* () {
    let streamingMessage = {
        streamMessage: {
            stringMessage: "a string",
            booleanMessage: true,
            timeMessage: new Date(),
            documentMessage: { key: "Akey", value: "Avalue" },
            enumMessage: echo_rpc.model.FruitEnum.ORANGE,
            stringListMessage: ["Hello", "world"],
            keyValuePairList: [{ key: "Akey", value: "Avalue" }],
            stringToValue: new Map([["Acme", { name: "Toilet Plunger", price: 3 }]])
        }
    };
    yield doStreamingEchoSuccessTest(streamingMessage);
}));
conditional_test(hasEchoServerEnvironment())('echoStreamingMessage Success - send and receive a keyValuePair', () => __awaiter(void 0, void 0, void 0, function* () {
    let streamingMessage = {
        keyValuePair: {
            key: "AKey",
            value: "AValue"
        }
    };
    yield doStreamingEchoSuccessTest(streamingMessage);
}));
conditional_test(hasEchoServerEnvironment())('echoStreamingMessage Failure - invalid activation request', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    //@ts-ignore
    expect(() => { client.echoStreamMessages(undefined); }).toThrow();
    client.close();
}));
conditional_test(hasEchoServerEnvironment())('echoStreamingMessage validation Failure - invalid sendMessage request', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    let streamingOperation = client.echoStreamMessages({});
    yield streamingOperation.activate();
    let streamingMessage = {
        keyValuePair: {
            key: "AKey",
            // @ts-ignore
            value: [5]
        }
    };
    yield expect(streamingOperation.sendMessage(streamingMessage)).rejects.toBeDefined();
    yield streamingOperation.close();
    client.close();
}));
conditional_test(hasEchoServerEnvironment())('echoStreamingMessage failure - internal server error due to bad sendMessage request', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    let streamingOperation = client.echoStreamMessages({}, { disableValidation: true });
    yield streamingOperation.activate();
    let streamingError = (0, events_1.once)(streamingOperation, eventstream_rpc.StreamingOperation.STREAM_ERROR);
    let streamEnded = (0, events_1.once)(streamingOperation, eventstream_rpc.StreamingOperation.ENDED);
    let streamingMessage = {
        keyValuePair: {
            key: "AKey",
            // @ts-ignore
            value: [5]
        }
    };
    yield streamingOperation.sendMessage(streamingMessage);
    let error = (yield streamingError)[0];
    expect(error).toBeDefined();
    expect(error === null || error === void 0 ? void 0 : error.description).toMatch("InternalServerError");
    yield streamEnded;
    yield streamingOperation.close();
    client.close();
}));
conditional_test(hasEchoServerEnvironment())('causeStreamServiceToError failure - modeled error', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = echo_rpc.createClient(makeGoodConfig());
    yield client.connect();
    let streamingOperation = client.causeStreamServiceToError({});
    yield streamingOperation.activate();
    let streamingError = (0, events_1.once)(streamingOperation, eventstream_rpc.StreamingOperation.STREAM_ERROR);
    let streamEnded = (0, events_1.once)(streamingOperation, eventstream_rpc.StreamingOperation.ENDED);
    let streamingMessage = {
        keyValuePair: {
            key: "AKey",
            value: "Derp"
        }
    };
    yield streamingOperation.sendMessage(streamingMessage);
    let error = (yield streamingError)[0];
    expect(error).toBeDefined();
    let rpcError = error;
    expect(rpcError.serviceError).toBeDefined();
    expect(rpcError.serviceError.message).toMatch("Intentionally caused ServiceError on stream");
    yield streamEnded;
    yield streamingOperation.close();
    client.close();
}));
//# sourceMappingURL=echotestrpc.spec.js.map