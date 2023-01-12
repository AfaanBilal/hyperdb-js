HyperDB JS Client
=================

Author: **[Afaan Bilal](https://afaan.dev)**

## Introduction
**HyperDB JS** is a JavaScript client package for the [HyperDB server](https://github.com/AfaanBilal/hyperdb).

## Installation
````
npm i hyperdb-js
````

## Example usage
````js
import { HyperDB } from "hyperdb-js";

// Setup with address (default: http://localhost:8765)
const hyperdb = new HyperDB("http://localhost:8765");

// OR
// Setup with address and authentication
const hyperdb = new HyperDB("http://localhost:8765", "username", "password");

let r;

// Ping the server
r = await hyperdb.ping();
console.log(r); // true

// Get the version number
r = await hyperdb.version();
console.log(r); // "[HyperDB v0.1.0 (https://afaan.dev)]"

// Set a value
r = await hyperdb.set("test", "value");
console.log(r); // "value"

// Check if a key is present
r = await hyperdb.has("test");
console.log(r); // true

// Get a value
r = await hyperdb.get("test");
console.log(r); // "value"

// Get all stored data
r = await hyperdb.all();
console.log(r); // {test: "value"}

// Remove a key
r = await hyperdb.delete("test");
console.log(r); // true

// Delete all stored data
r = await hyperdb.clear();
console.log(r); // true

// Check if the store is empty
r = await hyperdb.empty();
console.log(r); // true

// Persist the store to disk
r = await hyperdb.save();
console.log(r); // true

// Reload the store from disk
r = await hyperdb.reload();
console.log(r); // true

// Delete all store data from memory and disk
r = await hyperdb.reset();
console.log(r); // true
````

## Contributing
All contributions are welcome. Please create an issue first for any feature request
or bug. Then fork the repository, create a branch and make any changes to fix the bug
or add the feature and create a pull request. That's it!
Thanks!

## License
**HyperDB JS** is released under the MIT License.
Check out the full license [here](LICENSE).
