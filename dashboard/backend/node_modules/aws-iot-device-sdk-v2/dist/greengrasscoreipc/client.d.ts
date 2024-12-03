/// <reference types="node" />
/**
 * @packageDocumentation
 * @module greengrasscoreipc
 */
import * as model from "./model";
import * as eventstream_rpc from "../eventstream_rpc";
import { EventEmitter } from "events";
export { model };
/**
 * A network client for interacting with the GreengrassCoreIPC service using the eventstream RPC protocol.
 *
 * Provides communication between Greengrass core and customer component
 */
export declare class Client extends EventEmitter {
    private rpcClient;
    private serviceModel;
    /**
     * Constructor for a GreengrassCoreIPC service client.
     *
     * @param config client configuration settings
     */
    constructor(config: eventstream_rpc.RpcClientConfig);
    /**
     * Attempts to open an eventstream connection to the configured remote endpoint.  Returned promise will be fulfilled
     * if the transport-level connection is successfully established and the eventstream handshake completes without
     * error.
     *
     * connect() may only be called once.
     */
    connect(): Promise<void>;
    /**
     * Shuts down the client and begins the process of releasing all native resources associated with the client
     * as well as any unclosed operations.  It is critical that this function be called when finished with the client;
     * otherwise, native resources will leak.
     *
     * The client tracks unclosed operations and, as part of this process, closes them as well.
     *
     * Once a client has been closed, it may no longer be used.
     */
    close(): Promise<void>;
    /**
     * Event emitted when the client's underlying network connection is ended.  Only emitted if the connection
     * was previously successfully established.
     *
     * Listener type: {@link eventstream_rpc.DisconnectionListener}
     *
     * @event
     */
    static DISCONNECTION: string;
    on(event: 'disconnection', listener: eventstream_rpc.DisconnectionListener): this;
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
    authorizeClientDeviceAction(request: model.AuthorizeClientDeviceActionRequest, options?: eventstream_rpc.OperationOptions): Promise<model.AuthorizeClientDeviceActionResponse>;
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
    cancelLocalDeployment(request: model.CancelLocalDeploymentRequest, options?: eventstream_rpc.OperationOptions): Promise<model.CancelLocalDeploymentResponse>;
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
    createDebugPassword(request: model.CreateDebugPasswordRequest, options?: eventstream_rpc.OperationOptions): Promise<model.CreateDebugPasswordResponse>;
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
    createLocalDeployment(request: model.CreateLocalDeploymentRequest, options?: eventstream_rpc.OperationOptions): Promise<model.CreateLocalDeploymentResponse>;
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
    deferComponentUpdate(request: model.DeferComponentUpdateRequest, options?: eventstream_rpc.OperationOptions): Promise<model.DeferComponentUpdateResponse>;
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
    deleteThingShadow(request: model.DeleteThingShadowRequest, options?: eventstream_rpc.OperationOptions): Promise<model.DeleteThingShadowResponse>;
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
    getClientDeviceAuthToken(request: model.GetClientDeviceAuthTokenRequest, options?: eventstream_rpc.OperationOptions): Promise<model.GetClientDeviceAuthTokenResponse>;
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
    getComponentDetails(request: model.GetComponentDetailsRequest, options?: eventstream_rpc.OperationOptions): Promise<model.GetComponentDetailsResponse>;
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
    getConfiguration(request: model.GetConfigurationRequest, options?: eventstream_rpc.OperationOptions): Promise<model.GetConfigurationResponse>;
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
    getLocalDeploymentStatus(request: model.GetLocalDeploymentStatusRequest, options?: eventstream_rpc.OperationOptions): Promise<model.GetLocalDeploymentStatusResponse>;
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
    getSecretValue(request: model.GetSecretValueRequest, options?: eventstream_rpc.OperationOptions): Promise<model.GetSecretValueResponse>;
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
    getThingShadow(request: model.GetThingShadowRequest, options?: eventstream_rpc.OperationOptions): Promise<model.GetThingShadowResponse>;
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
    listComponents(request: model.ListComponentsRequest, options?: eventstream_rpc.OperationOptions): Promise<model.ListComponentsResponse>;
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
    listLocalDeployments(request: model.ListLocalDeploymentsRequest, options?: eventstream_rpc.OperationOptions): Promise<model.ListLocalDeploymentsResponse>;
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
    listNamedShadowsForThing(request: model.ListNamedShadowsForThingRequest, options?: eventstream_rpc.OperationOptions): Promise<model.ListNamedShadowsForThingResponse>;
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
    pauseComponent(request: model.PauseComponentRequest, options?: eventstream_rpc.OperationOptions): Promise<model.PauseComponentResponse>;
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
    publishToIoTCore(request: model.PublishToIoTCoreRequest, options?: eventstream_rpc.OperationOptions): Promise<model.PublishToIoTCoreResponse>;
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
    publishToTopic(request: model.PublishToTopicRequest, options?: eventstream_rpc.OperationOptions): Promise<model.PublishToTopicResponse>;
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
    putComponentMetric(request: model.PutComponentMetricRequest, options?: eventstream_rpc.OperationOptions): Promise<model.PutComponentMetricResponse>;
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
    restartComponent(request: model.RestartComponentRequest, options?: eventstream_rpc.OperationOptions): Promise<model.RestartComponentResponse>;
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
    resumeComponent(request: model.ResumeComponentRequest, options?: eventstream_rpc.OperationOptions): Promise<model.ResumeComponentResponse>;
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
    sendConfigurationValidityReport(request: model.SendConfigurationValidityReportRequest, options?: eventstream_rpc.OperationOptions): Promise<model.SendConfigurationValidityReportResponse>;
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
    stopComponent(request: model.StopComponentRequest, options?: eventstream_rpc.OperationOptions): Promise<model.StopComponentResponse>;
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
    subscribeToCertificateUpdates(request: model.SubscribeToCertificateUpdatesRequest, options?: eventstream_rpc.OperationOptions): eventstream_rpc.StreamingOperation<model.SubscribeToCertificateUpdatesRequest, model.SubscribeToCertificateUpdatesResponse, void, model.CertificateUpdateEvent>;
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
    subscribeToComponentUpdates(request: model.SubscribeToComponentUpdatesRequest, options?: eventstream_rpc.OperationOptions): eventstream_rpc.StreamingOperation<model.SubscribeToComponentUpdatesRequest, model.SubscribeToComponentUpdatesResponse, void, model.ComponentUpdatePolicyEvents>;
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
    subscribeToConfigurationUpdate(request: model.SubscribeToConfigurationUpdateRequest, options?: eventstream_rpc.OperationOptions): eventstream_rpc.StreamingOperation<model.SubscribeToConfigurationUpdateRequest, model.SubscribeToConfigurationUpdateResponse, void, model.ConfigurationUpdateEvents>;
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
    subscribeToIoTCore(request: model.SubscribeToIoTCoreRequest, options?: eventstream_rpc.OperationOptions): eventstream_rpc.StreamingOperation<model.SubscribeToIoTCoreRequest, model.SubscribeToIoTCoreResponse, void, model.IoTCoreMessage>;
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
    subscribeToTopic(request: model.SubscribeToTopicRequest, options?: eventstream_rpc.OperationOptions): eventstream_rpc.StreamingOperation<model.SubscribeToTopicRequest, model.SubscribeToTopicResponse, void, model.SubscriptionResponseMessage>;
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
    subscribeToValidateConfigurationUpdates(request: model.SubscribeToValidateConfigurationUpdatesRequest, options?: eventstream_rpc.OperationOptions): eventstream_rpc.StreamingOperation<model.SubscribeToValidateConfigurationUpdatesRequest, model.SubscribeToValidateConfigurationUpdatesResponse, void, model.ValidateConfigurationUpdateEvents>;
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
    updateConfiguration(request: model.UpdateConfigurationRequest, options?: eventstream_rpc.OperationOptions): Promise<model.UpdateConfigurationResponse>;
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
    updateState(request: model.UpdateStateRequest, options?: eventstream_rpc.OperationOptions): Promise<model.UpdateStateResponse>;
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
    updateThingShadow(request: model.UpdateThingShadowRequest, options?: eventstream_rpc.OperationOptions): Promise<model.UpdateThingShadowResponse>;
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
    validateAuthorizationToken(request: model.ValidateAuthorizationTokenRequest, options?: eventstream_rpc.OperationOptions): Promise<model.ValidateAuthorizationTokenResponse>;
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
    verifyClientDeviceIdentity(request: model.VerifyClientDeviceIdentityRequest, options?: eventstream_rpc.OperationOptions): Promise<model.VerifyClientDeviceIdentityResponse>;
}
