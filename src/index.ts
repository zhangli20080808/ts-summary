let num3 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
let num4 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2);
console.log(num3 === num4); // true 包装之后 false

export {}