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
const PUBLISH_TOPICS = [
  'pub/train1/init',
  'pub/train2/init',
  'pub/train1/simulate',
  'pub/train2/simulate'
];

const SUBSCRIBE_TOPICS = [
  'video/train1/led_count1',
  'video/train1/led_count2',
  'video/train2/led_count1',
  'video/train2/led_count2'
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

      // Subscribe to video/train1/led_count1
      connection.subscribe(SUBSCRIBE_TOPICS[0], mqtt.QoS.AtMostOnce, (topic, payload) => {
          const message = new TextDecoder('utf-8').decode(payload);
          console.log(`Received train1car1: ${message}`);

          const filledSeats = parseInt(message, 10);
          const formattedMessage = { trainId: 1, carriageId: 1, filledSeats };
          console.log("formattedMessage1: ", formattedMessage);

          // Broadcast to WebSocket clients
          wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(formattedMessage));
          }
          });
      });

      // Subscribe to video/train1/led_count2
      connection.subscribe(SUBSCRIBE_TOPICS[1], mqtt.QoS.AtMostOnce, (topic, payload) => {
          const message = new TextDecoder('utf-8').decode(payload);
          console.log(`Received train1car2: ${message}`);

          const filledSeats = parseInt(message, 10);
          const formattedMessage = { trainId: 1, carriageId: 2, filledSeats };
          console.log("formattedMessage2: ", formattedMessage);

          // Broadcast to WebSocket clients
          wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(formattedMessage));
          }
          });
      });

      // Subscribe to video/train2/led_count1
      connection.subscribe(SUBSCRIBE_TOPICS[2], mqtt.QoS.AtMostOnce, (topic, payload) => {
        const message = new TextDecoder('utf-8').decode(payload);
        console.log(`Received train2car1: ${message}`);

        const filledSeats = parseInt(message, 10);
        const formattedMessage = { trainId: 2, carriageId: 1, filledSeats };
        console.log("formattedMessage2: ", formattedMessage);

        // Broadcast to WebSocket clients
        wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(formattedMessage));
        }
        });
      });

      // Subscribe to video/train2/led_count2
      connection.subscribe(SUBSCRIBE_TOPICS[3], mqtt.QoS.AtMostOnce, (topic, payload) => {
        const message = new TextDecoder('utf-8').decode(payload);
        console.log(`Received train2car2: ${message}`);

        const filledSeats = parseInt(message, 10);
        const formattedMessage = { trainId: 2, carriageId: 2, filledSeats };
        console.log("formattedMessage2: ", formattedMessage);

        // Broadcast to WebSocket clients
        wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(formattedMessage));
        }
        });
      });

    })

    // Subscribe to the pub/train1/simulate topic to listen for "stop" messages
    connection.subscribe(PUBLISH_TOPICS[2], mqtt.QoS.AtMostOnce, (topic, payload) => {
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

    // Subscribe to the pub/train2/simulate topic to listen for "stop" messages
    connection.subscribe(PUBLISH_TOPICS[3], mqtt.QoS.AtMostOnce, (topic, payload) => {
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

// Handle WebSocket connections from frontend
wss.on('connection', (ws) => {
  console.log("Frontend connected via WebSocket");

  ws.on('message', (message) => {
    console.log("Message received from frontend:", message);

    // const parsedMessage = message.toString();

    // if (parsedMessage === 'start1') {
    //   // Publish 'start' to the 'pub/train1/simulate' topic
    //   connection.publish(PUBLISH_TOPICS[2], 'start', mqtt.QoS.AtMostOnce)
    //     .then(() => {
    //       console.log('Published "start" to MQTT topic: pub/simulate');
    //     })
    //     .catch((err) => {
    //       console.error('Failed to publish "start" to MQTT:', err);
    //     });
    // } else if (parsedMessage === 'start2') {
    //   // Publish 'start' to the 'pub/train2/simulate' topic
    //   connection.publish(PUBLISH_TOPICS[3], 'start', mqtt.QoS.AtMostOnce)
    //     .then(() => {
    //       console.log('Published "start" to MQTT topic: pub/simulate');
    //     })
    //     .catch((err) => {
    //       console.error('Failed to publish "start" to MQTT:', err);
    //     });
    // } else {
    //   connection.publish(PUBLISH_TOPICS[0], parsedMessage, mqtt.QoS.AtMostOnce)
    //     .then(() => {
    //       console.log("Published data to MQTT topic 'pub/init':", parsedMessage);
    //     })
    //     .catch(err => {
    //       console.error("Failed to publish to MQTT:", err);
    //     });
    // }

    try {
      // Attempt to parse the message as JSON (for seat data submissions)
      const parsedMessage = JSON.parse(message);

      // Handle seat data submission
      if (parsedMessage.trainId === '1') {
        connection.publish(PUBLISH_TOPICS[0], parsedMessage.filledSeats, mqtt.QoS.AtMostOnce) // pub/train1/init
          .then(() => {
            console.log("Published data to MQTT topic 'pub/train1/init':", parsedMessage.filledSeats);
          })
          .catch(err => {
            console.error("Failed to publish to MQTT:", err);
          });
      } else if (parsedMessage.trainId === '2') {
        connection.publish(PUBLISH_TOPICS[1], parsedMessage.filledSeats, mqtt.QoS.AtMostOnce) // pub/train2/init
          .then(() => {
            console.log("Published data to MQTT topic 'pub/train2/init':", parsedMessage.filledSeats);
          })
          .catch(err => {
            console.error("Failed to publish to MQTT:", err);
          });
      }

    } catch (error) {
      // If message is not JSON, handle it as a simple command like "start1" or "start2"
      if (message.toString() === 'start1') {
        connection.publish(PUBLISH_TOPICS[2], 'start', mqtt.QoS.AtMostOnce) // pub/train1/simulate
          .then(() => {
            console.log('Published "start" to MQTT topic: pub/train1/simulate');
          })
          .catch(err => {
            console.error('Failed to publish "start" to MQTT:', err);
          });
      } else if (message.toString() === 'start2') {
        connection.publish(PUBLISH_TOPICS[3], 'start', mqtt.QoS.AtMostOnce) // pub/train2/simulate
          .then(() => {
            console.log('Published "start" to MQTT topic: pub/train2/simulate');
          })
          .catch(err => {
            console.error('Failed to publish "start" to MQTT:', err);
          });
      } else {
        console.error("Unknown message format or command:", message);
      }
    }
  });

  ws.on('close', () => {
    console.log("Frontend disconnected");
  });
});
