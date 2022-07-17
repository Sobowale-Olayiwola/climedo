# Climedo IAM Service

## Task Description
In this test you need to implement the backend part of a web application for a simple identity
management system. The RESTful API routes that you will implement should enable a
imaginary frontend engineer to create at least the following functionality:
- register a new user with email and password
- sign the user in
- allow all users to edit their own credentials
- allow specific admin users to fetch and edit the details of all users
- sign the user out

## Notes

For the completion of this task please use the following frameworks
 - Backend: (ExpressJS, NodeJS, MongoDB) (latest stable versions)
 - Other: Feel free to use any existing open source npm packages
Each user profile should hold at least the following information of the user
- The email
- The password
- The full name
- The birthdate
- The time of his/her last login
Feel free to “read between the lines” and add any fields, collections or features
that you deem necessary
The API responses as well as the data sent to the API should be in JSON format
Session management must be handled using JWTs
Email confirmation or a password reset is not required
Provide comments and documentation as you see fit

## High Level System Design

The implementation of the task uses service oriented archictectural style whereby the business logic is centred in the service layers and every other external dependencies are completely isolated from the business layer.

### Endpoints
Baseurl: localhost:3000

**Create new user**
- POST baseurl/api/v1/users/signup

**Sample Payload**
```json
{
    "firstName": "Olayiwola",
    "lastName": "Sobowale",
    "email": "layi@gmail.com",
    "password": "Password@007",
    "role": "regular"
}
```

**Sample response**

```json
{
  "success": true,
  "payload": {
    "firstName": "Olayiwola",
    "lastName": "Sobowale",
    "email": "layitheinfotechguru@gmail.com",
    "password": "",
    "role": "regular",
    "_id": "62d42cec8673d2a646828189",
    "createdAt": "2022-07-17T15:38:20.908Z",
    "updatedAt": "2022-07-17T15:38:20.908Z",
    "__v": 0
  },
  "error": null,
  "responseType": "application/json",
  "sendRawResponse": false,
  "status": 201
}
```
**User Login**
- POST baseurl/api/v1/users/login

**Sample Payload**
```json
{
    "email": "node@yahoo.com",
    "password": "Password@007"
}
```

**Sample Response**
```json
{
  "success": true,
  "message": "successfully logged in",
  "payload": {
    "_id": "62d42b769151a4c25282baf1",
    "firstName": "Mike",
    "lastName": "John",
    "email": "node@yahoo.com",
    "role": "regular",
    "__v": 0,
    "createdAt": "2022-07-17T15:32:06.950Z",
    "updatedAt": "2022-07-17T15:32:33.905Z",
    "lastLogin": "2022-07-17T15:32:33.902Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDQyYjc2OTE1MWE0YzI1MjgyYmFmMSIsInJvbGUiOiJyZWd1bGFyIiwiaWF0IjoxNjU4MDcxOTUzLCJleHAiOjE2NTgwNzU1NTN9.OIr6cxp7c4i1Fv46tMxXJl2VR23fjnWvnz-PsaOF5JU"
  },
  "error": null,
  "responseType": "application/json",
  "sendRawResponse": false,
  "status": 200
}
```
**Get User By id**
- GET baseurl/api/v1/user/62d42b769151a4c25282baf1
    - Authorization Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDQyYjc2OTE1MWE0YzI1MjgyYmFmMSIsInJvbGUiOiJyZWd1bGFyIiwiaWF0IjoxNjU4MDcxOTUzLCJ
    leHAiOjE2NTgwNzU1NTN9.OIr6cxp7c4i1Fv46tMxXJl2VR23fjnWvnz-PsaOF5JU


**Sample Response**

```json
{
{
  "success": true,
  "message": "user found",
  "payload": {
    "_id": "62d42b769151a4c25282baf1",
    "firstName": "Mike",
    "lastName": "John",
    "email": "node@yahoo.com",
    "role": "regular",
    "__v": 0,
    "createdAt": "2022-07-17T15:32:06.950Z",
    "updatedAt": "2022-07-17T15:32:33.905Z",
    "lastLogin": "2022-07-17T15:32:33.902Z"
  },
  "error": null,
  "responseType": "application/json",
  "sendRawResponse": false,
  "status": 200
}
}
```
**Update User By id**
- PUT baseurl/api/v1/user/62d42b769151a4c25282baf1
    - Authorization Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDQyYjc2OTE1MWE0YzI1MjgyYmFmMSIsInJvbGUiOiJyZWd1bGFyIiwiaWF0IjoxNjU4MDcxOTUzLCJ
    leHAiOjE2NTgwNzU1NTN9.OIr6cxp7c4i1Fv46tMxXJl2VR23fjnWvnz-PsaOF5JU

**Sample Payload**
```json
{
    "role": "admin"
}
```
**Sample Response**
```json
{
  "success": true,
  "message": "User update succesful",
  "payload": {
    "_id": "62d42b769151a4c25282baf1",
    "firstName": "Mike",
    "lastName": "John",
    "email": "node@yahoo.com",
    "role": "admin",
    "__v": 0,
    "createdAt": "2022-07-17T15:32:06.950Z",
    "updatedAt": "2022-07-17T15:50:24.142Z",
    "lastLogin": "2022-07-17T15:32:33.902Z"
  },
  "error": null,
  "responseType": "application/json",
  "sendRawResponse": false,
  "status": 200
}
```
### HTTP Status Codes Used
- 200 OK
- 201 Created
- 401 Unauthorized
- 400 Bad Request
- 422 Unprocessable entity
- 500 Internal Server Error

## To run the application 
- sudo docker-compose up

## To rebuild after changes
- sudo docker-compose up --build

## To run all test with coverage 
- npm run test:coverage

## To run all test without coverage
- npm run test

The code has a coverage of 96.75%

## Personal Information
- Name: Olayiwola John Sobowale
- Email: layitheinfotechguru@gmail.com
- Position: Backend Developer (https://climedo.jobs.personio.de/job/419474?display=en)




