export class TimerHelper {
  static expiresTime() {
    return new Date(+new Date() + 5 * 60 * 1000);
  }
}
