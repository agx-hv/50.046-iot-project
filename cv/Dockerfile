FROM ubuntu
ADD subscriber.py /
ADD AmazonRootCA1.pem /
ADD device-certificate.pem.crt /
ADD private.pem.key /
RUN apt-get update
RUN apt-get install -y python3-opencv
RUN apt-get install -y python3-paho-mqtt 
CMD ["python3", "/subscriber.py"]
