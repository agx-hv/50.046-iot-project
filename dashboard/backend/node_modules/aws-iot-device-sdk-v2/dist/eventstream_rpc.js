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
exports.createRpcError = exports.StreamingOperation = exports.RequestResponseOperation = exports.RpcClient = exports.validateRpcClientConfig = exports.RpcError = exports.RpcErrorType = void 0;
/**
 * @packageDocumentation
 * @module eventstream_rpc
 */
const aws_crt_1 = require("aws-crt");
const events_1 = require("events");
const util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
/**
 * Indicates the general category of an error thrown by the eventstream RPC implementation
 */
var RpcErrorType;
(function (RpcErrorType) {
    /**
     * An error occurred while serializing a client model into a message in the eventstream protocol.
     */
    RpcErrorType[RpcErrorType["SerializationError"] = 0] = "SerializationError";
    /**
     * An error occurred while deserializing a message from the eventstream protocol into the client model.
     */
    RpcErrorType[RpcErrorType["DeserializationError"] = 1] = "DeserializationError";
    /**
     * An error occurred during the connect-connack handshake between client and server.  Usually this means
     * the connect was not accepted by the server and thus hints at an authentication problem.
     */
    RpcErrorType[RpcErrorType["HandshakeError"] = 2] = "HandshakeError";
    /**
     * An error that isn't classifiable as one of the other RpcErrorType values.
     */
    RpcErrorType[RpcErrorType["InternalError"] = 3] = "InternalError";
    /**
     * An error occurred due to an attempt to invoke an API while the target operation or client is not in the
     * right state to perform the API.
     */
    RpcErrorType[RpcErrorType["ClientStateError"] = 4] = "ClientStateError";
    /**
     * An error occurred ostensibly due to an underlying networking failure.
     */
    RpcErrorType[RpcErrorType["NetworkError"] = 5] = "NetworkError";
    /**
     * An error occurred where the underlying transport was shut down unexpectedly.
     */
    RpcErrorType[RpcErrorType["InterruptionError"] = 6] = "InterruptionError";
    /**
     * Invalid data was passed into the RPC client.
     */
    RpcErrorType[RpcErrorType["ValidationError"] = 7] = "ValidationError";
    /**
     * A formally-modeled error sent from server to client
     */
    RpcErrorType[RpcErrorType["ServiceError"] = 8] = "ServiceError";
})(RpcErrorType = exports.RpcErrorType || (exports.RpcErrorType = {}));
;
/**
 * Wrapper type for all exceptions thrown by rpc clients and operations.  This includes rejected promises.
 *
 * The intention is for this data model to help users make better decisions in the presence of errors.  Not all errors
 * are fatal/terminal, but JS doesn't really give a natural way to classify or conditionally react to general errors.
 */
class RpcError extends Error {
    /** @internal */
    constructor(model) {
        super(model.description);
        this.type = model.type;
        this.description = model.description;
        if (model.internalError) {
            this.internalError = model.internalError;
        }
        if (model.serviceError) {
            this.serviceError = model.serviceError;
        }
    }
}
exports.RpcError = RpcError;
/**
 * Checks an RPC Client configuration structure and throws an exception if there is a problem with one of the
 * required properties.  Does explicit type checks in spite of typescript to validate even when used from a
 * pure Javascript project.
 *
 * @param config RPC client configuration to validate
 */
function validateRpcClientConfig(config) {
    if (!config) {
        throw createRpcError(RpcErrorType.ValidationError, "Eventstream RPC client configuration is undefined");
    }
    if (!config.hostName) {
        throw createRpcError(RpcErrorType.ValidationError, "Eventstream RPC client configuration must have a valid host name");
    }
    if (typeof config.hostName !== 'string') {
        throw createRpcError(RpcErrorType.ValidationError, "Eventstream RPC client configuration host name must be a string");
    }
    if (config.port === undefined || config.port === null) {
        throw createRpcError(RpcErrorType.ValidationError, "Eventstream RPC client configuration must have a valid port");
    }
    if (typeof config.port !== 'number' || !Number.isSafeInteger(config.port) || config.port < 0 || config.port > 65535) {
        throw createRpcError(RpcErrorType.ValidationError, "Eventstream RPC client configuration host name must be 16-bit integer");
    }
}
exports.validateRpcClientConfig = validateRpcClientConfig;
/**
 * @internal a rough mirror of the internal connection state, but ultimately must be independent due to the more
 * complex connection establishment process (connect/connack).  Used to prevent API invocations when the client
 * is not in the proper state to attempt them.
 */
var ClientState;
(function (ClientState) {
    ClientState[ClientState["None"] = 0] = "None";
    ClientState[ClientState["Connecting"] = 1] = "Connecting";
    ClientState[ClientState["Connected"] = 2] = "Connected";
    ClientState[ClientState["Finished"] = 3] = "Finished";
    ClientState[ClientState["Closed"] = 4] = "Closed";
})(ClientState || (ClientState = {}));
/**
 * Eventstream RPC client - uses an underlying eventstream connection to implement the eventstream RPC protocol
 */
class RpcClient extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.config = config;
        this.unclosedOperations = new Set();
        this.state = ClientState.None;
        this.emitDisconnectOnClose = false;
        let connectionOptions = {
            hostName: config.hostName,
            port: config.port,
            socketOptions: config.socketOptions,
            tlsCtx: config.tlsCtx
        };
        try {
            // consider factoring connect timeout into socket options to help bound promise resolution/wait time in
            // connect()
            this.connection = new aws_crt_1.eventstream.ClientConnection(connectionOptions);
        }
        catch (e) {
            throw createRpcError(RpcErrorType.InternalError, "Failed to create eventstream connection", e);
        }
    }
    /**
     * Factory method to create a new client
     *
     * @param config configuration options that the new client must use
     *
     * Returns a new client on success, otherwise throws an RpcError
     */
    static new(config) {
        return new RpcClient(config);
    }
    /**
     * Attempts to open a network connection to the configured remote endpoint.  Returned promise will be fulfilled if
     * the transport-level connection is successfully established and the eventstream handshake completes without
     * error.
     *
     * Returns a promise that is resolved with additional context on a successful connection, otherwise rejected.
     *
     * connect() may only be called once.
     */
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (this.state != ClientState.None) {
                    reject(createRpcError(RpcErrorType.ClientStateError, "RpcClient.connect() can only be called once"));
                    return;
                }
                let onDisconnectWhileConnecting = (eventData) => {
                    if (this.state == ClientState.Connecting) {
                        this.state = ClientState.Finished;
                        reject(createRpcError(RpcErrorType.NetworkError, "RpcClient.connect() failed - connection closed"));
                        setImmediate(() => { this.close(); });
                    }
                };
                this.connection.on('disconnection', onDisconnectWhileConnecting);
                this.state = ClientState.Connecting;
                let connack = undefined;
                try {
                    yield this.connection.connect({
                        cancelController: options === null || options === void 0 ? void 0 : options.cancelController
                    });
                    // create, transform, and send the connect
                    let connectMessage = {
                        type: aws_crt_1.eventstream.MessageType.Connect
                    };
                    if (this.config.connectTransform) {
                        connectMessage = yield this.config.connectTransform({
                            message: connectMessage,
                            cancelController: options === null || options === void 0 ? void 0 : options.cancelController
                        });
                    }
                    this._applyEventstreamRpcHeadersToConnect(connectMessage);
                    let connackPromise = aws_crt_1.cancel.newCancellablePromiseFromNextEvent({
                        cancelController: options === null || options === void 0 ? void 0 : options.cancelController,
                        emitter: this.connection,
                        eventName: aws_crt_1.eventstream.ClientConnection.PROTOCOL_MESSAGE,
                        eventDataTransformer: (eventData) => { return eventData.message; },
                        cancelMessage: "Eventstream connect() cancelled by user request"
                    });
                    yield this.connection.sendProtocolMessage({
                        message: connectMessage,
                        cancelController: options === null || options === void 0 ? void 0 : options.cancelController
                    });
                    // wait for the conn ack or cancel
                    connack = yield connackPromise;
                }
                catch (err) {
                    if (this.state == ClientState.Connecting) {
                        this.state = ClientState.Finished;
                        setImmediate(() => { this.close(); });
                    }
                    reject(createRpcError(RpcErrorType.InternalError, "Failed to establish eventstream RPC connection", err));
                    return;
                }
                if (this.state != ClientState.Connecting) {
                    reject(createRpcError(RpcErrorType.InternalError, "Eventstream RPC connection attempt interrupted"));
                    return;
                }
                if (!connack || !RpcClient.isValidConnack(connack)) {
                    this.state = ClientState.Finished;
                    reject(createRpcError(RpcErrorType.HandshakeError, "Failed to establish eventstream RPC connection - invalid connack"));
                    setImmediate(() => { this.close(); });
                    return;
                }
                /*
                 * Remove the promise-rejecting disconnect listener and replace it with a regular old listener that
                 * doesn't reject the connect() promise since we're going to resolve it now.
                 */
                this.connection.removeListener('disconnection', onDisconnectWhileConnecting);
                this.connection.on('disconnection', (eventData) => {
                    if (eventData.errorCode != 0) {
                        this.disconnectionReason = new aws_crt_1.CrtError(eventData.errorCode);
                    }
                    setImmediate(() => { this.close(); });
                });
                /* Per the client contract, we only emit disconnect after a successful connection establishment */
                this.emitDisconnectOnClose = true;
                this.state = ClientState.Connected;
                resolve({});
            }));
        });
    }
    /**
     * Returns true if the connection is currently open and ready-to-use, false otherwise.
     */
    isConnected() {
        return this.state == ClientState.Connected;
    }
    /**
     * @internal
     *
     * Adds an unclosed operation to the set tracked by the client.  When the client is closed, all unclosed operations
     * will also be closed.  While not foolproof, this enables us to avoid many kinds of resource leaks when the user
     * doesn't do exactly what we would like them to do (which may not be obvious to them, in all fairness).
     *
     * @param operation unclosed operation to register
     */
    registerUnclosedOperation(operation) {
        if (!this.isConnected() || !this.unclosedOperations) {
            throw createRpcError(RpcErrorType.ClientStateError, "Operation registration only allowed when the client is connected");
        }
        this.unclosedOperations.add(operation);
    }
    /**
     * @internal
     *
     * Removes an unclosed operation from the set tracked by the client.  When the client is closed, all unclosed operations
     * will also be closed.
     *
     * @param operation operation to remove, presumably because it just got closed
     */
    removeUnclosedOperation(operation) {
        if (this.unclosedOperations) {
            this.unclosedOperations.delete(operation);
        }
    }
    /**
     * Shuts down the client and begins the process of release all native resources associated with the client
     * and in-progress operations.  It is critical that this function be called when finished with the client;
     * otherwise, native resources will leak.
     *
     * The client tracks unclosed operations and, as part of this process, closes them as well.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (this.state == ClientState.Closed) {
                        resolve();
                        return;
                    }
                    this.state = ClientState.Closed;
                    if (this.emitDisconnectOnClose) {
                        this.emitDisconnectOnClose = false;
                        if (!this.disconnectionReason) {
                            this.disconnectionReason = new aws_crt_1.CrtError("User-initiated disconnect");
                        }
                        setImmediate(() => {
                            this.emit('disconnection', { reason: this.disconnectionReason });
                        });
                    }
                    if (this.unclosedOperations) {
                        let unclosedOperations = this.unclosedOperations;
                        this.unclosedOperations = undefined;
                        for (const operation of unclosedOperations) {
                            yield operation.close();
                        }
                    }
                    this.connection.close();
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    /**
     * @internal
     *
     * Creates a new stream on the client's connection for an RPC operation to use.
     *
     * Returns a new stream on success, otherwise throws an RpcError
     */
    newStream() {
        if (this.state != ClientState.Connected) {
            throw createRpcError(RpcErrorType.ClientStateError, "New streams may only be created while the client is connected");
        }
        try {
            return this.connection.newStream();
        }
        catch (e) {
            throw createRpcError(RpcErrorType.InternalError, "Failed to create new event stream", e);
        }
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    static isValidConnack(message) {
        var _a;
        if (message.type != aws_crt_1.eventstream.MessageType.ConnectAck) {
            return false;
        }
        if ((((_a = message.flags) !== null && _a !== void 0 ? _a : 0) & aws_crt_1.eventstream.MessageFlags.ConnectionAccepted) == 0) {
            return false;
        }
        return true;
    }
    _applyEventstreamRpcHeadersToConnect(connectMessage) {
        if (!connectMessage.headers) {
            connectMessage.headers = [];
        }
        connectMessage.headers.push(aws_crt_1.eventstream.Header.newString(':version', '0.1.0'));
    }
}
exports.RpcClient = RpcClient;
/**
 * Event emitted when the client's underlying network connection is ended.  Only emitted if the connection
 * was previously successfully established, including a successful connect/connack handshake.
 *
 * Listener type: {@link DisconnectionListener}
 *
 * @event
 */
RpcClient.DISCONNECTION = 'disconnection';
/**
 * @internal a rough mirror of the internal stream binding state.
 */
var OperationState;
(function (OperationState) {
    OperationState[OperationState["None"] = 0] = "None";
    OperationState[OperationState["Activating"] = 1] = "Activating";
    OperationState[OperationState["Activated"] = 2] = "Activated";
    OperationState[OperationState["Ended"] = 3] = "Ended";
    OperationState[OperationState["Closed"] = 4] = "Closed";
})(OperationState || (OperationState = {}));
/**
 * @internal
 *
 * Common eventstream RPC operation class that includes self-cleaning functionality (via the RPC client's
 * unclosed operations logic)
 */
class OperationBase extends events_1.EventEmitter {
    constructor(operationConfig) {
        super();
        this.operationConfig = operationConfig;
        this.state = OperationState.None;
        this.stream = operationConfig.client.newStream();
        operationConfig.client.registerUnclosedOperation(this);
    }
    /**
     * Shuts down the operation's stream binding, with an optional flush of a termination message to the server.
     * Also removes the operation from the associated client's unclosed operation set.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (this.state == OperationState.Closed) {
                    resolve();
                    return;
                }
                this.operationConfig.client.removeUnclosedOperation(this);
                let shouldTerminateStream = this.state == OperationState.Activated;
                this.state = OperationState.Closed;
                if (shouldTerminateStream) {
                    try {
                        yield this.stream.sendMessage({
                            message: {
                                type: aws_crt_1.eventstream.MessageType.ApplicationMessage,
                                flags: aws_crt_1.eventstream.MessageFlags.TerminateStream
                            }
                        });
                    }
                    catch (e) {
                        // an exception generated from trying to gently end the stream should not propagate
                    }
                }
                setImmediate(() => {
                    this.stream.close();
                });
                resolve();
            }));
        });
    }
    /**
     * Activates an eventstream RPC operation
     *
     * @param message eventstream message to send as part of stream activation
     */
    activate(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (this.state != OperationState.None) {
                    reject(createRpcError(RpcErrorType.ClientStateError, "Eventstream operations may only have activate() invoked once"));
                    return;
                }
                this.state = OperationState.Activating;
                try {
                    let activatePromise = this.stream.activate({
                        operation: this.operationConfig.name,
                        message: message,
                        cancelController: this.operationConfig.options.cancelController
                    });
                    yield activatePromise;
                }
                catch (e) {
                    if (this.state == OperationState.Activating) {
                        this.state = OperationState.Ended;
                        setImmediate(() => { this.close(); });
                    }
                    reject(createRpcError(RpcErrorType.InternalError, "Operation stream activation failure", e));
                    return;
                }
                if (this.state != OperationState.Activating) {
                    reject(createRpcError(RpcErrorType.InternalError, "Operation stream activation interruption"));
                    return;
                }
                this.state = OperationState.Activated;
                resolve({});
            }));
        });
    }
    /**
     * @return true if the stream is currently active and ready-to-use, false otherwise.
     */
    isActive() {
        return this.state == OperationState.Activated;
    }
    /**
     * @return the operation's underlying event stream binding object
     */
    getStream() { return this.stream; }
    /**
     * Set this operation state to be "Ended" so that closing the operation will not send a terminate message.
     */
    setStateEnded() {
        this.state = OperationState.Ended;
    }
}
/**
 * Implementation for request-response eventstream RPC operations.
 */
class RequestResponseOperation extends events_1.EventEmitter {
    /**
     * @internal
     *
     * @param operationConfig
     * @param serviceModel
     */
    constructor(operationConfig, serviceModel) {
        if (!serviceModel.operations.has(operationConfig.name)) {
            throw createRpcError(RpcErrorType.InternalError, `service model has no operation named ${operationConfig.name}`);
        }
        super();
        this.operationConfig = operationConfig;
        this.serviceModel = serviceModel;
        this.operation = new OperationBase(this.operationConfig);
    }
    /**
     * Performs the request-response interaction
     *
     * @param request modeled request data
     */
    activate(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    let stream = this.operation.getStream();
                    let responsePromise = aws_crt_1.cancel.newCancellablePromiseFromNextEvent({
                        cancelController: this.operationConfig.options.cancelController,
                        emitter: stream,
                        eventName: aws_crt_1.eventstream.ClientStream.MESSAGE,
                        eventDataTransformer: (eventData) => { return eventData.message; },
                        cancelMessage: "Eventstream execute() cancelled by user request"
                    });
                    if (!this.operationConfig.options.disableValidation) {
                        validateRequest(this.serviceModel, this.operationConfig.name, request);
                    }
                    let requestMessage = serializeRequest(this.serviceModel, this.operationConfig.name, request);
                    yield this.operation.activate(requestMessage);
                    let message = yield responsePromise;
                    // If the server terminated the stream, then set the operation to be ended immediately
                    if (((_a = message.flags) !== null && _a !== void 0 ? _a : 0) & aws_crt_1.eventstream.MessageFlags.TerminateStream) {
                        this.operation.setStateEnded();
                    }
                    let response = deserializeResponse(this.serviceModel, this.operationConfig.name, message);
                    resolve(response);
                }
                catch (e) {
                    reject(e);
                }
            }));
            let autoClosePromise = resultPromise.finally(() => __awaiter(this, void 0, void 0, function* () { yield this.operation.close(); }));
            return autoClosePromise;
        });
    }
}
exports.RequestResponseOperation = RequestResponseOperation;
/**
 * Implementation of a bi-direction streaming operation.
 *
 * TODO: may change slightly for uni-directional operations
 */
class StreamingOperation extends events_1.EventEmitter {
    /**
     * @internal
     *
     * @param request
     * @param operationConfig
     * @param serviceModel
     */
    constructor(request, operationConfig, serviceModel) {
        if (!serviceModel.operations.has(operationConfig.name)) {
            throw createRpcError(RpcErrorType.InternalError, `service model has no operation named ${operationConfig.name}`);
        }
        if (!operationConfig.options.disableValidation) {
            validateRequest(serviceModel, operationConfig.name, request);
        }
        super();
        this.request = request;
        this.operationConfig = operationConfig;
        this.serviceModel = serviceModel;
        this.operation = new OperationBase(operationConfig);
        this.responseHandled = false;
    }
    /**
     * Activates a streaming operation
     */
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    let stream = this.operation.getStream();
                    stream.addListener(aws_crt_1.eventstream.ClientStream.MESSAGE, this._onStreamMessageEvent.bind(this));
                    stream.addListener(aws_crt_1.eventstream.ClientStream.ENDED, this._onStreamEndedEvent.bind(this));
                    let responsePromise = aws_crt_1.cancel.newCancellablePromiseFromNextEvent({
                        cancelController: this.operationConfig.options.cancelController,
                        emitter: stream,
                        eventName: aws_crt_1.eventstream.ClientStream.MESSAGE,
                        eventDataTransformer: (eventData) => {
                            this.responseHandled = true;
                            return eventData.message;
                        },
                        cancelMessage: "Eventstream execute() cancelled by user request"
                    });
                    let requestMessage = serializeRequest(this.serviceModel, this.operationConfig.name, this.request);
                    yield this.operation.activate(requestMessage);
                    let message = yield responsePromise;
                    let response = deserializeResponse(this.serviceModel, this.operationConfig.name, message);
                    // If the server terminated the stream, then set the operation to be ended immediately
                    if (((_a = message.flags) !== null && _a !== void 0 ? _a : 0) & aws_crt_1.eventstream.MessageFlags.TerminateStream) {
                        this.operation.setStateEnded();
                        // Server hung up on us. Immediately cleanup the operation state.
                        // Do this before resolving the promise so that any user-initiated
                        // requests will see the correct state, which is that the operation is closed.
                        yield this.close();
                    }
                    resolve(response);
                }
                catch (e) {
                    yield this.close();
                    reject(e);
                }
            }));
        });
    }
    /**
     * Sends an outbound message on a streaming operation, if the operation allows outbound streaming messages.
     *
     * @param message modeled data to send
     */
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!doesOperationAllowOutboundMessages(this.serviceModel, this.operationConfig.name)) {
                        throw createRpcError(RpcErrorType.ValidationError, `Operation '${this.operationConfig.name}' does not allow outbound streaming messages.`);
                    }
                    if (!this.operationConfig.options.disableValidation) {
                        validateOutboundMessage(this.serviceModel, this.operationConfig.name, message);
                    }
                    let serializedMessage = serializeOutboundMessage(this.serviceModel, this.operationConfig.name, message);
                    let stream = this.operation.getStream();
                    yield stream.sendMessage({
                        message: serializedMessage,
                        cancelController: this.operationConfig.options.cancelController
                    });
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    /**
     * Asynchronous close method for the underlying event stream.  The user should call this function when finished
     * with the operation in order to clean up native resources.  Failing to do so will cause the native resources
     * to persist until the client is closed.  If the client is never closed then every unclosed operation will leak.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.operation.close();
        });
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    _onStreamMessageEvent(eventData) {
        if (this.responseHandled) {
            try {
                let streamingMessage = deserializeInboundMessage(this.serviceModel, this.operationConfig.name, eventData.message);
                setImmediate(() => {
                    this.emit(StreamingOperation.MESSAGE, streamingMessage);
                });
            }
            catch (err) {
                setImmediate(() => { this.emit(StreamingOperation.STREAM_ERROR, err); });
            }
        }
    }
    _onStreamEndedEvent(eventData) {
        setImmediate(() => __awaiter(this, void 0, void 0, function* () {
            this.emit(StreamingOperation.ENDED, {});
            yield this.close();
        }));
    }
}
exports.StreamingOperation = StreamingOperation;
/**
 * Event emitted when the operation's stream has ended.  Only emitted if the stream was successfully activated.
 *
 * Listener type: {@link StreamingOperationEndedListener}
 *
 * @event
 */
StreamingOperation.ENDED = 'ended';
/**
 * Event emitted when an incoming eventstream message resulted in some kind of error.  Usually this is either
 * a modeled service error or a deserialization error for messages that cannot be mapped to the service model.
 *
 * Listener type: {@link StreamingRpcErrorListener}
 *
 * @event
 */
StreamingOperation.STREAM_ERROR = 'streamError';
/**
 * Event emitted when an incoming eventstream message is successfully deserialized into a modeled inbound streaming
 * shape type.
 *
 * @event
 */
StreamingOperation.MESSAGE = 'message';
/**
 * Utility function to create RpcError errors
 *
 * @param type type of error
 * @param description longer description of error
 * @param internalError optional CrtError that caused this error
 * @param serviceError optional modeled eventstream RPC service error that triggered this error
 *
 * @return a new RpcError object
 */
function createRpcError(type, description, internalError, serviceError) {
    return new RpcError({
        type: type,
        description: description,
        internalError: internalError,
        serviceError: serviceError
    });
}
exports.createRpcError = createRpcError;
const SERVICE_MODEL_TYPE_HEADER_NAME = 'service-model-type';
const CONTENT_TYPE_HEADER_NAME = ':content-type';
const CONTENT_TYPE_PLAIN_TEXT = 'text/plain';
function getEventStreamMessageHeaderValueAsString(message, headerName) {
    if (!message.headers) {
        return undefined;
    }
    try {
        for (const header of message.headers) {
            if (header.name === headerName) {
                return header.asString();
            }
        }
    }
    catch (err) {
        return undefined;
    }
    return undefined;
}
function validateShape(model, shapeName, shape) {
    if (!shape) {
        throw createRpcError(RpcErrorType.ValidationError, `Shape of type '${shapeName}' is undefined`);
    }
    let validator = model.validators.get(shapeName);
    if (!validator) {
        throw createRpcError(RpcErrorType.ValidationError, `No shape named '${shapeName}' exists in the service model`);
    }
    validator(shape);
}
function validateOperationShape(model, operationName, shape, shapeSelector) {
    let operation = model.operations.get(operationName);
    if (!operation) {
        throw createRpcError(RpcErrorType.InternalError, `No operation named '${operationName}' exists in the service model`);
    }
    let selectedShape = shapeSelector(operation);
    if (!selectedShape) {
        throw createRpcError(RpcErrorType.ValidationError, `Operation '${operationName}' does not have a defined selection shape`);
    }
    return validateShape(model, selectedShape, shape);
}
function validateRequest(model, operationName, request) {
    validateOperationShape(model, operationName, request, (operation) => { return operation.requestShape; });
}
function validateOutboundMessage(model, operationName, message) {
    validateOperationShape(model, operationName, message, (operation) => { return operation.outboundMessageShape; });
}
function doesOperationAllowOutboundMessages(model, operationName) {
    let operation = model.operations.get(operationName);
    if (!operation) {
        throw createRpcError(RpcErrorType.InternalError, `No operation named '${operationName}' exists in the service model`);
    }
    return operation.outboundMessageShape !== undefined;
}
function serializeMessage(model, operationName, message, shapeSelector) {
    let operation = model.operations.get(operationName);
    if (!operation) {
        throw createRpcError(RpcErrorType.InternalError, `No operation named '${operationName}' exists in the service model`);
    }
    let shapeName = shapeSelector(operation);
    if (!shapeName) {
        throw createRpcError(RpcErrorType.InternalError, `Operation '${operationName}' does not have a defined selection shape`);
    }
    let serializer = model.serializers.get(shapeName);
    if (!serializer) {
        throw createRpcError(RpcErrorType.InternalError, `No top-level shape serializer for '${shapeName}' exists in the service model`);
    }
    return serializer(message);
}
function serializeRequest(model, operationName, request) {
    return serializeMessage(model, operationName, request, (operation) => { return operation.requestShape; });
}
function serializeOutboundMessage(model, operationName, message) {
    return serializeMessage(model, operationName, message, (operation) => { return operation.outboundMessageShape; });
}
function throwResponseError(model, errorShapes, shapeName, message) {
    if (!shapeName) {
        if (message.type != aws_crt_1.eventstream.MessageType.ApplicationMessage) {
            if (message.type == aws_crt_1.eventstream.MessageType.ApplicationError) {
                let contentType = getEventStreamMessageHeaderValueAsString(message, CONTENT_TYPE_HEADER_NAME);
                if (contentType && contentType === CONTENT_TYPE_PLAIN_TEXT) {
                    let payloadAsString = (0, util_utf8_browser_1.toUtf8)(new Uint8Array(message.payload));
                    ;
                    throw createRpcError(RpcErrorType.InternalError, `Eventstream (response) message was not a modelled shape.  Plain text payload is: '${payloadAsString}'`);
                }
            }
        }
        throw createRpcError(RpcErrorType.InternalError, "Eventstream (response) message was not an application message");
    }
    let isErrorShape = errorShapes.has(shapeName);
    let serviceError = undefined;
    if (isErrorShape) {
        let errorDeserializer = model.deserializers.get(shapeName);
        if (errorDeserializer) {
            serviceError = errorDeserializer(message);
        }
    }
    let errorType = serviceError ? RpcErrorType.ServiceError : RpcErrorType.InternalError;
    let errorDescription = serviceError ? "Eventstream RPC request failed.  Check serviceError property for details." : `Unexpected response shape received: '${shapeName}'`;
    let rpcError = createRpcError(errorType, errorDescription, undefined, serviceError);
    throw rpcError;
}
function deserializeMessage(model, operationName, message, shapeSelector) {
    let operation = model.operations.get(operationName);
    if (!operation) {
        throw createRpcError(RpcErrorType.InternalError, `No operation named '${operationName}' exists in the service model`);
    }
    let messageShape = getEventStreamMessageHeaderValueAsString(message, SERVICE_MODEL_TYPE_HEADER_NAME);
    let operationShape = shapeSelector(operation);
    if (!messageShape || messageShape !== operationShape || !operationShape) {
        throwResponseError(model, operation.errorShapes, messageShape, message);
        return;
    }
    let deserializer = model.deserializers.get(operationShape);
    if (!deserializer) {
        throw createRpcError(RpcErrorType.InternalError, `No top-level shape deserializer for '${operationShape}' exists in the service model`);
    }
    let response = deserializer(message);
    return response;
}
function deserializeResponse(model, operationName, message) {
    return deserializeMessage(model, operationName, message, (operation) => { return operation.responseShape; });
}
function deserializeInboundMessage(model, operationName, message) {
    return deserializeMessage(model, operationName, message, (operation) => { return operation.inboundMessageShape; });
}
//# sourceMappingURL=eventstream_rpc.js.map