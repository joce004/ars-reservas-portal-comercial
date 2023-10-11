import { InputsType } from 'src/enums/Dictionary.enum';
import { ISelectOption } from './IFormSpecification';

export interface IColumn<T> {
  name: string | keyof T ;
  label: string;
  field:  string | ((row: T) => string | number );
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (a: unknown, b: unknown, rowA: unknown, rowB: unknown) => number;
  sortOrder?: 'ad' | 'da';
  format?: (val: string | number) => string;
  style?: string;
  classes?: string;
  headerStyle?: string;
  headerClasses?: string;
  filterable?: InputsType;
  options?: ISelectOption[];
  hide?: boolean
}
