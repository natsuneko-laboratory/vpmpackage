import { promises } from "node:fs";

const isFileExists = async (filepath: string): Promise<boolean> => {
  try {
    return (await promises.lstat(filepath)).isFile();
  } catch (e) {
    return false;
  }
};

// eslint-disable-next-line import-x/prefer-default-export
export { isFileExists };
