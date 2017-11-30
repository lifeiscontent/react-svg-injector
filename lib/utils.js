export const typeOf = instance =>
  Object.prototype.toString.call(instance).replace(/\[object (.*)\]/, '$1');
