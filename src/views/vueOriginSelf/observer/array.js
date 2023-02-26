const arrayProto = Array.prototype;

export const arrayMethods = Object.create(arrayProto);
["push", "splice", "reverse", "pop", "unshift", "shift", "sort"].forEach(
  (method) => {
    const original = arrayProto[method];
    Object.defineProperty(arrayMethods, method, {
      value: function mutator(...args) {
        return original.apply(this, args);
      },
      enumerable: false,
      writable: true,
      configurable: true,
    });
  }
);
