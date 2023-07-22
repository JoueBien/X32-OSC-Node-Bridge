# X32 OSC Node Bridge

An electron framework to communicate with an X32. The project exists as a mono repo to provide a re-usable framework to many apps. Several apps live within the repo; currently this includes (or will include), X32 OSC WorkBench, MuteSync, MeterBridge and GetStarted.

The non-web libraries are now using the contextBridge which means the code base should somewhat be suitable for production builds.

# About the electron template used.

The code base is based on [Electron Forge](https://www.electronforge.io/guides/framework-integration/react-with-typescript).

Last installed with node `v18.17.0`. Requires python 3.6.0 and C/C++ compiler (Windows build tools or xCode) as there are packages that need to be recompiled with node-gyp. The project should auto compile native modules with the right headers when `npm install` is run.

Older revisions were based on [React-TypeScript-Electron sample with Create React App and Electron Builder](https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder). and ran with node `16.17.0`

# Install

You should be able to just install this project normally

```
npm install
```

then the project can be run in develop mode with

```
npm start
```

Note: if you are on Lunix or Raspberry Pi you will need to comment out `new MakerSquirrel({}),` in `forge.config.ts` to avoid the build hanging due to a bug where Electron Forge tries to load a Windows exe.

# Building

This project uses Electron Forge as a base and as such you should be able to build this project by following the [documentation](https://www.electronforge.io/guides/framework-integration/react-with-typescript).

# Known issues

### Resolved

- Calling Disconnect before Connect causes the mixers connection state to be corrupted. This issue was present on slower systems.

### Outstanding

- Building on Linux hangs due to trying to load a Windows Binary. (See Note in install instructions for a workaround).
- The app looses connection on subscriptions/messages when the app moves to the background.
- The question dialogue can crash the app due to a missing try/catch
- Versions older than [commit 0a7a558](https://github.com/JoueBien/X32-OSC-Node-Bridge/commit/0a7a5585a7015e15933ec6903eb830f2791deaec) will only run in node 16.
