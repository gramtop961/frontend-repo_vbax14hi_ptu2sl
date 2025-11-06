export function parse(input) {
  const trimmed = input.trim();
  if (!trimmed) return { cmd: '', args: '' };
  const [first, ...rest] = trimmed.split(/\s+/);
  const args = trimmed.slice(first.length).trim();
  return { cmd: first.toLowerCase(), args };
}
