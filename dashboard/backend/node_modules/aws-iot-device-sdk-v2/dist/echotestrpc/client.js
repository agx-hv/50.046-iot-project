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
 * @module echotestrpc
 */
const model = __importStar(require("./model"));
exports.model = model;
const model_utils = __importStar(require("./model_utils"));
const eventstream_rpc = __importStar(require("../eventstream_rpc"));
const events_1 = require("events");
/**
 * A network client for interacting with the EchoTestRPC service using the eventstream RPC protocol.
 *
 * EchoTestRPC is a service for testing event-stream based clients, servers, and code generation.
 */
class Client extends events_1.EventEmitter {
    /**
     * Constructor for a EchoTestRPC service client.
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
     * Performs a CauseServiceError operation.
     *
     * Throws a ServiceError instead of returning a response.
     *
     * @param request data describing the CauseServiceError operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the CauseServiceError operation's result, or rejected with an
     *    RpcError
     */
    causeServiceError(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "awstest#CauseServiceError",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Creates a CauseStreamServiceToError streaming operation.
     *
     * Responds to initial request normally then throws a ServiceError on stream response
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
     * @param request data describing the CauseStreamServiceToError streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    causeStreamServiceToError(request, options) {
        let operationConfig = {
            name: "awstest#CauseStreamServiceToError",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Performs a EchoMessage operation.
     *
     * Returns the same data sent in the request to the response
     *
     * @param request data describing the EchoMessage operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the EchoMessage operation's result, or rejected with an
     *    RpcError
     */
    echoMessage(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "awstest#EchoMessage",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Creates a EchoStreamMessages streaming operation.
     *
     * Initial request and response are empty, but echos streaming messages sent by client
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
     * @param request data describing the EchoStreamMessages streaming operation to create
     * @param options additional eventstream options to use while this operation is active
     * @return a new StreamingOperation object
     */
    echoStreamMessages(request, options) {
        let operationConfig = {
            name: "awstest#EchoStreamMessages",
            client: this.rpcClient,
            options: (options) ? options : {}
        };
        return new eventstream_rpc.StreamingOperation(request, operationConfig, this.serviceModel);
    }
    /**
     * Performs a GetAllCustomers operation.
     *
     * Fetches all customers
     *
     * @param request data describing the GetAllCustomers operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetAllCustomers operation's result, or rejected with an
     *    RpcError
     */
    getAllCustomers(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "awstest#GetAllCustomers",
                client: this.rpcClient,
                options: (options) ? options : {}
            };
            let operation = new eventstream_rpc.RequestResponseOperation(operationConfig, this.serviceModel);
            return yield operation.activate(request);
        });
    }
    /**
     * Performs a GetAllProducts operation.
     *
     * Fetches all products, indexed by SKU
     *
     * @param request data describing the GetAllProducts operation to perform
     * @param options additional eventstream options to use while performing this operation
     * @return a Promise that is resolved with the GetAllProducts operation's result, or rejected with an
     *    RpcError
     */
    getAllProducts(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let operationConfig = {
                name: "awstest#GetAllProducts",
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