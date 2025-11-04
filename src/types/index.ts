export type ColumnDef = {
  key: string;          // field key e.g., "name"
  label: string;        // display label
  visible: boolean;
};

export type Row = {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: any;
};
