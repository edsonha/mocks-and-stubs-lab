const mockQueue = require("../src/queueService");
const math = require("mathjs");

math.randomInt = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

it("should generate empty array given the parameter is 0", () => {
  math.randomInt.mockImplementation(() => 0);
  expect(mockQueue()).toEqual([]);
});

it("should generate three positive integers array given the parameter is 3 ", () => {
  math.randomInt.mockImplementation(() => 3);
  expect(mockQueue()).toEqual([3, 3, 3]);
});

it("should generate three negative integer array given the mockReturnValueOnce is 3 and mockReturnValue is -3", () => {
  math.randomInt.mockReturnValueOnce(3);
  math.randomInt.mockReturnValue(-3);
  expect(mockQueue()).toEqual([-3, -3, -3]);
});

it("should generate mixed positive and negative integer array", () => {
  math.randomInt.mockImplementationOnce(() => 4);
  math.randomInt.mockImplementationOnce(() => 3);
  math.randomInt.mockImplementationOnce(() => -2);
  math.randomInt.mockImplementationOnce(() => 4);
  math.randomInt.mockImplementation(() => -1);
  expect(mockQueue()).toEqual([3, -2, 4, -1]);
});
