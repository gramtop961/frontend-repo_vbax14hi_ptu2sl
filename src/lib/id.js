let seq = Date.now();
export function nextId(prefix = '') {
  seq += 1;
  return `${prefix}${seq}`;
}
