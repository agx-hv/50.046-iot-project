/// <reference types="node" />
/**
 * @packageDocumentation
 * @module eventstream_rpc
 */
import { CrtError, eventstream, io, cancel } from 'aws-crt';
import { EventEmitter } from 'events';
/**
 * @internal
 *
 * Service model data about an individual operation
 */
export interface EventstreamRpcServiceModelOperation {
    requestShape: string;
    responseShape: string;
    outboundMessageShape?: string;
    inboundMessageShape?: string;
    errorShapes: Set<string>;
}
/**
 * @internal
 *
 * Normalizers strip unmodeled data from a value (by making a new value with only modeled data)
 */
export type ShapeNormalizer = (value: any) => any;
/**
 * @internal
 *
 * Validators throw errors if modeled data is of the wrong type, is missing when required, or violates any
 * other checkable protocol constraint we can think of.
 *
 * Validation is only performed on input shapes.  Output shapes must be left alone in order to support
 * service evolution indepedent of client.
 */
export type ShapeValidator = (value: any) => void;
/**
 * @internal
 *
 * Deserializers take a raw eventstream message and return a modeled shape.  If a modeled shape could not be
 * produced, an error is thrown.
 */
export type ShapeDeserializer = (message: eventstream.Message) => any;
/**
 * @internal
 *
 * Serializers take a modeled shape and return an eventstream message.  The assumption is that once a value
 * has been both validated and normalized, serializing the final value will result in a message that
 * an eventstream_rpc server can deserialize without error.
 */
export type ShapeSerializer = (value: any) => eventstream.Message;
/**
 * @internal
 *
 * Collection of service-specific utility functions and definitions that enable an eventstream RPC client to
 * correctly perform operations
 */
export interface EventstreamRpcServiceModel {
    normalizers: Map<string, ShapeNormalizer>;
    validators: Map<string, ShapeValidator>;
    deserializers: Map<string, ShapeDeserializer>;
    serializers: Map<string, ShapeSerializer>;
    operations: Map<string, EventstreamRpcServiceModelOperation>;
    enums: Map<string, Set<string>>;
}
/**
 * Indicates the general category of an error thrown by the eventstream RPC implementation
 */
export declare enum RpcErrorType {
    /**
     * An error occurred while serializing a client model into a message in the eventstream protocol.
     */
    SerializationError = 0,
    /**
     * An error occurred while deserializing a message from the eventstream protocol into the client model.
     */
    DeserializationError = 1,
    /**
     * An error occurred during the connect-connack handshake between client and server.  Usually this means
     * the connect was not accepted by the server and thus hints at an authentication problem.
     */
    HandshakeError = 2,
    /**
     * An error that isn't classifiable as one of the other RpcErrorType values.
     */
    InternalError = 3,
    /**
     * An error occurred due to an attempt to invoke an API while the target operation or client is not in the
     * right state to perform the API.
     */
    ClientStateError = 4,
    /**
     * An error occurred ostensibly due to an underlying networking failure.
     */
    NetworkError = 5,
    /**
     * An error occurred where the underlying transport was shut down unexpectedly.
     */
    InterruptionError = 6,
    /**
     * Invalid data was passed into the RPC client.
     */
    ValidationError = 7,
    /**
     * A formally-modeled error sent from server to client
     */
    ServiceError = 8
}
/**
 * @internal
 */
interface RpcErrorModel {
    type: RpcErrorType;
    description: string;
    internalError?: CrtError;
    serviceError?: any;
}
/**
 * Wrapper type for all exceptions thrown by rpc clients and operations.  This includes rejected promises.
 *
 * The intention is for this data model to help users make better decisions in the presence of errors.  Not all errors
 * are fatal/terminal, but JS doesn't really give a natural way to classify or conditionally react to general errors.
 */
export declare class RpcError extends Error {
    /** The error's broad category */
    readonly type: RpcErrorType;
    /** Plain language description of the error */
    readonly description: string;
    /** Optional inner/triggering error that can contain additional context. */
    readonly internalError?: CrtError;
    /** Optional service-specific modelled error data */
    readonly serviceError?: any;
    /** @internal */
    constructor(model: RpcErrorModel);
}
/**
 * Wrapper for all data associated with an RPC client disconnection event
 */
export interface DisconnectionEvent {
    /**
     * Underlying reason for the disconnection
     */
    reason: CrtError;
}
/**
 * Event listener type signature for listening to client disconnection events
 */
export type DisconnectionListener = (eventData?: DisconnectionEvent) => void;
/**
 * All data associated with the client successfully establishing an eventstream connection.
 *
 * Exists for future proofing at the moment.  Could eventually take connack properties, etc...
 */
export interface SuccessfulConnectionResult {
}
/**
 * Configuration for the (potentially) asynchronous message transformation applied to the CONNECT message
 * sent by the client once the underlying transport connection has been completed.
 */
export interface RpcMessageTransformationOptions {
    /**
     * (CONNECT) message to transform
     */
    message: eventstream.Message;
    /**
     * Optional controller that allows for cancellation of the asynchronous process.  The transformation implementation
     * is responsible for respecting this.
     */
    cancelController?: cancel.ICancelController;
}
/**
 * Type signature for an asynchronous function that can transform eventstream messages.  Used to allow client
 * implementations to modify the initial eventstream connect message.
 */
export type RpcMessageTransformation = (options: RpcMessageTransformationOptions) => Promise<eventstream.Message>;
/**
 * All configuration options for creating a new eventstream RPC client
 */
export interface RpcClientConfig {
    /**
     * Name of the host to connect to
     */
    hostName: string;
    /**
     * Port of the host to connect to
     */
    port: number;
    /**
     * Optional, additional socket options for the underlying connection
     */
    socketOptions?: io.SocketOptions;
    /**
     * Optional TLS context to use when establishing a connection
     */
    tlsCtx?: io.ClientTlsContext;
    /**
     * Optional message transformation function to apply to the eventstream connect message sent by the client.
     */
    connectTransform?: RpcMessageTransformation;
}
/**
 * Checks an RPC Client configuration structure and throws an exception if there is a problem with one of the
 * required properties.  Does explicit type checks in spite of typescript to validate even when used from a
 * pure Javascript project.
 *
 * @param config RPC client configuration to validate
 */
export declare function validateRpcClientConfig(config: RpcClientConfig): void;
/**
 * Configuration options for the RPC client's connect step
 */
export interface RpcClientConnectOptions {
    /**
     * Optional controller that allows the user to cancel the asynchronous connect process.
     *
     * For example:
     *
     * ```
     * setTimeout(() => {controller.cancel();}, 30000);
     * await client.connect({
     *    cancelController: controller
     * });
     * ```
     *
     * would apply a 30 second timeout to the client's connect call.
     */
    cancelController?: cancel.ICancelController;
}
/**
 * Eventstream RPC client - uses an underlying eventstream connection to implement the eventstream RPC protocol
 */
export declare class RpcClient extends EventEmitter {
    private config;
    private emitDisconnectOnClose;
    private state;
    private connection;
    private unclosedOperations?;
    private disconnectionReason?;
    private constructor();
    /**
     * Factory method to create a new client
     *
     * @param config configuration options that the new client must use
     *
     * Returns a new client on success, otherwise throws an RpcError
     */
    static new(config: RpcClientConfig): RpcClient;
    /**
     * Attempts to open a network connection to the configured remote endpoint.  Returned promise will be fulfilled if
     * the transport-level connection is successfully established and the eventstream handshake completes without
     * error.
     *
     * Returns a promise that is resolved with additional context on a successful connection, otherwise rejected.
     *
     * connect() may only be called once.
     */
    connect(options?: RpcClientConnectOptions): Promise<SuccessfulConnectionResult>;
    /**
     * Returns true if the connection is currently open and ready-to-use, false otherwise.
     */
    isConnected(): boolean;
    /**
     * @internal
     *
     * Adds an unclosed operation to the set tracked by the client.  When the client is closed, all unclosed operations
     * will also be closed.  While not foolproof, this enables us to avoid many kinds of resource leaks when the user
     * doesn't do exactly what we would like them to do (which may not be obvious to them, in all fairness).
     *
     * @param operation unclosed operation to register
     */
    registerUnclosedOperation(operation: OperationBase): void;
    /**
     * @internal
     *
     * Removes an unclosed operation from the set tracked by the client.  When the client is closed, all unclosed operations
     * will also be closed.
     *
     * @param operation operation to remove, presumably because it just got closed
     */
    removeUnclosedOperation(operation: OperationBase): void;
    /**
     * Shuts down the client and begins the process of release all native resources associated with the client
     * and in-progress operations.  It is critical that this function be called when finished with the client;
     * otherwise, native resources will leak.
     *
     * The client tracks unclosed operations and, as part of this process, closes them as well.
     */
    close(): Promise<void>;
    /**
     * @internal
     *
     * Creates a new stream on the client's connection for an RPC operation to use.
     *
     * Returns a new stream on success, otherwise throws an RpcError
     */
    newStream(): eventstream.ClientStream;
    /**
     * Event emitted when the client's underlying network connection is ended.  Only emitted if the connection
     * was previously successfully established, including a successful connect/connack handshake.
     *
     * Listener type: {@link DisconnectionListener}
     *
     * @event
     */
    static DISCONNECTION: string;
    on(event: 'disconnection', listener: DisconnectionListener): this;
    private static isValidConnack;
    private _applyEventstreamRpcHeadersToConnect;
}
/**
 * Event data wrapper for the result of activating an operation
 */
export interface OperationActivationResult {
}
/**
 * User-facing operation configuration
 */
export interface OperationOptions {
    /**
     * Optional cancel controller to cancel the sending of eventstream messages with.  Cancellation includes both
     * operation activation and sending of streaming messages.  It does not affect a streaming operation's state.
     */
    cancelController?: cancel.ICancelController;
    /**
     * Disables client-side data validation.  Useful for testing how the client handles errors from the service.
     */
    disableValidation?: boolean;
}
/**
 * @internal
 *
 * Internal eventstream RPC operation configuration
 */
export interface OperationConfig {
    /**
     * Service-prefixed operation name.  Ex: `awstest#EchoMessage`
     */
    name: string;
    /**
     * RPC client to use to perform the operation
     */
    client: RpcClient;
    /**
     * Additional user-supplied configuration
     */
    options: OperationOptions;
}
/**
 * @internal
 *
 * Common eventstream RPC operation class that includes self-cleaning functionality (via the RPC client's
 * unclosed operations logic)
 */
declare class OperationBase extends EventEmitter {
    readonly operationConfig: OperationConfig;
    private state;
    private stream;
    constructor(operationConfig: OperationConfig);
    /**
     * Shuts down the operation's stream binding, with an optional flush of a termination message to the server.
     * Also removes the operation from the associated client's unclosed operation set.
     */
    close(): Promise<void>;
    /**
     * Activates an eventstream RPC operation
     *
     * @param message eventstream message to send as part of stream activation
     */
    activate(message: eventstream.Message): Promise<OperationActivationResult>;
    /**
     * @return true if the stream is currently active and ready-to-use, false otherwise.
     */
    isActive(): boolean;
    /**
     * @return the operation's underlying event stream binding object
     */
    getStream(): eventstream.ClientStream;
    /**
     * Set this operation state to be "Ended" so that closing the operation will not send a terminate message.
     */
    setStateEnded(): void;
}
/**
 * Implementation for request-response eventstream RPC operations.
 */
export declare class RequestResponseOperation<RequestType, ResponseType> extends EventEmitter {
    private operationConfig;
    private serviceModel;
    private operation;
    /**
     * @internal
     *
     * @param operationConfig
     * @param serviceModel
     */
    constructor(operationConfig: OperationConfig, serviceModel: EventstreamRpcServiceModel);
    /**
     * Performs the request-response interaction
     *
     * @param request modeled request data
     */
    activate(request: RequestType): Promise<ResponseType>;
}
/**
 * Event listener type signature for listening to streaming operation error events.  These occcur after
 * successful activation when the operation receives a modeled error or is unable to deserialize an inbound message
 * into a modeled type.
 */
export type StreamingRpcErrorListener = (eventData: RpcError) => void;
/**
 * Event data emitted when a streaming operation is ended.
 */
export interface StreamingOperationEndedEvent {
}
/**
 * Event listener type signature for listening to ended events for streaming operations
 */
export type StreamingOperationEndedListener = (eventData: StreamingOperationEndedEvent) => void;
/**
 * Implementation of a bi-direction streaming operation.
 *
 * TODO: may change slightly for uni-directional operations
 */
export declare class StreamingOperation<RequestType, ResponseType, OutboundMessageType, InboundMessageType> extends EventEmitter {
    private request;
    private operationConfig;
    private serviceModel;
    private operation;
    private responseHandled;
    /**
     * @internal
     *
     * @param request
     * @param operationConfig
     * @param serviceModel
     */
    constructor(request: RequestType, operationConfig: OperationConfig, serviceModel: EventstreamRpcServiceModel);
    /**
     * Activates a streaming operation
     */
    activate(): Promise<ResponseType>;
    /**
     * Sends an outbound message on a streaming operation, if the operation allows outbound streaming messages.
     *
     * @param message modeled data to send
     */
    sendMessage(message: OutboundMessageType): Promise<void>;
    /**
     * Asynchronous close method for the underlying event stream.  The user should call this function when finished
     * with the operation in order to clean up native resources.  Failing to do so will cause the native resources
     * to persist until the client is closed.  If the client is never closed then every unclosed operation will leak.
     */
    close(): Promise<void>;
    /**
     * Event emitted when the operation's stream has ended.  Only emitted if the stream was successfully activated.
     *
     * Listener type: {@link StreamingOperationEndedListener}
     *
     * @event
     */
    static ENDED: string;
    /**
     * Event emitted when an incoming eventstream message resulted in some kind of error.  Usually this is either
     * a modeled service error or a deserialization error for messages that cannot be mapped to the service model.
     *
     * Listener type: {@link StreamingRpcErrorListener}
     *
     * @event
     */
    static STREAM_ERROR: string;
    /**
     * Event emitted when an incoming eventstream message is successfully deserialized into a modeled inbound streaming
     * shape type.
     *
     * @event
     */
    static MESSAGE: string;
    on(event: 'ended', listener: StreamingOperationEndedListener): this;
    on(event: 'streamError', listener: StreamingRpcErrorListener): this;
    on(event: 'message', listener: (message: InboundMessageType) => void): this;
    private _onStreamMessageEvent;
    private _onStreamEndedEvent;
}
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
export declare function createRpcError(type: RpcErrorType, description: string, internalError?: CrtError, serviceError?: any): RpcError;
export {};
