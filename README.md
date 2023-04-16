## Installation

## Development
`node v19.8.1` is required.

## Dependancies

```
npm install electron --save-dev
```

Electron must be installed in `devDependencies` otherwise it will throw errors.

## Build

### Package for Windows

```
electron-packager . translator --platform=win32 --arch=x64 --overwrite --electron-version=24.0.0
```

### Package for Mac

```
```