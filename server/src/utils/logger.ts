const logger = (...message: string[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...message);
  }
};

export default logger;
