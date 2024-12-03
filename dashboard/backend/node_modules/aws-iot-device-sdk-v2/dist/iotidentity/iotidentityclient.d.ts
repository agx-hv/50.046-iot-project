/**
 * @packageDocumentation
 * @module identity
 */
import * as model from "./model";
import { mqtt, mqtt5 } from "aws-crt";
export { model };
/**
 * Error subclass for IotIdentity service errors
 *
 * @category IotIdentity
 */
export declare class IotIdentityError extends Error {
    readonly payload?: mqtt.Payload | undefined;
    prototype: any;
    constructor(message?: string, payload?: mqtt.Payload | undefined);
}
/**
 * An AWS IoT service that assists with provisioning a device and installing unique client certificates on it
 *
 * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html
 *
 * @category IotIdentity
 */
export declare class IotIdentityClient {
    private mqttAdapter;
    private static INVALID_PAYLOAD_PARSING_ERROR;
    private static createClientError;
    constructor(connection?: mqtt.MqttClientConnection);
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
    static newFromMqtt5Client(client: mqtt5.Mqtt5Client): IotIdentityClient;
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
    publishCreateCertificateFromCsr(request: model.CreateCertificateFromCsrRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishCreateKeysAndCertificate(request: model.CreateKeysAndCertificateRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishRegisterThing(request: model.RegisterThingRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    subscribeToCreateCertificateFromCsrAccepted(request: model.CreateCertificateFromCsrSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotIdentityError, response?: model.CreateCertificateFromCsrResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToCreateCertificateFromCsrRejected(request: model.CreateCertificateFromCsrSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotIdentityError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToCreateKeysAndCertificateAccepted(request: model.CreateKeysAndCertificateSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotIdentityError, response?: model.CreateKeysAndCertificateResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToCreateKeysAndCertificateRejected(request: model.CreateKeysAndCertificateSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotIdentityError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToRegisterThingAccepted(request: model.RegisterThingSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotIdentityError, response?: model.RegisterThingResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToRegisterThingRejected(request: model.RegisterThingSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotIdentityError, response?: model.ErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
}
