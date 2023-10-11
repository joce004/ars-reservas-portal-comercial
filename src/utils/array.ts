import { ISelectOption } from 'src/models/schemas/IFormSpecification';

export function removeDuplicates<T extends number | string>(
  value: T | null | undefined,
  index: number,
  self: Array<T | null | undefined>
) {
  return self.indexOf(value) === index && value !== undefined && value !== null;
}

export const getSelectList = (object: Record<string, string | number>) =>
  Object.keys(object).map((x) => ({ text: x, value: object[x] }));

export const mapSelectList: (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: Record<string, any>[],
  textProp: string,
  valueProp: string
) => ISelectOption[] = (object, textProp, valueProp) => {
  return (
    (Array.isArray(object) &&
      object.map((x) => ({
        text: x[textProp] as string,
        value: x[valueProp],
      }))) ||
    []
  );
};

export const sortObjectArray = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: T[],
  orderByProp: keyof T
) => {
  const result = items.sort((a, b) => {
    const propA = a[orderByProp]; // ignore upper and lowercase
    const propB = b[orderByProp]; // ignore upper and lowercase

    if (typeof propA == 'string' && typeof propB == 'string') {
      if (propA.toUpperCase() < propB.toUpperCase()) {
        return -1;
      }
      if (propA.toUpperCase() > propB.toUpperCase()) {
        return 1;
      }
    }

    if (propA < propB) {
      return -1;
    }
    if (propA > propB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return result;
};
