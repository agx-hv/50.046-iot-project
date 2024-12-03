"use strict";
/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0.
 */
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
exports.ServiceClientMqtt5Adapter = exports.ServiceClientMqtt311Adapter = void 0;
const aws_crt_1 = require("aws-crt");
/**
 * Simple adapter for low-level MQTT service clients to use the MQTT311 client.  Since the interface is just the
 * MQTT311 client's interface, all we need to do is forward.
 *
 * @internal
 */
class ServiceClientMqtt311Adapter {
    constructor(connection) {
        this.connection = connection;
    }
    publish(topic, payload, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.publish(topic, payload, qos);
        });
    }
    subscribe(topic, qos, on_message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.subscribe(topic, qos, on_message);
        });
    }
}
exports.ServiceClientMqtt311Adapter = ServiceClientMqtt311Adapter;
/**
 * Adapter for low-level MQTT service clients to use the MQTT5 client.
 *
 * In addition to converting between the API contracts, adaptation requires constrained simulation of certain
 * features of the MQTT311 client (per subscription callbacks).  Full emulation of the topic tried is not needed
 * because all subscriptions are done with individual, non-wildcarded topics.
 *
 * @internal
 */
class ServiceClientMqtt5Adapter {
    onMessageReceivedHandler(eventData) {
        var _a;
        let publish = eventData.message;
        let topic = publish.topicName;
        let handler = this.subscriptionHandlers.get(topic);
        if (handler) {
            /* The payload field of a PublishPacket is always an ArrayBuffer */
            handler(topic, publish.payload, false, publish.qos, (_a = publish.retain) !== null && _a !== void 0 ? _a : false);
        }
    }
    constructor(client) {
        this.client = client;
        this.subscriptionHandlers = new Map();
        client.on('messageReceived', this.onMessageReceivedHandler.bind(this));
    }
    publish(topic, payload, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let result = yield this.client.publish({
                        topicName: topic,
                        payload: payload,
                        qos: qos
                    });
                    if (result === undefined) {
                        if (qos == aws_crt_1.mqtt.QoS.AtMostOnce) {
                            resolve({});
                        }
                        else {
                            reject("Publish failed due to internal error");
                        }
                        return;
                    }
                    let puback = result;
                    if (aws_crt_1.mqtt5.isSuccessfulPubackReasonCode(puback.reasonCode)) {
                        resolve({});
                    }
                    else {
                        reject(new aws_crt_1.CrtError("Publish failed with reason code: " + puback.reasonCode));
                    }
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    subscribe(topic, qos, on_message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.subscriptionHandlers.set(topic, on_message);
                    let result = yield this.client.subscribe({
                        subscriptions: [{ topicFilter: topic, qos: qos }]
                    });
                    let reasonCode = result.reasonCodes[0];
                    if (aws_crt_1.mqtt5.isSuccessfulSubackReasonCode(reasonCode)) {
                        resolve({
                            topic: topic,
                            qos: reasonCode
                        });
                    }
                    else {
                        throw new aws_crt_1.CrtError("Subscribe failed with reason code: " + reasonCode);
                    }
                }
                catch (e) {
                    this.subscriptionHandlers.delete(topic);
                    reject(e);
                }
            }));
        });
    }
}
exports.ServiceClientMqtt5Adapter = ServiceClientMqtt5Adapter;
//# sourceMappingURL=service_client_mqtt_adapter.js.map