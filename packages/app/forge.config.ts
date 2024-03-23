/*
 * --------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const config: ForgeConfig = {
  packagerConfig: {
    name: "Orbit Launcher",
    icon: "images/icon",
    asar: true,
    ignore: [
      "^/.git$",
      "^/.turbo$",
      "^/src$",
      "^/.eslintignore$",
      "^/.eslintrc$",
      "^/.gitignore$",
      "^/forge.config.ts$",
      "^/tsconfig.json$",
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32"],
      config: {},
    },
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: (arch) => ({
        author: "Vijay Meena",
        description: "Modern SA-MP launcher",
        iconUrl:
          "https://raw.githubusercontent.com/samarmeena/orbit/assets/icon.ico",
        setupIcon: "images/icon.ico",
      }),
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "samarmeena",
          name: "orbit",
        },
        prerelease: false,
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: true,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    packageAfterCopy: async (config, buildPath) => {
      console.log("Running npm install in the build path...");
      try {
        await execAsync(
          "npm i --omit=dev --no-cache --no-bin-links --no-package-lock --workspaces=false",
          {
            cwd: buildPath,
          },
        );
        console.log("npm install completed successfully.");
      } catch (error) {
        console.error("Error running npm install:", error.message);
        process.exit(1); // Exit the build process if npm install fails
      }
    },
  },
};

export default config;
