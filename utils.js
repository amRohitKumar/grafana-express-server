const heavyTask = async (waitDuration = 5000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const val = Math.random() * 100;
      if (val < 50) {
        return reject(new Error("Task failed"));
      } else {
        resolve(`Task completed after ${waitDuration}ms`);
      }
    }, waitDuration);
  });
};

module.exports = {
  heavyTask,
};
