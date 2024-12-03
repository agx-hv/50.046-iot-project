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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.model = void 0;
/* This file is generated */
/**
 * @packageDocumentation
 * @module greengrasscoreipc
 */
const model = __importStar(require("./model"));
exports.model = model;
const model_utils = __importStar(require("./model_utils"));
const eventstream_rpc = __importStar(require("../eventstream_rpc"));
const events_1 = require("events");
/**
 * A network client for interacting with the GreengrassCoreIPC service using the eventstream RPC protocol.
 *
 * Provides communication between Greengrass core and customer component
 */
class Client extends events_1.EventEmitter {
    /**
     * Constructor for a GreengrassCoreIPC service client.
     *
     * @param config client configuration settings
     */
    constructor(config) {
        super();
        this.serviceModel = model_utils.makeServiceModel();
        this.rpcClient = eventstream_rpc.RpcClient.new(config);
        this.rpcClient.on('disconnection', (eventData) => {
            setImmediate(() => {
                this.emit(Client.DISCONNECTION, eventData);
            });
        });
    }
    /**
     * Attempts to open an eventstream connection to the configured remote endpoint.  Returned promise will be fulfilled
     * if the transport-level connection is successfully established and the eventstream handshake completes without
     * error.
     *
     * connect() may only be called once.
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rpcClient.connect();
        });
    }
    /**
     * Shuts down the client and begins the process of releasing all native resources associated with the client
     * as well as any unclosed operations.  It is critical that this function be called when finished with the client;
     * otherwise, native resources will leak.
     *
     * The client tracks unclosed operations and, as part of this process, closes them as well.
     *
     * Once a client has been closed, it may no longer be used.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rpcClient.close();
        });
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    /************************ Service Operations ************************/
    /**
     * Performs a AuthorizeClientDeviceAction operation.
     *
     * Send a request to authorize action on some resource
     *
     * @param request data describing the AuthorizeClientDeviceAction operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the AuthorizeClientDeviceAction operation's result, or rejected with an
     *    RpcError
     */
    authorizeClientDeviceAction(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#AuthorizeClientDeviceAction",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a CancelLocalDeployment operation.
     *
     * Cancel a local deployment on the device.
     *
     * @param request data describing the CancelLocalDeployment operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the CancelLocalDeployment operation's result, or rejected with an
     *    RpcError
     */
    cancelLocalDeployment(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#CancelLocalDeployment",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a CreateDebugPassword operation.
     *
     * Generate a password for the LocalDebugConsole component
     *
     * @param request data describing the CreateDebugPassword operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the CreateDebugPassword operation's result, or rejected with an
     *    RpcError
     */
    createDebugPassword(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#CreateDebugPassword",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a CreateLocalDeployment operation.
     *
     * Creates a local deployment on the device.  Also allows to remove existing components.
     *
     * @param request data describing the CreateLocalDeployment operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the CreateLocalDeployment operation's result, or rejected with an
     *    RpcError
     */
    createLocalDeployment(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#CreateLocalDeployment",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a DeferComponentUpdate operation.
     *
     * Defer the update of components by a given amount of time and check again after that.
     *
     * @param request data describing the DeferComponentUpdate operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the DeferComponentUpdate operation's result, or rejected with an
     *    RpcError
     */
    deferComponentUpdate(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#DeferComponentUpdate",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a DeleteThingShadow operation.
     *
     * Deletes a device shadow document stored in the local shadow service
     *
     * @param request data describing the DeleteThingShadow operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the DeleteThingShadow operation's result, or rejected with an
     *    RpcError
     */
    deleteThingShadow(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#DeleteThingShadow",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a GetClientDeviceAuthToken operation.
     *
     * Get session token for a client device
     *
     * @param request data describing the GetClientDeviceAuthToken operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetClientDeviceAuthToken operation's result, or rejected with an
     *    RpcError
     */
    getClientDeviceAuthToken(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#GetClientDeviceAuthToken",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a GetComponentDetails operation.
     *
     * Gets the status and version of the component with the given component name
     *
     * @param request data describing the GetComponentDetails operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetComponentDetails operation's result, or rejected with an
     *    RpcError
     */
    getComponentDetails(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#GetComponentDetails",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a GetConfiguration operation.
     *
     * Get value of a given key from the configuration
     *
     * @param request data describing the GetConfiguration operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetConfiguration operation's result, or rejected with an
     *    RpcError
     */
    getConfiguration(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#GetConfiguration",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a GetLocalDeploymentStatus operation.
     *
     * Get status of a local deployment with the given deploymentId
     *
     * @param request data describing the GetLocalDeploymentStatus operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetLocalDeploymentStatus operation's result, or rejected with an
     *    RpcError
     */
    getLocalDeploymentStatus(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#GetLocalDeploymentStatus",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a GetSecretValue operation.
     *
     * Retrieves a secret stored in AWS secrets manager
     *
     * @param request data describing the GetSecretValue operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetSecretValue operation's result, or rejected with an
     *    RpcError
     */
    getSecretValue(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#GetSecretValue",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a GetThingShadow operation.
     *
     * Retrieves a device shadow document stored by the local shadow service
     *
     * @param request data describing the GetThingShadow operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetThingShadow operation's result, or rejected with an
     *    RpcError
     */
    getThingShadow(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#GetThingShadow",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a ListComponents operation.
     *
     * Request for a list of components
     *
     * @param request data describing the ListComponents operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the ListComponents operation's result, or rejected with an
     *    RpcError
     */
    listComponents(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#ListComponents",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a ListLocalDeployments operation.
     *
     * Lists the last 5 local deployments along with their statuses
     *
     * @param request data describing the ListLocalDeployments operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the ListLocalDeployments operation's result, or rejected with an
     *    RpcError
     */
    listLocalDeployments(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#ListLocalDeployments",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a ListNamedShadowsForThing operation.
     *
     * Lists the named shadows for the specified thing
     *
     * @param request data describing the ListNamedShadowsForThing operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the ListNamedShadowsForThing operation's result, or rejected with an
     *    RpcError
     */
    listNamedShadowsForThing(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#ListNamedShadowsForThing",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a PauseComponent operation.
     *
     * Pause a running component
     *
     * @param request data describing the PauseComponent operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the PauseComponent operation's result, or rejected with an
     *    RpcError
     */
    pauseComponent(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#PauseComponent",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a PublishToIoTCore operation.
     *
     * Publish an MQTT message to AWS IoT message broker
     *
     * @param request data describing the PublishToIoTCore operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the PublishToIoTCore operation's result, or rejected with an
     *    RpcError
     */
    publishToIoTCore(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#PublishToIoTCore",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a PublishToTopic operation.
     *
     * Publish to a custom topic.
     *
     * @param request data describing the PublishToTopic operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the PublishToTopic operation's result, or rejected with an
     *    RpcError
     */
    publishToTopic(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#PublishToTopic",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a PutComponentMetric operation.
     *
     * Send component metrics
     * NOTE Only usable by AWS components
     *
     * @param request data describing the PutComponentMetric operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the PutComponentMetric operation's result, or rejected with an
     *    RpcError
     */
    putComponentMetric(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#PutComponentMetric",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a RestartComponent operation.
     *
     * Restarts a component with the given name
     *
     * @param request data describing the RestartComponent operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the RestartComponent operation's result, or rejected with an
     *    RpcError
     */
    restartComponent(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#RestartComponent",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a ResumeComponent operation.
     *
     * Resume a paused component
     *
     * @param request data describing the ResumeComponent operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the ResumeComponent operation's result, or rejected with an
     *    RpcError
     */
    resumeComponent(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#ResumeComponent",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a SendConfigurationValidityReport operation.
     *
     * This operation should be used in response to event received as part of SubscribeToValidateConfigurationUpdates
     * subscription. It is not necessary to send the report if the configuration is valid (GGC will wait for timeout
     * period and proceed). Sending the report with invalid config status will prevent GGC from applying the updates
     *
     * @param request data describing the SendConfigurationValidityReport operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the SendConfigurationValidityReport operation's result, or rejected with an
     *    RpcError
     */
    sendConfigurationValidityReport(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#SendConfigurationValidityReport",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a StopComponent operation.
     *
     * Stops a component with the given name
     *
     * @param request data describing the StopComponent operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the StopComponent operation's result, or rejected with an
     *    RpcError
     */
    stopComponent(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#StopComponent",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Creates a SubscribeToCertificateUpdates streaming operation.
     *
     * Create a subscription for new certificates
     *
     * Once created, the streaming operation must be started by a call to activate().
     *
     * If the operation allows for streaming input, the user may attach event listeners to receive messages.
     *
     * If the operation allows for streaming output, the user may call sendProtocolMessage() to send messages on
     * the operation's event stream once the operation has been activated.
     *
     * The user should close() a streaming operation once finished with it.  If close() is not called, the native
     * resources associated with the streaming operation will not be freed until the client is closed.
     *
     * @param request data describing the SubscribeToCertificateUpdates streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    subscribeToCertificateUpdates(request, options) {
        let operationConfig = {
            name: "aws.greengrass#SubscribeToCertificateUpdates",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Creates a SubscribeToComponentUpdates streaming operation.
     *
     * Subscribe to receive notification if GGC is about to update any components
     *
     * Once created, the streaming operation must be started by a call to activate().
     *
     * If the operation allows for streaming input, the user may attach event listeners to receive messages.
     *
     * If the operation allows for streaming output, the user may call sendProtocolMessage() to send messages on
     * the operation's event stream once the operation has been activated.
     *
     * The user should close() a streaming operation once finished with it.  If close() is not called, the native
     * resources associated with the streaming operation will not be freed until the client is closed.
     *
     * @param request data describing the SubscribeToComponentUpdates streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    subscribeToComponentUpdates(request, options) {
        let operationConfig = {
            name: "aws.greengrass#SubscribeToComponentUpdates",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Creates a SubscribeToConfigurationUpdate streaming operation.
     *
     * Subscribes to be notified when GGC updates the configuration for a given componentName and keyName.
     *
     * Once created, the streaming operation must be started by a call to activate().
     *
     * If the operation allows for streaming input, the user may attach event listeners to receive messages.
     *
     * If the operation allows for streaming output, the user may call sendProtocolMessage() to send messages on
     * the operation's event stream once the operation has been activated.
     *
     * The user should close() a streaming operation once finished with it.  If close() is not called, the native
     * resources associated with the streaming operation will not be freed until the client is closed.
     *
     * @param request data describing the SubscribeToConfigurationUpdate streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    subscribeToConfigurationUpdate(request, options) {
        let operationConfig = {
            name: "aws.greengrass#SubscribeToConfigurationUpdate",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Creates a SubscribeToIoTCore streaming operation.
     *
     * Subscribe to a topic in AWS IoT message broker.
     *
     * Once created, the streaming operation must be started by a call to activate().
     *
     * If the operation allows for streaming input, the user may attach event listeners to receive messages.
     *
     * If the operation allows for streaming output, the user may call sendProtocolMessage() to send messages on
     * the operation's event stream once the operation has been activated.
     *
     * The user should close() a streaming operation once finished with it.  If close() is not called, the native
     * resources associated with the streaming operation will not be freed until the client is closed.
     *
     * @param request data describing the SubscribeToIoTCore streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    subscribeToIoTCore(request, options) {
        let operationConfig = {
            name: "aws.greengrass#SubscribeToIoTCore",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Creates a SubscribeToTopic streaming operation.
     *
     * Creates a subscription for a custom topic
     *
     * Once created, the streaming operation must be started by a call to activate().
     *
     * If the operation allows for streaming input, the user may attach event listeners to receive messages.
     *
     * If the operation allows for streaming output, the user may call sendProtocolMessage() to send messages on
     * the operation's event stream once the operation has been activated.
     *
     * The user should close() a streaming operation once finished with it.  If close() is not called, the native
     * resources associated with the streaming operation will not be freed until the client is closed.
     *
     * @param request data describing the SubscribeToTopic streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    subscribeToTopic(request, options) {
        let operationConfig = {
            name: "aws.greengrass#SubscribeToTopic",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Creates a SubscribeToValidateConfigurationUpdates streaming operation.
     *
     * Subscribes to be notified when GGC is about to update configuration for this component
GGC will wait for a timeout period before it proceeds with the update.
If the new configuration is not valid this component can use the SendConfigurationValidityReport
operation to indicate that
     *
     * Once created, the streaming operation must be started by a call to activate().
     *
     * If the operation allows for streaming input, the user may attach event listeners to receive messages.
     *
     * If the operation allows for streaming output, the user may call sendProtocolMessage() to send messages on
     * the operation's event stream once the operation has been activated.
     *
     * The user should close() a streaming operation once finished with it.  If close() is not called, the native
     * resources associated with the streaming operation will not be freed until the client is closed.
     *
     * @param request data describing the SubscribeToValidateConfigurationUpdates streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    subscribeToValidateConfigurationUpdates(request, options) {
        let operationConfig = {
            name: "aws.greengrass#SubscribeToValidateConfigurationUpdates",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Performs a UpdateConfiguration operation.
     *
     * Update this component's configuration by replacing the value of given keyName with the newValue.
     * If an oldValue is specified then update will only take effect id the current value matches the given oldValue
     *
     * @param request data describing the UpdateConfiguration operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the UpdateConfiguration operation's result, or rejected with an
     *    RpcError
     */
    updateConfiguration(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#UpdateConfiguration",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a UpdateState operation.
     *
     * Update status of this component
     *
     * @param request data describing the UpdateState operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the UpdateState operation's result, or rejected with an
     *    RpcError
     */
    updateState(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#UpdateState",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a UpdateThingShadow operation.
     *
     * Updates a device shadow document stored in the local shadow service
     * The update is an upsert operation, with optimistic locking support
     *
     * @param request data describing the UpdateThingShadow operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the UpdateThingShadow operation's result, or rejected with an
     *    RpcError
     */
    updateThingShadow(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#UpdateThingShadow",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a ValidateAuthorizationToken operation.
     *
     * Validate authorization token
     * NOTE This API can be used only by stream manager, customer component calling this API will receive UnauthorizedError
     *
     * @param request data describing the ValidateAuthorizationToken operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the ValidateAuthorizationToken operation's result, or rejected with an
     *    RpcError
     */
    validateAuthorizationToken(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#ValidateAuthorizationToken",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a VerifyClientDeviceIdentity operation.
     *
     * Verify client device credentials
     *
     * @param request data describing the VerifyClientDeviceIdentity operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the VerifyClientDeviceIdentity operation's result, or rejected with an
     *    RpcError
     */
    verifyClientDeviceIdentity(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "aws.greengrass#VerifyClientDeviceIdentity",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
}
exports.Client = Client;
/**
 * Event emitted when the client's underlying network connection is ended.  Only emitted if the connection
 * was previously successfully established.
 *
 * Listener type: {@link eventstream_rpc.DisconnectionListener}
 *
 * @event
 */
Client.DISCONNECTION = 'disconnection';
//# sourceMappingURL=client.js.map