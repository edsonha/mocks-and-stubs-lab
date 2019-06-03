const processPayments = require("../src/main");
const mockQueue = require("../src/queueService");
const { makePayment, refundPayment } = require("../src/paymentService");
// Not using destructure
// const mockPayment = require("../src/paymentService");
// const { makePayment, refundPayment } = mockPayment;

jest.mock("../src/queueService");
jest.mock("../src/paymentService");

beforeEach(() => {
  jest.resetAllMocks();
});

test("does not call makePayment or refundPayment when paymentQueue is empty", () => {
  mockQueue.mockImplementation(() => []);
  processPayments();
  expect(makePayment).toHaveBeenCalledTimes(0);
  expect(refundPayment).toHaveBeenCalledTimes(0);
});

test("calls makePayment when next item in paymentQueue is positive", () => {
  mockQueue.mockImplementation(() => [9]);
  processPayments();
  expect(makePayment).toHaveBeenCalledTimes(1);
  expect(refundPayment).toHaveBeenCalledTimes(0);
});

test("calls refundPayment when next item in paymentQueue is negative", () => {
  mockQueue.mockImplementation(() => [-9]);
  processPayments();
  expect(makePayment).toHaveBeenCalledTimes(0);
  expect(refundPayment).toHaveBeenCalledTimes(1);
});
