"use strict";
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 *
 * This file is generated
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotShadowClient = exports.IotShadowError = exports.model = void 0;
/**
 * @packageDocumentation
 * @module shadow
 */
const model = __importStar(require("./model"));
exports.model = model;
const util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
const service_client_mqtt_adapter = __importStar(require("../service_client_mqtt_adapter"));
/**
 * Error subclass for IotShadow service errors
 *
 * @category IotShadow
 */
class IotShadowError extends Error {
    constructor(message, payload) {
        // 'Error' breaks JS prototype chain when instantiated
        super(message);
        this.payload = payload;
        // restore prototype chain
        const myProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, myProto);
        }
        else {
            this.prototype = myProto;
        }
    }
}
exports.IotShadowError = IotShadowError;
/**
 * The AWS IoT Device Shadow service adds shadows to AWS IoT thing objects. Shadows are a simple data store for device properties and state.  Shadows can make a device’s state available to apps and other services whether the device is connected to AWS IoT or not.
 *
 * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html
 *
 * @category IotShadow
 */
class IotShadowClient {
    static createClientError(err, payload) {
        if (err instanceof Error) {
            return new IotShadowError(err.message, payload);
        }
        else {
            return new IotShadowError(IotShadowClient.INVALID_PAYLOAD_PARSING_ERROR, payload);
        }
    }
    constructor(connection) {
        if (connection !== undefined) {
            this.mqttAdapter = new service_client_mqtt_adapter.ServiceClientMqtt311Adapter(connection);
        }
    }
    /**
     * Creates a new IotShadowClient that uses the SDK Mqtt5 client internally.
     *
     * The pre-existing constructor that is bound to the MQTT311 client makes this awkward since we
     * must support
     *
     * ```
     * new IotShadowClient(mqtt311connection);
     * ```
     *
     * for backwards compatibility, but still want to be able to inject an MQTT5 client as well.
     *
     * @param client the MQTT5 client to use with this service client
     *
     * @returns a new IotShadowClient instance
     */
    static newFromMqtt5Client(client) {
        let serviceClient = new IotShadowClient();
        serviceClient.mqttAdapter = new service_client_mqtt_adapter.ServiceClientMqtt5Adapter(client);
        return serviceClient;
    }
    /**
     * Deletes a named shadow for an AWS IoT thing.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-pub-sub-topic
     *
     * @param request Message to be serialized and sent
     * @param qos Quality of Service for delivering this message
     * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
     *          the PUBLISH packet.
     *
     * * For QoS 0, completes as soon as the packet is sent.
     * * For QoS 1, completes when PUBACK is received.
     * * QoS 2 is not supported by AWS IoT.
     *
     * @category IotShadow
     */
    publishDeleteNamedShadow(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/delete";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Deletes the (classic) shadow for an AWS IoT thing.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-pub-sub-topic
     *
     * @param request Message to be serialized and sent
     * @param qos Quality of Service for delivering this message
     * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
     *          the PUBLISH packet.
     *
     * * For QoS 0, completes as soon as the packet is sent.
     * * For QoS 1, completes when PUBACK is received.
     * * QoS 2 is not supported by AWS IoT.
     *
     * @category IotShadow
     */
    publishDeleteShadow(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/delete";
            topic = topic.replace("{thingName}", request.thingName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Gets a named shadow for an AWS IoT thing.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-pub-sub-topic
     *
     * @param request Message to be serialized and sent
     * @param qos Quality of Service for delivering this message
     * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
     *          the PUBLISH packet.
     *
     * * For QoS 0, completes as soon as the packet is sent.
     * * For QoS 1, completes when PUBACK is received.
     * * QoS 2 is not supported by AWS IoT.
     *
     * @category IotShadow
     */
    publishGetNamedShadow(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/get";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Gets the (classic) shadow for an AWS IoT thing.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-pub-sub-topic
     *
     * @param request Message to be serialized and sent
     * @param qos Quality of Service for delivering this message
     * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
     *          the PUBLISH packet.
     *
     * * For QoS 0, completes as soon as the packet is sent.
     * * For QoS 1, completes when PUBACK is received.
     * * QoS 2 is not supported by AWS IoT.
     *
     * @category IotShadow
     */
    publishGetShadow(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/get";
            topic = topic.replace("{thingName}", request.thingName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Update a named shadow for a device.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-pub-sub-topic
     *
     * @param request Message to be serialized and sent
     * @param qos Quality of Service for delivering this message
     * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
     *          the PUBLISH packet.
     *
     * * For QoS 0, completes as soon as the packet is sent.
     * * For QoS 1, completes when PUBACK is received.
     * * QoS 2 is not supported by AWS IoT.
     *
     * @category IotShadow
     */
    publishUpdateNamedShadow(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/update";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Update a device's (classic) shadow.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-pub-sub-topic
     *
     * @param request Message to be serialized and sent
     * @param qos Quality of Service for delivering this message
     * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
     *          the PUBLISH packet.
     *
     * * For QoS 0, completes as soon as the packet is sent.
     * * For QoS 1, completes when PUBACK is received.
     * * QoS 2 is not supported by AWS IoT.
     *
     * @category IotShadow
     */
    publishUpdateShadow(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/update";
            topic = topic.replace("{thingName}", request.thingName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Subscribes to the accepted topic for the DeleteNamedShadow operation.
     *
     *
     * subscribeToDeleteNamedShadowAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-accepted-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToDeleteNamedShadowAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/delete/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the DeleteNamedShadow operation.
     *
     *
     * subscribeToDeleteNamedShadowRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-rejected-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToDeleteNamedShadowRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/delete/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the DeleteShadow operation
     *
     *
     * subscribeToDeleteShadowAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-accepted-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToDeleteShadowAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/delete/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the DeleteShadow operation
     *
     *
     * subscribeToDeleteShadowRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-rejected-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToDeleteShadowRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/delete/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the GetNamedShadow operation.
     *
     *
     * subscribeToGetNamedShadowAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-accepted-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToGetNamedShadowAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/get/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the GetNamedShadow operation.
     *
     *
     * subscribeToGetNamedShadowRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-rejected-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToGetNamedShadowRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/get/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the GetShadow operation.
     *
     *
     * subscribeToGetShadowAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-accepted-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToGetShadowAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/get/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the GetShadow operation.
     *
     *
     * subscribeToGetShadowRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-rejected-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToGetShadowRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/get/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribe to NamedShadowDelta events for a named shadow of an AWS IoT thing.
     *
     *
     * subscribeToNamedShadowDeltaUpdatedEvents may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-delta-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToNamedShadowDeltaUpdatedEvents(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/update/delta";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribe to ShadowUpdated events for a named shadow of an AWS IoT thing.
     *
     *
     * subscribeToNamedShadowUpdatedEvents may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-documents-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToNamedShadowUpdatedEvents(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/update/documents";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribe to ShadowDelta events for the (classic) shadow of an AWS IoT thing.
     *
     *
     * subscribeToShadowDeltaUpdatedEvents may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-delta-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToShadowDeltaUpdatedEvents(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/update/delta";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribe to ShadowUpdated events for the (classic) shadow of an AWS IoT thing.
     *
     *
     * subscribeToShadowUpdatedEvents may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-documents-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToShadowUpdatedEvents(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/update/documents";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the UpdateNamedShadow operation
     *
     *
     * subscribeToUpdateNamedShadowAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-accepted-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToUpdateNamedShadowAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/update/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the UpdateNamedShadow operation
     *
     *
     * subscribeToUpdateNamedShadowRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-rejected-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToUpdateNamedShadowRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/name/{shadowName}/update/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{shadowName}", request.shadowName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the UpdateShadow operation
     *
     *
     * subscribeToUpdateShadowAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-accepted-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToUpdateShadowAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/update/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the UpdateShadow operation
     *
     *
     * subscribeToUpdateShadowRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-rejected-pub-sub-topic
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotShadow
     */
    subscribeToUpdateShadowRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/shadow/update/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotShadowClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
}
exports.IotShadowClient = IotShadowClient;
IotShadowClient.INVALID_PAYLOAD_PARSING_ERROR = "Invalid/unknown error parsing payload into response";
//# sourceMappingURL=iotshadowclient.js.map