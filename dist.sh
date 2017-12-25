#!/bin/bash

mkdir -p dist

die() {
    echo $1
    exit -1
}

include() {
    [ -e src/$1 ] || die "Unknown module [$1]"
    echo "/* Module $1 */" >> dist/unsafe.packed.js
    cat src/$1 >> dist/unsafe.packed.js
    echo >> dist/unsafe.packed.js
}

> dist/unsafe.packed.js

include unsafe.js # core 
include core/loader.js 
include core/test.js
include core/assert.js
include core/utils.js
include core/collection.js
include core/fn.js # << utils
include browser/config.js
include browser/element.js # << browser-config

java -jar lib/*.jar dist/unsafe.packed.js -o dist/unsafe.min.js