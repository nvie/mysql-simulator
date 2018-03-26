// @flow

export type Index<T> = { [string]: T };

export type Column = {
  name: string,
  type: string,
  nullable: boolean,
  defaultValue: string,
};

export type ForeignKey = {
  name: string | null,
  columns: Array<string>,
  reference: {
    table: string,
    columns: Array<string>,
  },
};

export type Table = {
  name: string,
  columns: Index<Column>,
  foreignKeys: Index<ForeignKey>,
};

export type Database = {
  tables: Index<Table>,
};
