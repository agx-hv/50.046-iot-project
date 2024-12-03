import { mqtt, mqtt5 } from 'aws-crt';
/**
 * Internal interface for the low-level MQTT service clients that lets them use either an MQTT311 client or an MQTT5
 * client.  Essentially a copy of the part of the MQTT311 client's public API that is used by the original
 * MQTT service clients.
 *
 * @internal
 */
export interface IServiceClientMqttAdapter {
    /**
     * MQTT publish API sufficient for low-level MQTT service client usage.
     *
     * @param topic topic to publish to
     * @param payload payload of the message to publish
     * @param qos MQTT quality of service to deliver the message with
     */
    publish(topic: string, payload: mqtt.Payload, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
    /**
     * MQTT subscribe API sufficient for low-level MQTT service client usage.
     *
     * @param topic topic to subscribe to
     * @param qos requested maximum quality of service the subscription should allow
     * @param on_message
     */
    subscribe(topic: string, qos: mqtt.QoS, on_message: mqtt.OnMessageCallback): Promise<mqtt.MqttSubscribeRequest>;
}
/**
 * Simple adapter for low-level MQTT service clients to use the MQTT311 client.  Since the interface is just the
 * MQTT311 client's interface, all we need to do is forward.
 *
 * @internal
 */
export declare class ServiceClientMqtt311Adapter implements IServiceClientMqttAdapter {
    private connection;
    constructor(connection: mqtt.MqttClientConnection);
    publish(topic: string, payload: mqtt.Payload, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
    subscribe(topic: string, qos: mqtt.QoS, on_message: mqtt.OnMessageCallback): Promise<mqtt.MqttSubscribeRequest>;
}
/**
 * Adapter for low-level MQTT service clients to use the MQTT5 client.
 *
 * In addition to converting between the API contracts, adaptation requires constrained simulation of certain
 * features of the MQTT311 client (per subscription callbacks).  Full emulation of the topic tried is not needed
 * because all subscriptions are done with individual, non-wildcarded topics.
 *
 * @internal
 */
export declare class ServiceClientMqtt5Adapter implements IServiceClientMqttAdapter {
    private client;
    subscriptionHandlers: Map<string, mqtt.OnMessageCallback>;
    private onMessageReceivedHandler;
    constructor(client: mqtt5.Mqtt5Client);
    publish(topic: string, payload: mqtt.Payload, qos: mqtt.QoS): Promise<mqtt.MqttRequest>;
    subscribe(topic: string, qos: mqtt.QoS, on_message: mqtt.OnMessageCallback): Promise<mqtt.MqttSubscribeRequest>;
}
