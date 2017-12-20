The Module System
========

## Structure

Unsafe module is defined on a `unsafe` instance, in following structure:

```javascript
unsafe.module("module-name", ["dependency"], function(dep) {
    var the_actual_module_impl;

    return the_actual_module_impl
});
```

## Async module

## Add self-defined module loaders

TBD