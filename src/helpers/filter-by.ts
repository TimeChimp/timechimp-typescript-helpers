export function filterBy<T>(list: T[], props: string[], query: string): T[] {
  if (!query) {
    return list;
  }

  return [...list].filter(item => {
    let match = false;
    props.forEach(prop => {
      if (
        (item as any)[prop] &&
        (item as any)[prop].toLowerCase().includes(query.toLowerCase())
      ) {
        match = true;
      }
    });
    return match;
  });
}
