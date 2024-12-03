const { mqtt, io, iot } = require('aws-iot-device-sdk-v2');
const WebSocket = require('ws');

// AWS IoT connection details
const ENDPOINT = "a63zbtzd78225-ats.iot.ap-southeast-1.amazonaws.com";
const CLIENT_ID = "MyMQTTClient";
const CERT_PATH = "./cert/device-certificate.pem.crt";
const KEY_PATH = "./cert/private.pem.key";
const CA_PATH = "./cert/AmazonRootCA1.pem";

// const ENDPOINT = "a2l6s1mki54p61-ats.iot.ap-southeast-1.amazonaws.com";
// const CLIENT_ID = "MyMQTTClient";
// const CERT_PATH = "./cert-gizelle/device-certificate.pem.crt";
// const KEY_PATH = "./cert-gizelle/private.pem.key";
// const CA_PATH = "./cert-gizelle/AmazonRootCA1.pem";

// MQTT Topics
const PUBLISH_TOPIC_INIT = "pub/init";
const PUBLISH_TOPIC_SIMULATE = "pub/simulate";
const SUBSCRIBE_TOPICS = [
    'video/led_count1',
    'video/led_count2',
  ];

// WebSocket server setup
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log("Frontend connected via WebSocket");
  });

// Create MQTT connection
const config = iot.AwsIotMqttConnectionConfigBuilder
    .new_mtls_builder_from_path(CERT_PATH, KEY_PATH)
    .with_certificate_authority_from_path(undefined, CA_PATH)
    .with_client_id(CLIENT_ID)
    .with_endpoint(ENDPOINT)
    .build();

const client = new mqtt.MqttClient(new io.ClientBootstrap());
const connection = client.new_connection(config);

// Connect to AWS IoT
connection.connect()
    .then(() => {
        console.log("Connected to AWS IoT Core");

        // Subscribe to train1/topic
        connection.subscribe(SUBSCRIBE_TOPICS[0], mqtt.QoS.AtMostOnce, (topic, payload) => {
            const message = new TextDecoder('utf-8').decode(payload);
            console.log(`Received train1: ${message}`);

            // Broadcast to WebSocket clients
            wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                // CHANGE THIS WITH FORMAT
                client.send(JSON.stringify({ payload }));
            }
            });
        });

        // Subscribe to train2/topic
        connection.subscribe(SUBSCRIBE_TOPICS[1], mqtt.QoS.AtMostOnce, (topic, payload) => {
            const message = new TextDecoder('utf-8').decode(payload);
            console.log(`Received train2: ${message}`);

            // Broadcast to WebSocket clients
            wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ payload }));
            }
            });
        });
        })

        // Subscribe to the pub/simulate topic to listen for "stop" messages
    connection.subscribe('pub/simulate', mqtt.QoS.AtMostOnce, (topic, payload) => {
      const message = new TextDecoder('utf-8').decode(payload);
      console.log(`Received message on pub/simulate: ${message}`);

      if (message === 'stop') {
        console.log("Simulation stopped!");

        // Broadcast "stop" to WebSocket clients
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send('stop');
          }
        });
      }
    })
      
    .catch(error => {
        console.error("Failed to connect:", error);
    });

// Subscribe to pub/simulate to listen "stop"
connection.connect()
.then(() => {
  console.log("Connected to AWS IoT Core");

  // Subscribe to the pub/simulate topic to listen for "stop" messages
  connection.subscribe(PUBLISH_TOPIC_SIMULATE, mqtt.QoS.AtMostOnce, (topic, payload) => {
    const message = new TextDecoder('utf-8').decode(payload);
    console.log(`Received message on pub/simulate: ${message}`);

    // Broadcast "stop" to WebSocket clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('stop');
      }
    });
  });
})
.catch(error => {
  console.error("Failed to connect:", error);
});

// Handle WebSocket connections from frontend
wss.on('connection', (ws) => {
  console.log("Frontend connected via WebSocket");

  ws.on('message', (message) => {
    console.log("Message received from frontend:", message);

    // Parse the message if needed (or check if it contains an action indicator)
    const parsedMessage = message.toString();

    if (parsedMessage === 'start') {
      // Publish 'start' to the 'pub/simulate' topic
      connection.publish(PUBLISH_TOPIC_SIMULATE, 'start', mqtt.QoS.AtMostOnce)
        .then(() => {
          console.log('Published "start" to MQTT topic: pub/simulate');
        })
        .catch((err) => {
          console.error('Failed to publish "start" to MQTT:', err);
        });
    } else {
      // Assume all other messages are for 'pub/init'
      connection.publish(PUBLISH_TOPIC_INIT, parsedMessage, mqtt.QoS.AtMostOnce)
        .then(() => {
          console.log("Published data to MQTT topic 'pub/init':", parsedMessage);
        })
        .catch(err => {
          console.error("Failed to publish to MQTT:", err);
        });
    }
  });

  ws.on('close', () => {
    console.log("Frontend disconnected");
  });
});
