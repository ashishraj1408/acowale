export const logInfo = (message: string) => {
  console.info(`[INFO] ${new Date().toISOString()} - ${message}`);
};

export const logError = (message: string) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
};
