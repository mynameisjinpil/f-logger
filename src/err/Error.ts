export default class LoggerError extends Error {
  diskNotConfigured(action: string) {
    this.message = `${action} err: Disk not configuration`;
  }

  needPrefix() {
    this.message =
      'Prefix for storage key did not configured: When use storage must need prefix';
  }
}
