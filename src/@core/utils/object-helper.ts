export class ObjectHelper {
  static changeKey(obj: any, newKey: string, oldKey: string) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];

    return obj;
  }

  static arrayToObject<T extends Record<string, any>>(
    arr: T[],
  ): Record<string, T[keyof T]> {
    return arr.reduce((acc, item) => {
      Object.entries(item).forEach(([key, value]) => {
        acc[key] = value;
      });
      return acc;
    }, {});
  }
}
