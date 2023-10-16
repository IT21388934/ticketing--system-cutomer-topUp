const mongoose = require("mongoose");
const request = require("supertest");
describe("Customers API", () => {
  describe("GET /api/customers", () => {
    it("should get all customers", async () => {
      const response = await request(app).get("/api/customers");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/customers/:id", () => {
    it("should get a single customer by ID", async () => {
      const customerId = "your-customer-id"; // Replace with an actual customer ID

      const response = await request(app).get(`/api/customers/${customerId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Object);
    });

    it("should return an error for an invalid customer ID", async () => {
      const invalidCustomerId = "invalid-customer-id";

      const response = await request(app).get(
        `/api/customers/${invalidCustomerId}`
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
