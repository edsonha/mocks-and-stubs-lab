const processPayments = require("../src/main");
const mockQueue = require("../src/queueService");
const { makePayment, refundPayment } = require("../src/paymentService");

jest.mock("../src/queueService");
//alternatively, you can use
//mockQueue.generateQueue = jest.fn();
jest.mock("../src/paymentService");

beforeEach(() => {
  jest.resetAllMocks();
});

test("does not call makePayment or refundPayment when paymentQueue is empty", () => {
  mockQueue.mockReturnValue([]);
  processPayments();
  expect(makePayment).not.toHaveBeenCalled();
  expect(refundPayment).not.toHaveBeenCalled();
});

test("calls makePayment when next item in paymentQueue is zero or positive", () => {
  mockQueue.mockImplementation(() => [0, 1]);
  processPayments();
  expect(makePayment).toHaveBeenCalledTimes(2);
  expect(refundPayment).toHaveBeenCalledTimes(0);
  expect(makePayment).toHaveBeenCalledWith(0);
  expect(makePayment).toHaveBeenCalledWith(1);
});

test("calls refundPayment when next item in paymentQueue is negative", () => {
  mockQueue.mockImplementation(() => [-1, -2]);
  processPayments();
  expect(makePayment).toHaveBeenCalledTimes(0);
  expect(refundPayment).toHaveBeenCalledTimes(2);
  expect(refundPayment).toHaveBeenCalledWith(-1);
  expect(refundPayment).toHaveBeenCalledWith(-2);
});
