const math = require("mathjs");

const generateQueue = () => {
  const randomQueueLength = math.randomInt(1, 10);
  const queue = Array(randomQueueLength)
    .fill()
    .map(number => math.randomInt(-20, 50));
  return queue;
};

module.exports = generateQueue;
