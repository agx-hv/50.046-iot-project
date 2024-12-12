FROM debian
ADD train /
ADD AmazonRootCA1.pem /
ADD device-certificate.pem.crt /
ADD private.pem.key /
ENTRYPOINT ["/train"]
