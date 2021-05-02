const request = require("supertest");
const app = require("../app");

describe("Park Car", () => {
  it("should add car to an empty slot", async () => {
    const res = await request(app)
      .post("/v1/api/car")
      .send({
        carNo: 4567
      });
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("carNo");
  })
});

describe("Check park Car validation error", () => {
  it("should raise validation error if carNo is not provided", async () => {
    const res = await request(app)
      .post("/v1/api/car")
      .send({
        carNo: ""
      });

    expect(res.status).toEqual(422);
    expect(res.body.error.message).toEqual("Car number is required!");
  })
});

describe("Check if car is already parked", () => {
  it("should raise forbidden error if car is already parked", async () => {
    const res = await request(app)
      .post("/v1/api/car")
      .send({
        carNo: 4567
      });

    expect(res.status).toEqual(403);
    expect(res.body.error.message).toEqual("This car is already parked.");
  })
});

describe("get car info", () => {
  it("should return the car info", async () => {
    const res = await request(app)
      .get("/v1/api/car/4567");

    expect(res.status).toEqual(200);
    expect(res.body.slotNo).toEqual(1);
  })
})

describe("get slot info", () => {
  it("should return the slot info", async () => {
    const res = await request(app)
      .get("/v1/api/slot/1");

    expect(res.status).toEqual(200);
    expect(res.body.carNo).toEqual(4567);
  })
})

describe("Unpark the car", () => {
  it("should remove the car from slot", async () => {
    const res = await request(app)
      .delete("/v1/api/car/4567");

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Unparked car 4567. Slot 1 is now available for parking.");
  })
})