export const common = {
  prettifyObjectKeys: <T>(obj: T): T => {
    return Object.keys(obj).reduce((acc, key) => {
      const prettifiedKey = key.replace(/^(.)|[\s_](.)/g, match => {
        return match[1] !== undefined
          ? match[1].toUpperCase()
          : match[0].toLowerCase();
      });

      return {
        ...acc,
        [prettifiedKey]: obj[key],
      };
    }, {}) as T;
  },
};
