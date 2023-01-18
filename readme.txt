   __ __ ______  __     _   __ ___    __   __  __ ____
  / //_// __/\ \/ /____| | / // _ |  / /  / / / // __/
 / ,<  / _/   \  //___/| |/ // __ | / /__/ /_/ // _/  
/_/|_|/___/   /_/      |___//_/ |_|/____/\____//___/  


A simple CLI tool that can store and retrieve key-value pairs.


Installation:
Tool can be installed from the root folder with:

"sudo npm install --location=global"
or
"npm run install"

and this should allow the tool to be run from the command line by entering "key-value".
It may prompt you for your login password.


Usage:
put:
- accepts a key and a value, separated by a space
- only allows two arguments at a time

fetch:
- accepts a key
- will retrieve the value associated with the key if it exists
- only accepts one value at a time

exit:
- quits the program
- stored keys and values will be reset


Uninstallation:
Tool can be uninstalled from the root folder with:

"sudo npm uninstall --location=global"
or
"npm run uninstall"



Testing:
Tests can be run using:

"npm run test"



Thanks for checking out my command line tool!