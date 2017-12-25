#!/bin/bash

mkdir -p dist

include() {
    cat src/$1 >> dist/unsafe.packed.js
    echo >> dist/unsafe.packed.js
}

> dist/unsafe.packed.js

include unsafe.js
include core/loader.js
include core/test.js
include core/assert.js
include core/utils.js
include core/collection.js
include core/fn.js
include browser/config.js
include browser/template.js

java -jar lib/*.jar dist/unsafe.packed.js -o dist/unsafe.min.js