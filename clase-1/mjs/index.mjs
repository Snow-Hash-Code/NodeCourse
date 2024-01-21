// .js -> por defecto utiliza Common JS
// .mjs -> para utlizar ES Modules
// .cjs -> para utilizar CommonJS

import { sum, sub, mult } from './sum.mjs'
console.log(sum(10, 5))
console.log(sub(10, 5))
console.log(mult(2, 5))