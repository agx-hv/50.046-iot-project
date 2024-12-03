/**
 * @packageDocumentation
 * @module shadow
 */
import * as model from "./model";
import { mqtt, mqtt5 } from "aws-crt";
export { model };
/**
 * Error subclass for IotShadow service errors
 *
 * @category IotShadow
 */
export declare class IotShadowError extends Error {
    readonly payload?: mqtt.Payload | undefined;
    prototype: any;
    constructor(message?: string, payload?: mqtt.Payload | undefined);
}
/**
 * The AWS IoT Device Shadow service adds shadows to AWS IoT thing objects. Shadows are a simple data store for device properties and state.  Shadows can make a device’s state available to apps and other services whether the device is connected to AWS IoT or not.
 *
 * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html
 *
 * @category IotShadow
 */
export declare class IotShadowClient {
    private mqttAdapter;
    private static INVALID_PAYLOAD_PARSING_ERROR;
    private static createClientError;
    constructor(connection?: mqtt.MqttClientConnection);
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
    static newFromMqtt5Client(client: mqtt5.Mqtt5Client): IotShadowClient;
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
    publishDeleteNamedShadow(request: model.DeleteNamedShadowRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishDeleteShadow(request: model.DeleteShadowRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishGetNamedShadow(request: model.GetNamedShadowRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishGetShadow(request: model.GetShadowRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishUpdateNamedShadow(request: model.UpdateNamedShadowRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishUpdateShadow(request: model.UpdateShadowRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    subscribeToDeleteNamedShadowAccepted(request: model.DeleteNamedShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.DeleteShadowResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToDeleteNamedShadowRejected(request: model.DeleteNamedShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToDeleteShadowAccepted(request: model.DeleteShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.DeleteShadowResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToDeleteShadowRejected(request: model.DeleteShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToGetNamedShadowAccepted(request: model.GetNamedShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.GetShadowResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToGetNamedShadowRejected(request: model.GetNamedShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToGetShadowAccepted(request: model.GetShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.GetShadowResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToGetShadowRejected(request: model.GetShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToNamedShadowDeltaUpdatedEvents(request: model.NamedShadowDeltaUpdatedSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ShadowDeltaUpdatedEvent) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToNamedShadowUpdatedEvents(request: model.NamedShadowUpdatedSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ShadowUpdatedEvent) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToShadowDeltaUpdatedEvents(request: model.ShadowDeltaUpdatedSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ShadowDeltaUpdatedEvent) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToShadowUpdatedEvents(request: model.ShadowUpdatedSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ShadowUpdatedEvent) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToUpdateNamedShadowAccepted(request: model.UpdateNamedShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.UpdateShadowResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToUpdateNamedShadowRejected(request: model.UpdateNamedShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToUpdateShadowAccepted(request: model.UpdateShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.UpdateShadowResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToUpdateShadowRejected(request: model.UpdateShadowSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotShadowError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
}
