"""
--------------------------------------------------------------------------------------------------------
Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
Licensed under the Apache License. See License.txt in the project root for license information.
--------------------------------------------------------------------------------------------------------
"""

import os  # Importing the os module for operating system-related functions
import shutil  # Importing the shutil module for high-level file operations
import subprocess
import sys  # Importing the subprocess module to spawn new processes

# Check if --release flag is provided
release_flag_present = "--release" in sys.argv

# Getting the current working directory of the script
working_directory = os.path.dirname(os.path.realpath(__file__))

# Defining directories for spoofer and app packages
app_directory = os.path.join(working_directory, "packages", "app")

# Running npm install and npm run build for the project
subprocess.run("npm install --no-cache", shell=True, check=True)
subprocess.run("npm run build", shell=True, check=True)

# Copying the contents of the 'out' directory to the 'web' directory in the app package
web_out = "./packages/app/web"
shutil.rmtree(web_out, ignore_errors=True)
shutil.copytree(src=f"./packages/ui/out", dst=web_out)

# Setting the working directory to the app directory
os.chdir(app_directory)

# Building the package and making it using npm commands
if release_flag_present:
    subprocess.run("npm run publish", shell=True, check=True)
else:
    subprocess.run("npm run package", shell=True, check=True)
    subprocess.run("npm run make", shell=True, check=True)
