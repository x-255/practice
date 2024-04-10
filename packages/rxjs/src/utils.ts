export const log = <T>(tag: string | number) => (value: T) => {
  console.log(`${tag}====`, value);
  return value;
}