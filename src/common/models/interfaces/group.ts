export interface IRowGroup<T> {
  label: any;
  value?: any;
  groups?: Array<IRowGroup<T>>;
  rows: T[];
}
