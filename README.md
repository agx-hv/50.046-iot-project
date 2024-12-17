# 50.046-iot-project

## Deploy Web App using Docker
requirement: docker-compose v2

```cd ./dashboard```
```sudo docker-compose build```
```sudo docker-compose up```

## Deploy CV

```sudo docker build --tag testcv .```
```sudo docker run testcv```

## Deploy RPi
This assumes that the Raspberry Pi and the ESP32 are all on the same LAN.
Change directory: ```cd rpi/train_mqtt```
Edit the ESP32 IP addresses according to DHCP server: ```vim src/main.rs```
Build Optimized Rust binary: ```cargo build --release``` or simply download binary from release
Copy binary to root of docker context: ```cp target/release/train-mqtt ./train```
Build docker image: ```sudo docker build --tag train .```
Run as train 1 or train 2: ```sudo docker run train 1``` or ```sudo docker run train 2```
