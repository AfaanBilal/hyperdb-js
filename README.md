HyperDB JS Client
=================

Author: **[Afaan Bilal](https://afaan.dev)**

## Introduction
**HyperDB JS** is a JavaScript client package for the [HyperDB server](https://github.com/AfaanBilal/hyperdb).

## Installation
````
$ npm i hyperdb-js
````

## Example usage
````ts
import HyperDB from "hyperdb-js";

// Setup with address (default: http://localhost:8765)
const hyperdb = new HyperDB("http://localhost:8765");

// Ping the server
hyperdb.ping(); // true

// Get the version number
hyperdb.version(); // "[HyperDB v0.1.0 (https://afaan.dev)]"

// Set a value
hyperdb.set("test", "value");

// Check if a key is present
hyperdb.has("test"); // true

// Get a value
hyperdb.get("test"); // "value"

// Get all stored data
hyperdb.all(); // {"test": "value"}

// Remove a key
hyperdb.delete("test"); // true

// Delete all stored data
hyperdb.clear(); // true

// Check if the store is empty
hyperdb.empty(); // true

// Persist the store to disk
hyperdb.save(); // true

// Reload the store from disk
hyperdb.reload(); // true

// Delete all store data from memory and disk
hyperdb.reset(); // true
````

## Contributing
All contributions are welcome. Please create an issue first for any feature request
or bug. Then fork the repository, create a branch and make any changes to fix the bug
or add the feature and create a pull request. That's it!
Thanks!

## License
**HyperDB JS** is released under the MIT License.
Check out the full license [here](LICENSE).
