# @natsuneko-laboratory/vpmpackage

Create a VPMPackage from Node.js, written in TypeScript. No platform dependency. No additional instructions.

## Requirements

- Node.js >= 16

## Install

```bash
$ yarn add @natsuneko-laboratory/vpmpackage
```

## Usage

```typescript
import { archive } from "@natsuneko-laboratory/vpmpackage";

await archive({
  name: "cat.natsuneko.asset-lens", // package name that archived as ...
  package: "Assets/NatsunekoLaboratory/AssetLens/package.json", // package.json path of VPM package
  dist: "./dist/package.zip", // output filename
});
```

## Development

```bash
# prepare
$ yarn install

# publish
$ npm publish --access public
```

## License

MIT by [@6jz](https://twitter.com/6jz)
