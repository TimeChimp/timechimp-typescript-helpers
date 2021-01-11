export function cloneObject(obj: any) {
  if (!obj) {
    return null;
  }

  return JSON.parse(JSON.stringify(obj));
}
