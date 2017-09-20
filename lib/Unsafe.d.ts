
export var unsafe: Unsafe;

interface Module {
    constructor: (...args) => any
    denpendencies: string[]
    instance?: any
}

interface Extension {
}

type Loader = (name: string, module?: Module) => Module

declare class Unsafe {
    module(name: string): Module
    module(name: string, func: (...module: Module[]) => Module): Module
    module(name: string, deps: string[], func: (...module: Module[]) => Module): Module
    ext(name: string, fn: (unsafe?: Unsafe, ext?: Extension) => Extension)
    resetLoader(loaderCreator: (Loader) => Loader)
}