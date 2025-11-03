import path from "node:path";

import AdmZip from "adm-zip";
import { promises } from "fs-extra";

import { isFileExists, getDirectoryFiles } from "./utils";

const archiveAsZip = async (filepath: string): Promise<string> => {
  const output = `${filepath}.zip`;
  const zip = new AdmZip();
  const files = await getDirectoryFiles({ root: filepath });
  for (const file of files) {
    const relativePath = path.relative(filepath, file);
    zip.addLocalFile(file, path.dirname(relativePath));
  }

  return new Promise((resolve, reject) => {
    zip.writeZip(output, (err) => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      if (err) return reject(err);
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
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

const extract = async (args: {
  archive: string;
  dist: string;
}): Promise<void> => {
  const zip = new AdmZip(args.archive);
  zip.extractAllTo(args.dist, true);
};

export { archive, extract };
