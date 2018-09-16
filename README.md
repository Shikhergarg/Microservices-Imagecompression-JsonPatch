# Microservices-Imagecompression-JsonPatch

One Paragraph of project description goes here

## Getting Started

My task was to build a simple stateless microservice in Nodejs, with three major functionalities -
1-Authentication
2-JSON patching
3-Image Thumbnail Generation

### Prerequisites

What things you need to install the software and how to install them

```
Node 8
Docker
```

### Running Locally

Make sure you have Node.js and docker installed
Running using docker
```
git clone
cd Microservices-Imagecompression-JsonPatch
cd auth_service
docker build -t shikhergarg/authservice .
docker images
docker run -p 3000:3000 -d shikhergarg/authservice
cd ..
cd image_service
docker build -t shikhergarg/imageservice .
docker images
docker run -p 8000:8000 -d shikhergarg/imageservice
cd ..
cd patch_service
docker build -t shikhergarg/patchservice .
docker images
docker run -p 8080:8080 -d shikhergarg/patchservice
```
Running without docker just on different ports
```
git clone
cd Microservices-Imagecompression-JsonPatch
cd auth_service
npm start
cd ..
cd image_service
npm start
cd ..
cd patch_service
npm start
```

auth_service now be running at localhost:3000
image_service now be running at localhost:8000
patch_service now be running at localhost:8080


End with an example of getting some data out of the system or using it for a little demo

## Running the tests
Run npm test in all the three service directories

