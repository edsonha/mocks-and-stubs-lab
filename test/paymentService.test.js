const { makePayment, refundPayment } = require("../src/paymentService");

test("should return `payment made for $1 for makePayment method with parameter of 1", () => {
  const result = makePayment(1);
  expect(result).toBe("payment made for $1");
});

test("should return `refund made for $1 for refundPayment method with parameter of 1", () => {
  const result = refundPayment(1);
  expect(result).toBe("refund made for $1");
});
