
# NodeJS Rate-Limited Parking slot server.
Note: I might have delayed in submmiting the assignment
as the email was in my promotional tab.

## Installation 
Install my-project with yarn. The following command will create node_modules and yarn.lock file.

```bash 
  yarn
```

The following command will start the dev server.
```bash
  yarn dev
```
    
## Running Tests
To run all the test cases, run the following command. Implemented test with Jest and Supertest.

```bash
  npm run test
```

  
## API Reference

#### Get a car info
```http
  GET /api/v1/car/:carNumber
```

#### Get a parking slot info
```http
  GET /api/v1/slot/:slotNumber
```

#### Park a car
```http
  POST /api/v1/car
```

Request Body
```json
  {
      "carNo": 4567
  }
```

#### Unpark a car
```http
  DELETE /api/v1/car/:carNumber
```
## Rate Limiter
I have never implemented rate limiter before. So, did some research for that.

Did not use any external package.

Initially I implemented the rate limiter with redis to store the request count value.

But then, as were the instructions not to use any kind of database. Removed the redis implementation and implemented it manually.

User can't request more than 10 times in 10 seconds.

# Thank You!