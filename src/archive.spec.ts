import { beforeEach, describe, expect, it } from "vitest";
import { dirname, join } from "node:path";
import { archive } from "./archive";
import {
  createTempDirectory,
  getDirectories,
  getDirectoryFiles,
  isDirectoryExists,
  isFileExists,
} from "./utils";
import { afterEach } from "node:test";
import AdmZip from "adm-zip";

const context = describe;

describe("archive", () => {
  type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;

  let temp: UnwrapPromise<ReturnType<typeof createTempDirectory>>;

  const extract = async (path: string): Promise<string> => {
    const zip = new AdmZip(path);
    zip.extractAllTo(temp.path, true);

    return dirname(path);
  };

  const verify = async (root: string, contents: string[]): Promise<void> => {
    const dirs = await getDirectoryFiles({ root });
    expect(dirs.length).toBe(contents.length);

    for (const content of contents) {
      const path = join(root, content);
      const exists =
        (await isDirectoryExists(path)) || (await isFileExists(path));
      expect(exists).toBe(true);
    }
  };

  beforeEach(async () => {
    temp = await createTempDirectory();
  });

  context("with nested items", () => {
    context("transform", () => {
      it("successful archived with valid structure", async () => {
        const path = join(temp.path, "test1.zip");

        await archive({
          package: "src/fixtures/Assets/package.json",
          name: "cat.natsuneko.test1",
          dist: path,
        });

        const root = await extract(path);
        await verify(root, [
          "MonoBehaviourAsset.cs",
          "MonoBehaviourAsset.cs.meta",
          "package.json",
          "package.json.meta",
          "test1.zip", // TOOD: ignored
          "FolderAsset.meta",
          "FolderAsset/OtherMonoBehaviourAsset.cs",
          "FolderAsset/OtherMonoBehaviourAsset.cs.meta",
        ]);
      });
    });
  });

  afterEach(async () => {
    await temp.dispose();
  });
});
