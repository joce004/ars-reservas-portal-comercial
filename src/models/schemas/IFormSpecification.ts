import { InputsType } from 'src/enums/Dictionary.enum';

export type IFieldSpecification = {
  label: string;
  GetType: InputsType;
  options?: ISelectOption[];
  rules?: Array<(val: string | number | undefined) => true | string>;
  style?: string;
  section?: string;
};

export type IFormSpecification<T> = { [Key in keyof T]: IFieldSpecification };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IFormGenerator<T> = (...args: any) => IForm<T>;

export type IForm<T> = {
  form: IFormSpecification<T>;
  sections: string[];
  files?: boolean;
  methods?: { [key: string]: () => void };
};

export type ISelectOption = {
  value?: string | number | null;
  text: string;
};
