export interface GenKeyOption {
  namespace?: string;
  separator?: string;
}

export function genKey(key: string, option: GenKeyOption = {}): string {
  const { namespace = "multimoment", separator = "." } = option;
  return [namespace, key].join(separator);
}
