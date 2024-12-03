/**
 * @packageDocumentation
 * @module jobs
 */
import * as model from "./model";
import { mqtt, mqtt5 } from "aws-crt";
export { model };
/**
 * Error subclass for IotJobs service errors
 *
 * @category IotJobs
 */
export declare class IotJobsError extends Error {
    readonly payload?: mqtt.Payload | undefined;
    prototype: any;
    constructor(message?: string, payload?: mqtt.Payload | undefined);
}
/**
 * The AWS IoT jobs service can be used to define a set of remote operations that are sent to and executed on one or more devices connected to AWS IoT.
 *
 * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#jobs-mqtt-api
 *
 * @category IotJobs
 */
export declare class IotJobsClient {
    private mqttAdapter;
    private static INVALID_PAYLOAD_PARSING_ERROR;
    private static createClientError;
    constructor(connection?: mqtt.MqttClientConnection);
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
    static newFromMqtt5Client(client: mqtt5.Mqtt5Client): IotJobsClient;
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
    publishDescribeJobExecution(request: model.DescribeJobExecutionRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishGetPendingJobExecutions(request: model.GetPendingJobExecutionsRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishStartNextPendingJobExecution(request: model.StartNextPendingJobExecutionRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    publishUpdateJobExecution(request: model.UpdateJobExecutionRequest, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
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
    subscribeToDescribeJobExecutionAccepted(request: model.DescribeJobExecutionSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.DescribeJobExecutionResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToDescribeJobExecutionRejected(request: model.DescribeJobExecutionSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.RejectedErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToGetPendingJobExecutionsAccepted(request: model.GetPendingJobExecutionsSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.GetPendingJobExecutionsResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToGetPendingJobExecutionsRejected(request: model.GetPendingJobExecutionsSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.RejectedErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToJobExecutionsChangedEvents(request: model.JobExecutionsChangedSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.JobExecutionsChangedEvent) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToNextJobExecutionChangedEvents(request: model.NextJobExecutionChangedSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.NextJobExecutionChangedEvent) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToStartNextPendingJobExecutionAccepted(request: model.StartNextPendingJobExecutionSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.StartNextJobExecutionResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToStartNextPendingJobExecutionRejected(request: model.StartNextPendingJobExecutionSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.RejectedErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToUpdateJobExecutionAccepted(request: model.UpdateJobExecutionSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.UpdateJobExecutionResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
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
    subscribeToUpdateJobExecutionRejected(request: model.UpdateJobExecutionSubscriptionRequest, qos: mqtt.QoS, messageHandler: (error?: IotJobsError, response?: model.RejectedErrorResponse) => void): Promise<mqtt.MqttSubscribeRequest>;
}
