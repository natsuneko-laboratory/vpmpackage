import { lstat, readdir } from "node:fs/promises";
import path from "node:path";

const isFileExists = async (filepath: string): Promise<boolean> => {
  try {
    return (await lstat(filepath)).isFile();
  } catch (e) {
    return false;
  }
};

const lsRecursive = async (dir: string): Promise<string[]> => {
  return await readdir(dir, { withFileTypes: true }).then((entries) => {
    const files = entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? lsRecursive(res) : [res];
    });

    return Array.prototype.concat(...files);
  });
};

// eslint-disable-next-line import-x/prefer-default-export
export { isFileExists, lsRecursive };
