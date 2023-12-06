export class StringHelper {
  static regex(search: string): RegExp {
    const escapedSearch = escapeRegExp(search);

    const regexString = escapedSearch.replace(/[\W_]+/g, '\\W*');
    return new RegExp(regexString, 'i');
  }
}

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
