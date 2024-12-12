import cv2
import base64
import numpy as np
import paho.mqtt.client as mqtt
import os
import ssl

# AWS IoT Endpoint
BROKER = "a2l6s1mki54p61-ats.iot.ap-southeast-1.amazonaws.com"
# BROKER = "a63zbtzd78225-ats.iot.ap-southeast-1.amazonaws.com"  # Ian's endpoint
PORT = 8883
CLIENT_ID = "led_detect"
INPUT_TOPIC1 = "video/frames/train1/car1"
INPUT_TOPIC2 = "video/frames/train1/car2"
INPUT_TOPIC3 = "video/frames/train2/car1"
INPUT_TOPIC4 = "video/frames/train2/car2"
OUTPUT_TOPIC1 = "video/train1/led_count1"
OUTPUT_TOPIC2 = "video/train1/led_count2"
OUTPUT_TOPIC3 = "video/train2/led_count1"
OUTPUT_TOPIC4 = "video/train2/led_count2"

current_dir = os.path.dirname(os.path.abspath(__file__))

# Paths to certificates and keys
CA_PATH = os.path.join(current_dir, "AmazonRootCA1.pem")
CERT_PATH = os.path.join(current_dir, "device-certificate.pem.crt")
KEY_PATH = os.path.join(current_dir, "private.pem.key")

# Decode base64 string to OpenCV image
def decode_frame(base64_string):
    decoded_data = base64.b64decode(base64_string)
    np_data = np.frombuffer(decoded_data, np.uint8)
    return cv2.imdecode(np_data, cv2.IMREAD_COLOR)

# Detect LEDs in the image
def detect_leds(frame):
    # Convert the frame to HSV color space
    hsv_img = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # HSV range for detecting our red LEDs
    lower_limit = np.array([0, 50, 160]) 
    upper_limit = np.array([180, 255, 255])
    mask = cv2.inRange(hsv_img, lower_limit, upper_limit)

    # Find contours of detected LEDs
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    led_count = 0
    for contour in contours:
        _, radius = cv2.minEnclosingCircle(contour)
        # print(radius)
        
        min_radius = 5
        max_radius = 10

        if min_radius < radius < max_radius:  
            rect = cv2.minAreaRect(contour)
            box = cv2.boxPoints(rect)
            box = np.int0(box)
            cv2.drawContours(frame, [box], 0, (0,255,0), 2)
            led_count += 1

    return led_count

# MQTT Callbacks
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    if rc == 0:
        client.subscribe(INPUT_TOPIC1)
        client.subscribe(INPUT_TOPIC2)
        client.subscribe(INPUT_TOPIC3)
        client.subscribe(INPUT_TOPIC4)
        print(f"Subscribed to topic: {INPUT_TOPIC1}")
        print(f"Subscribed to topic: {INPUT_TOPIC2}")
        print(f"Subscribed to topic: {INPUT_TOPIC3}")
        print(f"Subscribed to topic: {INPUT_TOPIC4}")


def on_message(client, userdata, msg):
    print(f"Received message on topic: {msg.topic}")
    try:
        # Decode base64 and process the frame
        frame_original = decode_frame(msg.payload.decode('utf-8'))

        # Crop the frame to the focus on LEDs
        if msg.topic == INPUT_TOPIC1:
            frame = frame_original[0:120, 48:87]
        elif msg.topic == INPUT_TOPIC2:
            frame = frame_original[0:120, 50:90]
        elif msg.topic == INPUT_TOPIC3:
            frame = frame_original[0:120, 48:87]
        elif msg.topic == INPUT_TOPIC4:
            frame = frame_original[0:120, 45:85]

        led_count = detect_leds(frame)
        if led_count > 8:   
            led_count = 8
        print(f"Detected {led_count} LEDs")

        # publish LED count
        if msg.topic == INPUT_TOPIC1:
            output_topic = OUTPUT_TOPIC1
            # cv2.imshow("train1_original", frame_original)
            cv2.imshow("train1", frame)
        elif msg.topic == INPUT_TOPIC2:
            output_topic = OUTPUT_TOPIC2
            # cv2.imshow("train2_original", frame_original)
            cv2.imshow("train2", frame)
        elif msg.topic == INPUT_TOPIC3:
            output_topic = OUTPUT_TOPIC3
            # cv2.imshow("train3_original", frame_original)
            cv2.imshow("train3", frame)
        elif msg.topic == INPUT_TOPIC4:
            output_topic = OUTPUT_TOPIC4
            cv2.imshow("train4", frame)

        # cv2.imshow("frame", frame)
        cv2.waitKey(1)

        client.publish(output_topic, led_count)
        print(f"Published LED count: {led_count}")

    except Exception as e:
        print(f"Error processing message: {e}")


def main():
    client = mqtt.Client(CLIENT_ID)
    client.tls_set(ca_certs=CA_PATH, certfile=CERT_PATH, keyfile=KEY_PATH, tls_version=ssl.PROTOCOL_TLSv1_2)
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(BROKER, PORT)
    client.loop_forever()


if __name__ == "__main__":
    main()