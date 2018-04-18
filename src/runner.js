// @flow

import chalk from 'chalk';
import { sortBy } from 'lodash';

// $FlowFixMe
import ast from '../ast.json';
import {
  addColumn,
  addTable,
  emptyDb,
  removeColumn,
  removeTable,
  renameTable,
  replaceColumn,
} from './db';
import type { Column, Database, Table } from './types';

// eslint-disable-next-line no-console
const log = console.log;
// eslint-disable-next-line no-console
const error = console.error;

function makeColumn(colName, def): Column {
  return {
    name: colName,
    type: def.dataType,
    nullable: def.nullable,
    defaultValue: def.defaultValue,
    autoIncrement: def.autoIncrement,
  };
}

function makeTable(table): Table {
  const columns = table.definitions.filter(def => def.type === 'COLUMN');
  const foreignKeys = table.definitions.filter(
    def => def.type === 'FOREIGN KEY',
  );
  return {
    name: table.tblName,
    columns: columns.map(def => makeColumn(def.colName, def.definition)),
    foreignKeys: foreignKeys.map(fk => {
      const columns = fk.indexColNames.map(def => def.colName);
      const reference = {
        table: fk.reference.tblName,
        columns: fk.reference.indexColNames.map(def => def.colName),
      };
      return {
        name: fk.name,
        columns,
        reference,
      };
    }),
  };
}

function printDb(db: Database) {
  for (const tableName of sortBy(Object.keys(db.tables))) {
    const table = db.tables[tableName];
    log('');
    log(chalk.blue(`${table.name}`));
    log(chalk.blue('-'.repeat(table.name.length)));
    for (const name of sortBy(Object.keys(table.columns))) {
      const col = table.columns[name];
      log(`  ${chalk.magenta(col.name)} ${chalk.gray(col.type)}`);
    }
    for (const name of sortBy(Object.keys(table.foreignKeys))) {
      const fk = table.foreignKeys[name];
      log(
        chalk.yellow(
          `  ${fk.name || '(unnamed)'}: ${fk.columns.join(', ')} => ${
            fk.reference.table
          } (${fk.reference.columns.join(', ')})`,
        ),
      );
    }
  }
}

function escape(s: string): string {
  return `\`${s.replace('`', '\\`')}\``;
}

function columnDefinition(col: Column) {
  return [
    escape(col.name),
    col.type.toLowerCase(),
    col.nullable ? 'NULL' : 'NOT NULL',
    col.defaultValue ? `DEFAULT ${col.defaultValue}` : '',
    col.autoIncrement ? 'AUTO_INCREMENT' : '',
  ]
    .filter(x => x)
    .join(' ');
}

function dumpTable(table: Table) {
  log(chalk.blue(`CREATE TABLE \`${table.name}\` (`));
  for (const col of table.columns) {
    log(chalk.yellow(`  ${columnDefinition(col)},`));
  }
  log(chalk.blue(`)`));
  // log(chalk.blue('-'.repeat(table.name.length)));
  // for (const name of sortBy(Object.keys(table.columns))) {
  //   const col = table.columns[name];
  //   log(`  ${chalk.magenta(col.name)} ${chalk.gray(col.type)}`);
  // }
  // for (const name of sortBy(Object.keys(table.foreignKeys))) {
  //   const fk = table.foreignKeys[name];
  //   log(
  //     chalk.yellow(
  //       `  ${fk.name || '(unnamed)'}: ${fk.columns.join(', ')} => ${
  //         fk.reference.table
  //       } (${fk.reference.columns.join(', ')})`,
  //     ),
  //   );
  // }
}

function main() {
  let db: Database = emptyDb();

  for (const expr of ast) {
    if (expr === null) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (expr.type === 'CREATE TABLE') {
      const table = makeTable(expr);
      db = addTable(db, table);
      // log(chalk.green(`CREATE TABLE ${expr.tblName}`));
    } else if (expr.type === 'CREATE TABLE LIKE') {
      const oldTable = db.tables[expr.oldTblName];
      const newTable = { ...oldTable, name: expr.tblName };
      db = addTable(db, newTable);
    } else if (expr.type === 'DROP TABLE') {
      db = removeTable(db, expr.tblName, expr.ifExists);
    } else if (expr.type === 'ALTER TABLE') {
      for (const change of expr.changes) {
        if (change.type === 'RENAME TABLE') {
          db = renameTable(db, expr.tblName, change.newTblName);
        } else if (change.type === 'ADD COLUMN') {
          const column = makeColumn(change.colName, change.definition);
          db = addColumn(db, expr.tblName, column);
        } else if (change.type === 'CHANGE COLUMN') {
          const column = makeColumn(change.newColName, change.definition);
          db = replaceColumn(db, expr.tblName, change.oldColName, column);
        } else if (change.type === 'DROP COLUMN') {
          db = removeColumn(db, expr.tblName, change.colName);
        } else {
          error(
            chalk.yellow(`Unknown change type: ${change.type}`),
            chalk.gray(JSON.stringify(change, null, 2)),
          );
        }
      }
    } else if (expr.type === 'RENAME TABLE') {
      db = renameTable(db, expr.tblName, expr.newName);
    } else {
      error(chalk.yellow(`Unknown expression type: ${expr.type}`));
    }
  }

  // log('');
  // log('Done!');
  // printDb(db);
  dumpTable(db.tables.users);
}

main();
