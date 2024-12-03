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
exports.IotIdentityClient = exports.IotIdentityError = exports.model = void 0;
/**
 * @packageDocumentation
 * @module identity
 */
const model = __importStar(require("./model"));
exports.model = model;
const util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
const service_client_mqtt_adapter = __importStar(require("../service_client_mqtt_adapter"));
/**
 * Error subclass for IotIdentity service errors
 *
 * @category IotIdentity
 */
class IotIdentityError extends Error {
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
exports.IotIdentityError = IotIdentityError;
/**
 * An AWS IoT service that assists with provisioning a device and installing unique client certificates on it
 *
 * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html
 *
 * @category IotIdentity
 */
class IotIdentityClient {
    static createClientError(err, payload) {
        if (err instanceof Error) {
            return new IotIdentityError(err.message, payload);
        }
        else {
            return new IotIdentityError(IotIdentityClient.INVALID_PAYLOAD_PARSING_ERROR, payload);
        }
    }
    constructor(connection) {
        if (connection !== undefined) {
            this.mqttAdapter = new service_client_mqtt_adapter.ServiceClientMqtt311Adapter(connection);
        }
    }
    /**
     * Creates a new IotIdentityClient that uses the SDK Mqtt5 client internally.
     *
     * The pre-existing constructor that is bound to the MQTT311 client makes this awkward since we
     * must support
     *
     * ```
     * new IotIdentityClient(mqtt311connection);
     * ```
     *
     * for backwards compatibility, but still want to be able to inject an MQTT5 client as well.
     *
     * @param client the MQTT5 client to use with this service client
     *
     * @returns a new IotIdentityClient instance
     */
    static newFromMqtt5Client(client) {
        let serviceClient = new IotIdentityClient();
        serviceClient.mqttAdapter = new service_client_mqtt_adapter.ServiceClientMqtt5Adapter(client);
        return serviceClient;
    }
    /**
     * Creates a certificate from a certificate signing request (CSR). AWS IoT provides client certificates that are signed by the Amazon Root certificate authority (CA). The new certificate has a PENDING_ACTIVATION status. When you call RegisterThing to provision a thing with this certificate, the certificate status changes to ACTIVE or INACTIVE as described in the template.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
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
     * @category IotIdentity
     */
    publishCreateCertificateFromCsr(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/certificates/create-from-csr/json";
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Creates new keys and a certificate. AWS IoT provides client certificates that are signed by the Amazon Root certificate authority (CA). The new certificate has a PENDING_ACTIVATION status. When you call RegisterThing to provision a thing with this certificate, the certificate status changes to ACTIVE or INACTIVE as described in the template.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
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
     * @category IotIdentity
     */
    publishCreateKeysAndCertificate(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/certificates/create/json";
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Provisions an AWS IoT thing using a pre-defined template.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
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
     * @category IotIdentity
     */
    publishRegisterThing(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/provisioning-templates/{templateName}/provision/json";
            topic = topic.replace("{templateName}", request.templateName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Subscribes to the accepted topic of the CreateCertificateFromCsr operation.
     *
     *
     * subscribeToCreateCertificateFromCsrAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotIdentity
     */
    subscribeToCreateCertificateFromCsrAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/certificates/create-from-csr/json/accepted";
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotIdentityClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic of the CreateCertificateFromCsr operation.
     *
     *
     * subscribeToCreateCertificateFromCsrRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotIdentity
     */
    subscribeToCreateCertificateFromCsrRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/certificates/create-from-csr/json/rejected";
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotIdentityClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic of the CreateKeysAndCertificate operation.
     *
     *
     * subscribeToCreateKeysAndCertificateAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotIdentity
     */
    subscribeToCreateKeysAndCertificateAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/certificates/create/json/accepted";
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotIdentityClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic of the CreateKeysAndCertificate operation.
     *
     *
     * subscribeToCreateKeysAndCertificateRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotIdentity
     */
    subscribeToCreateKeysAndCertificateRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/certificates/create/json/rejected";
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotIdentityClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic of the RegisterThing operation.
     *
     *
     * subscribeToRegisterThingAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotIdentity
     */
    subscribeToRegisterThingAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/provisioning-templates/{templateName}/provision/json/accepted";
            topic = topic.replace("{templateName}", request.templateName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotIdentityClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic of the RegisterThing operation.
     *
     *
     * subscribeToRegisterThingRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotIdentity
     */
    subscribeToRegisterThingRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/provisioning-templates/{templateName}/provision/json/rejected";
            topic = topic.replace("{templateName}", request.templateName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotIdentityClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
}
exports.IotIdentityClient = IotIdentityClient;
IotIdentityClient.INVALID_PAYLOAD_PARSING_ERROR = "Invalid/unknown error parsing payload into response";
//# sourceMappingURL=iotidentityclient.js.map