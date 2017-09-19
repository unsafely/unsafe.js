#!/bin/bash

mkdir -p dist

include() {
    cat src/$1 >> dist/unsafe.packed.js
    echo >> dist/unsafe.packed.js
}

> dist/unsafe.packed.js

include unsafe.js
include unsafe/loader.js
include unsafe/test.js

java -jar lib/*.jar dist/unsafe.packed.js -o dist/unsafe.min.js