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
exports.IotJobsClient = exports.IotJobsError = exports.model = void 0;
/**
 * @packageDocumentation
 * @module jobs
 */
const model = __importStar(require("./model"));
exports.model = model;
const util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
const service_client_mqtt_adapter = __importStar(require("../service_client_mqtt_adapter"));
/**
 * Error subclass for IotJobs service errors
 *
 * @category IotJobs
 */
class IotJobsError extends Error {
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
exports.IotJobsError = IotJobsError;
/**
 * The AWS IoT jobs service can be used to define a set of remote operations that are sent to and executed on one or more devices connected to AWS IoT.
 *
 * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#jobs-mqtt-api
 *
 * @category IotJobs
 */
class IotJobsClient {
    static createClientError(err, payload) {
        if (err instanceof Error) {
            return new IotJobsError(err.message, payload);
        }
        else {
            return new IotJobsError(IotJobsClient.INVALID_PAYLOAD_PARSING_ERROR, payload);
        }
    }
    constructor(connection) {
        if (connection !== undefined) {
            this.mqttAdapter = new service_client_mqtt_adapter.ServiceClientMqtt311Adapter(connection);
        }
    }
    /**
     * Creates a new IotJobsClient that uses the SDK Mqtt5 client internally.
     *
     * The pre-existing constructor that is bound to the MQTT311 client makes this awkward since we
     * must support
     *
     * ```
     * new IotJobsClient(mqtt311connection);
     * ```
     *
     * for backwards compatibility, but still want to be able to inject an MQTT5 client as well.
     *
     * @param client the MQTT5 client to use with this service client
     *
     * @returns a new IotJobsClient instance
     */
    static newFromMqtt5Client(client) {
        let serviceClient = new IotJobsClient();
        serviceClient.mqttAdapter = new service_client_mqtt_adapter.ServiceClientMqtt5Adapter(client);
        return serviceClient;
    }
    /**
     * Gets detailed information about a job execution.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-describejobexecution
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
     * @category IotJobs
     */
    publishDescribeJobExecution(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/{jobId}/get";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{jobId}", request.jobId);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Gets the list of all jobs for a thing that are not in a terminal state.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-getpendingjobexecutions
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
     * @category IotJobs
     */
    publishGetPendingJobExecutions(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/get";
            topic = topic.replace("{thingName}", request.thingName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Gets and starts the next pending job execution for a thing (status IN_PROGRESS or QUEUED).
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-startnextpendingjobexecution
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
     * @category IotJobs
     */
    publishStartNextPendingJobExecution(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/start-next";
            topic = topic.replace("{thingName}", request.thingName);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Updates the status of a job execution. You can optionally create a step timer by setting a value for the stepTimeoutInMinutes property. If you don't update the value of this property by running UpdateJobExecution again, the job execution times out when the step timer expires.
     *
     * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-updatejobexecution
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
     * @category IotJobs
     */
    publishUpdateJobExecution(request, qos) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/{jobId}/update";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{jobId}", request.jobId);
            return this.mqttAdapter.publish(topic, JSON.stringify(request), qos);
        });
    }
    /**
     * Subscribes to the accepted topic for the DescribeJobExecution operation
     *
     *
     * subscribeToDescribeJobExecutionAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-describejobexecution
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToDescribeJobExecutionAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/{jobId}/get/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{jobId}", request.jobId);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the DescribeJobExecution operation
     *
     *
     * subscribeToDescribeJobExecutionRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-describejobexecution
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToDescribeJobExecutionRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/{jobId}/get/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{jobId}", request.jobId);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the GetPendingJobsExecutions operation
     *
     *
     * subscribeToGetPendingJobExecutionsAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-getpendingjobexecutions
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToGetPendingJobExecutionsAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/get/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the GetPendingJobsExecutions operation
     *
     *
     * subscribeToGetPendingJobExecutionsRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-getpendingjobexecutions
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToGetPendingJobExecutionsRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/get/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to JobExecutionsChanged notifications for a given IoT thing.
     *
     *
     * subscribeToJobExecutionsChangedEvents may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-jobexecutionschanged
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToJobExecutionsChangedEvents(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/notify";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     *
     *
     *
     * subscribeToNextJobExecutionChangedEvents may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-nextjobexecutionchanged
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToNextJobExecutionChangedEvents(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/notify-next";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the StartNextPendingJobExecution operation
     *
     *
     * subscribeToStartNextPendingJobExecutionAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-startnextpendingjobexecution
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToStartNextPendingJobExecutionAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/start-next/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the StartNextPendingJobExecution operation
     *
     *
     * subscribeToStartNextPendingJobExecutionRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-startnextpendingjobexecution
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToStartNextPendingJobExecutionRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/start-next/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the accepted topic for the UpdateJobExecution operation
     *
     *
     * subscribeToUpdateJobExecutionAccepted may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-updatejobexecution
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToUpdateJobExecutionAccepted(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/{jobId}/update/accepted";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{jobId}", request.jobId);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
    /**
     * Subscribes to the rejected topic for the UpdateJobExecution operation
     *
     *
     * subscribeToUpdateJobExecutionRejected may be called while the device is offline, though the async
     * operation cannot complete successfully until the connection resumes.
     *
     * Once subscribed, `messageHandler` is invoked each time a message matching
     * the `topic` is received. It is possible for such messages to arrive before
     * the SUBACK is received.
     *
     * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-updatejobexecution
     *
     * @param request Subscription request configuration
     * @param qos Maximum requested QoS that server may use when sending messages to the client.
     *            The server may grant a lower QoS in the SUBACK
     * @param messageHandler Callback invoked when message or error is received from the server.
     * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
     *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
     *          from the server or is rejected when an exception occurs.
     *
     * @category IotJobs
     */
    subscribeToUpdateJobExecutionRejected(request, qos, messageHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = "$aws/things/{thingName}/jobs/{jobId}/update/rejected";
            topic = topic.replace("{thingName}", request.thingName);
            topic = topic.replace("{jobId}", request.jobId);
            const on_message = (topic, payload) => {
                let response;
                let error;
                try {
                    const payload_text = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(payload));
                    response = JSON.parse(payload_text);
                }
                catch (err) {
                    error = IotJobsClient.createClientError(err, payload);
                }
                finally {
                    messageHandler(error, response);
                }
            };
            return this.mqttAdapter.subscribe(topic, qos, on_message);
        });
    }
}
exports.IotJobsClient = IotJobsClient;
IotJobsClient.INVALID_PAYLOAD_PARSING_ERROR = "Invalid/unknown error parsing payload into response";
//# sourceMappingURL=iotjobsclient.js.map