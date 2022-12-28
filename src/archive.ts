import AdmZip from "adm-zip";
import { promises } from "fs-extra";
import path from "path";

import { isFileExists } from "./utils";

const archiveAsZip = async (filepath: string): Promise<string> => {
  const output = `${filepath}.zip`;
  const zip = new AdmZip();
  zip.addLocalFolder(filepath);

  return new Promise((resolve, reject) => {
    zip.writeZip(output, (err) => {
      if (err) return reject(err);
      return resolve(output);
    });
  });
};

const archive = async (args: {
  name: string;
  package: string;
  dist: string;
}): Promise<void> => {
  const isExistsPackage = await isFileExists(args.package);
  if (!isExistsPackage) {
    throw new Error("package.json is not exists");
  }

  const dirname = path.dirname(args.package);
  const vpmDist = path.join("Packages", args.name);

  await promises.cp(dirname, vpmDist, { recursive: true });

  const pkg = await archiveAsZip(vpmDist);
  await promises.copyFile(pkg, args.dist);
};

// eslint-disable-next-line import/prefer-default-export
export { archive };
