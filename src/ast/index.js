// @flow strict

/**
 * This file is AUTOMATICALLY GENERATED.
 * DO NOT edit this file manually.
 *
 * Instead, update the `*.grammar` file, and re-run `generate-ast`
 */

import invariant from 'invariant';

import type { Encoding } from './encodings';
import type { Precision } from './types';

export type UnaryOp = '+' | '-' | '!' | 'is null' | 'is not null';

type BooleanOp = 'AND' | 'OR' | 'XOR';
type CmpOp = '=' | '<=>' | '!=' | '<>' | '>=' | '<=' | '<' | '>' | 'LIKE' | 'REGEXP' | 'RLIKE';
type ArithmOp = '+' | '-' | '*' | '/' | '%' | 'DIV';
export type BinaryOp = BooleanOp | CmpOp | ArithmOp;

export type GeneratedColumnMode = 'STORED' | 'VIRTUAL';

function isBytes(node: Node): boolean %checks {
  return (
    node._kind === 'Blob' ||
    node._kind === 'Binary' ||
    node._kind === 'VarBinary' ||
    node._kind === 'TinyBlob' ||
    node._kind === 'MediumBlob' ||
    node._kind === 'LongBlob'
  );
}

function isDataType(node: Node): boolean %checks {
  return (
    node._kind === 'Enum' ||
    node._kind === 'Json' ||
    isNumeric(node) ||
    isTemporal(node) ||
    isTextual(node) ||
    isBytes(node)
  );
}

function isDefaultValue(node: Node): boolean %checks {
  return node._kind === 'Literal' || node._kind === 'CurrentTimestamp';
}

function isExpression(node: Node): boolean %checks {
  return (
    node._kind === 'Literal' ||
    node._kind === 'Identifier' ||
    node._kind === 'UnaryExpression' ||
    node._kind === 'BinaryExpression' ||
    node._kind === 'CallExpression'
  );
}

function isInteger(node: Node): boolean %checks {
  return (
    node._kind === 'TinyInt' ||
    node._kind === 'MediumInt' ||
    node._kind === 'SmallInt' ||
    node._kind === 'Int' ||
    node._kind === 'BigInt'
  );
}

function isNumeric(node: Node): boolean %checks {
  return isInteger(node) || isReal(node);
}

function isReal(node: Node): boolean %checks {
  return node._kind === 'Decimal' || node._kind === 'Float' || node._kind === 'Double';
}

function isStart(node: Node): boolean %checks {
  return node._kind === 'GeneratedDefinition' || isExpression(node);
}

function isTemporal(node: Node): boolean %checks {
  return (
    node._kind === 'DateTime' ||
    node._kind === 'Timestamp' ||
    node._kind === 'Date' ||
    node._kind === 'Year' ||
    node._kind === 'Time'
  );
}

function isTextual(node: Node): boolean %checks {
  return (
    node._kind === 'Char' ||
    node._kind === 'VarChar' ||
    node._kind === 'Text' ||
    node._kind === 'MediumText' ||
    node._kind === 'LongText'
  );
}

function isTextualOrEnum(node: Node): boolean %checks {
  return node._kind === 'Enum' || isTextual(node);
}

export type Bytes = Blob | Binary | VarBinary | TinyBlob | MediumBlob | LongBlob;

export type DataType = Numeric | Temporal | Textual | Enum | Bytes | Json;

export type DefaultValue = Literal | CurrentTimestamp;

export type Expression = Literal | Identifier | UnaryExpression | BinaryExpression | CallExpression;

export type Integer = TinyInt | MediumInt | SmallInt | Int | BigInt;

export type Numeric = Integer | Real;

export type Real = Decimal | Float | Double;

export type Start = Expression | GeneratedDefinition;

export type Temporal = DateTime | Timestamp | Date | Year | Time;

export type Textual = Char | VarChar | Text | MediumText | LongText;

export type TextualOrEnum = Textual | Enum;

export type Node =
  | BigInt
  | Binary
  | BinaryExpression
  | Blob
  | BuiltInFunction
  | CallExpression
  | Char
  | CurrentTimestamp
  | Date
  | DateTime
  | Decimal
  | Double
  | Enum
  | Float
  | GeneratedDefinition
  | Identifier
  | Int
  | Json
  | Literal
  | LongBlob
  | LongText
  | MediumBlob
  | MediumInt
  | MediumText
  | SmallInt
  | Text
  | Time
  | Timestamp
  | TinyBlob
  | TinyInt
  | UnaryExpression
  | VarBinary
  | VarChar
  | Year;

function isNode(node: Node): boolean %checks {
  return (
    node._kind === 'BigInt' ||
    node._kind === 'Binary' ||
    node._kind === 'BinaryExpression' ||
    node._kind === 'Blob' ||
    node._kind === 'BuiltInFunction' ||
    node._kind === 'CallExpression' ||
    node._kind === 'Char' ||
    node._kind === 'CurrentTimestamp' ||
    node._kind === 'Date' ||
    node._kind === 'DateTime' ||
    node._kind === 'Decimal' ||
    node._kind === 'Double' ||
    node._kind === 'Enum' ||
    node._kind === 'Float' ||
    node._kind === 'GeneratedDefinition' ||
    node._kind === 'Identifier' ||
    node._kind === 'Int' ||
    node._kind === 'Json' ||
    node._kind === 'Literal' ||
    node._kind === 'LongBlob' ||
    node._kind === 'LongText' ||
    node._kind === 'MediumBlob' ||
    node._kind === 'MediumInt' ||
    node._kind === 'MediumText' ||
    node._kind === 'SmallInt' ||
    node._kind === 'Text' ||
    node._kind === 'Time' ||
    node._kind === 'Timestamp' ||
    node._kind === 'TinyBlob' ||
    node._kind === 'TinyInt' ||
    node._kind === 'UnaryExpression' ||
    node._kind === 'VarBinary' ||
    node._kind === 'VarChar' ||
    node._kind === 'Year'
  );
}

export type BigInt = {|
  _kind: 'BigInt',
  baseType: 'bigint',
  length: number,
  unsigned: boolean,
|};

export type Binary = {|
  _kind: 'Binary',
  baseType: 'binary',
  length: number,
|};

export type BinaryExpression = {|
  _kind: 'BinaryExpression',
  type: 'binary',
  op: BinaryOp,
  expr1: Expression,
  expr2: Expression,
|};

export type Blob = {|
  _kind: 'Blob',
  baseType: 'blob',
  length: number,
|};

export type BuiltInFunction = {|
  _kind: 'BuiltInFunction',
  type: 'builtinFunction',
  name: string,
|};

export type CallExpression = {|
  _kind: 'CallExpression',
  type: 'callExpression',
  callee: BuiltInFunction,
  args: Array<Expression> | null,
|};

export type Char = {|
  _kind: 'Char',
  baseType: 'char',
  length: number,
  encoding: Encoding | null,
|};

export type CurrentTimestamp = {|
  _kind: 'CurrentTimestamp',
  precision: number | null,
|};

export type Date = {|
  _kind: 'Date',
  baseType: 'date',
|};

export type DateTime = {|
  _kind: 'DateTime',
  baseType: 'datetime',
  fsp: number | null,
|};

export type Decimal = {|
  _kind: 'Decimal',
  baseType: 'decimal',
  precision: Precision | null,
  unsigned: boolean,
|};

export type Double = {|
  _kind: 'Double',
  baseType: 'double',
  precision: Precision | null,
  unsigned: boolean,
|};

export type Enum = {|
  _kind: 'Enum',
  baseType: 'enum',
  values: Array<string>,
  encoding: Encoding | null,
|};

export type Float = {|
  _kind: 'Float',
  baseType: 'float',
  precision: Precision | null,
  unsigned: boolean,
|};

export type GeneratedDefinition = {|
  _kind: 'GeneratedDefinition',
  type: 'generated',
  expr: Expression,
  mode: GeneratedColumnMode,
|};

export type Identifier = {|
  _kind: 'Identifier',
  type: 'identifier',
  name: string,
|};

export type Int = {|
  _kind: 'Int',
  baseType: 'int',
  length: number,
  unsigned: boolean,
|};

export type Json = {|
  _kind: 'Json',
  baseType: 'json',
|};

export type Literal = {|
  _kind: 'Literal',
  type: 'literal',
  value: mixed,
|};

export type LongBlob = {|
  _kind: 'LongBlob',
  baseType: 'longblob',
|};

export type LongText = {|
  _kind: 'LongText',
  baseType: 'longtext',
  encoding: Encoding | null,
|};

export type MediumBlob = {|
  _kind: 'MediumBlob',
  baseType: 'mediumblob',
|};

export type MediumInt = {|
  _kind: 'MediumInt',
  baseType: 'mediumint',
  length: number,
  unsigned: boolean,
|};

export type MediumText = {|
  _kind: 'MediumText',
  baseType: 'mediumtext',
  encoding: Encoding | null,
|};

export type SmallInt = {|
  _kind: 'SmallInt',
  baseType: 'smallint',
  length: number,
  unsigned: boolean,
|};

export type Text = {|
  _kind: 'Text',
  baseType: 'text',
  encoding: Encoding | null,
|};

export type Time = {|
  _kind: 'Time',
  baseType: 'time',
|};

export type Timestamp = {|
  _kind: 'Timestamp',
  baseType: 'timestamp',
  fsp: number | null,
|};

export type TinyBlob = {|
  _kind: 'TinyBlob',
  baseType: 'tinyblob',
|};

export type TinyInt = {|
  _kind: 'TinyInt',
  baseType: 'tinyint',
  length: number,
  unsigned: boolean,
|};

export type UnaryExpression = {|
  _kind: 'UnaryExpression',
  type: 'unary',
  op: UnaryOp,
  expr: Expression,
|};

export type VarBinary = {|
  _kind: 'VarBinary',
  baseType: 'varbinary',
  length: number,
|};

export type VarChar = {|
  _kind: 'VarChar',
  baseType: 'varchar',
  length: number,
  encoding: Encoding | null,
|};

export type Year = {|
  _kind: 'Year',
  baseType: 'year',
|};

export default {
  BigInt(length: number, unsigned: boolean): BigInt {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "BigInt" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "BigInt" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'BigInt',
      baseType: 'bigint',
      length,
      unsigned,
    };
  },

  Binary(length: number): Binary {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "Binary" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    return {
      _kind: 'Binary',
      baseType: 'binary',
      length,
    };
  },

  BinaryExpression(op: BinaryOp, expr1: Expression, expr2: Expression): BinaryExpression {
    invariant(
      isExpression(expr1),
      `Invalid value for "expr1" arg in "BinaryExpression" call.\nExpected: @Expression\nGot:      ${JSON.stringify(
        expr1,
      )}`,
    );

    invariant(
      isExpression(expr2),
      `Invalid value for "expr2" arg in "BinaryExpression" call.\nExpected: @Expression\nGot:      ${JSON.stringify(
        expr2,
      )}`,
    );

    return {
      _kind: 'BinaryExpression',
      type: 'binary',
      op,
      expr1,
      expr2,
    };
  },

  Blob(length: number): Blob {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "Blob" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    return {
      _kind: 'Blob',
      baseType: 'blob',
      length,
    };
  },

  BuiltInFunction(name: string): BuiltInFunction {
    invariant(
      typeof name === 'string',
      `Invalid value for "name" arg in "BuiltInFunction" call.\nExpected: string\nGot:      ${JSON.stringify(name)}`,
    );

    return {
      _kind: 'BuiltInFunction',
      type: 'builtinFunction',
      name,
    };
  },

  CallExpression(callee: BuiltInFunction, args: Array<Expression> | null = null): CallExpression {
    invariant(
      callee._kind === 'BuiltInFunction',
      `Invalid value for "callee" arg in "CallExpression" call.\nExpected: BuiltInFunction\nGot:      ${JSON.stringify(
        callee,
      )}`,
    );

    invariant(
      args === null || (Array.isArray(args) && args.every((item) => isExpression(item))),
      `Invalid value for "args" arg in "CallExpression" call.\nExpected: @Expression*?\nGot:      ${JSON.stringify(
        args,
      )}`,
    );

    return {
      _kind: 'CallExpression',
      type: 'callExpression',
      callee,
      args,
    };
  },

  Char(length: number, encoding: Encoding | null = null): Char {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "Char" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    return {
      _kind: 'Char',
      baseType: 'char',
      length,
      encoding,
    };
  },

  CurrentTimestamp(precision: number | null = null): CurrentTimestamp {
    invariant(
      precision === null || typeof precision === 'number',
      `Invalid value for "precision" arg in "CurrentTimestamp" call.\nExpected: number?\nGot:      ${JSON.stringify(
        precision,
      )}`,
    );

    return {
      _kind: 'CurrentTimestamp',
      precision,
    };
  },

  Date(): Date {
    return {
      _kind: 'Date',
      baseType: 'date',
    };
  },

  DateTime(fsp: number | null = null): DateTime {
    invariant(
      fsp === null || typeof fsp === 'number',
      `Invalid value for "fsp" arg in "DateTime" call.\nExpected: number?\nGot:      ${JSON.stringify(fsp)}`,
    );

    return {
      _kind: 'DateTime',
      baseType: 'datetime',
      fsp,
    };
  },

  Decimal(precision: Precision | null, unsigned: boolean): Decimal {
    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "Decimal" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'Decimal',
      baseType: 'decimal',
      precision,
      unsigned,
    };
  },

  Double(precision: Precision | null, unsigned: boolean): Double {
    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "Double" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'Double',
      baseType: 'double',
      precision,
      unsigned,
    };
  },

  Enum(values: Array<string>, encoding: Encoding | null = null): Enum {
    invariant(
      Array.isArray(values) && values.length > 0 && values.every((item) => typeof item === 'string'),
      `Invalid value for "values" arg in "Enum" call.\nExpected: string+\nGot:      ${JSON.stringify(values)}`,
    );

    return {
      _kind: 'Enum',
      baseType: 'enum',
      values,
      encoding,
    };
  },

  Float(precision: Precision | null, unsigned: boolean): Float {
    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "Float" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'Float',
      baseType: 'float',
      precision,
      unsigned,
    };
  },

  GeneratedDefinition(expr: Expression, mode: GeneratedColumnMode): GeneratedDefinition {
    invariant(
      isExpression(expr),
      `Invalid value for "expr" arg in "GeneratedDefinition" call.\nExpected: @Expression\nGot:      ${JSON.stringify(
        expr,
      )}`,
    );

    return {
      _kind: 'GeneratedDefinition',
      type: 'generated',
      expr,
      mode,
    };
  },

  Identifier(name: string): Identifier {
    invariant(
      typeof name === 'string',
      `Invalid value for "name" arg in "Identifier" call.\nExpected: string\nGot:      ${JSON.stringify(name)}`,
    );

    return {
      _kind: 'Identifier',
      type: 'identifier',
      name,
    };
  },

  Int(length: number, unsigned: boolean): Int {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "Int" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "Int" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'Int',
      baseType: 'int',
      length,
      unsigned,
    };
  },

  Json(): Json {
    return {
      _kind: 'Json',
      baseType: 'json',
    };
  },

  Literal(value: mixed): Literal {
    return {
      _kind: 'Literal',
      type: 'literal',
      value,
    };
  },

  LongBlob(): LongBlob {
    return {
      _kind: 'LongBlob',
      baseType: 'longblob',
    };
  },

  LongText(encoding: Encoding | null = null): LongText {
    return {
      _kind: 'LongText',
      baseType: 'longtext',
      encoding,
    };
  },

  MediumBlob(): MediumBlob {
    return {
      _kind: 'MediumBlob',
      baseType: 'mediumblob',
    };
  },

  MediumInt(length: number, unsigned: boolean): MediumInt {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "MediumInt" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "MediumInt" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'MediumInt',
      baseType: 'mediumint',
      length,
      unsigned,
    };
  },

  MediumText(encoding: Encoding | null = null): MediumText {
    return {
      _kind: 'MediumText',
      baseType: 'mediumtext',
      encoding,
    };
  },

  SmallInt(length: number, unsigned: boolean): SmallInt {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "SmallInt" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "SmallInt" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'SmallInt',
      baseType: 'smallint',
      length,
      unsigned,
    };
  },

  Text(encoding: Encoding | null = null): Text {
    return {
      _kind: 'Text',
      baseType: 'text',
      encoding,
    };
  },

  Time(): Time {
    return {
      _kind: 'Time',
      baseType: 'time',
    };
  },

  Timestamp(fsp: number | null = null): Timestamp {
    invariant(
      fsp === null || typeof fsp === 'number',
      `Invalid value for "fsp" arg in "Timestamp" call.\nExpected: number?\nGot:      ${JSON.stringify(fsp)}`,
    );

    return {
      _kind: 'Timestamp',
      baseType: 'timestamp',
      fsp,
    };
  },

  TinyBlob(): TinyBlob {
    return {
      _kind: 'TinyBlob',
      baseType: 'tinyblob',
    };
  },

  TinyInt(length: number, unsigned: boolean): TinyInt {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "TinyInt" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    invariant(
      typeof unsigned === 'boolean',
      `Invalid value for "unsigned" arg in "TinyInt" call.\nExpected: boolean\nGot:      ${JSON.stringify(unsigned)}`,
    );

    return {
      _kind: 'TinyInt',
      baseType: 'tinyint',
      length,
      unsigned,
    };
  },

  UnaryExpression(op: UnaryOp, expr: Expression): UnaryExpression {
    invariant(
      isExpression(expr),
      `Invalid value for "expr" arg in "UnaryExpression" call.\nExpected: @Expression\nGot:      ${JSON.stringify(
        expr,
      )}`,
    );

    return {
      _kind: 'UnaryExpression',
      type: 'unary',
      op,
      expr,
    };
  },

  VarBinary(length: number): VarBinary {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "VarBinary" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    return {
      _kind: 'VarBinary',
      baseType: 'varbinary',
      length,
    };
  },

  VarChar(length: number, encoding: Encoding | null = null): VarChar {
    invariant(
      typeof length === 'number',
      `Invalid value for "length" arg in "VarChar" call.\nExpected: number\nGot:      ${JSON.stringify(length)}`,
    );

    return {
      _kind: 'VarChar',
      baseType: 'varchar',
      length,
      encoding,
    };
  },

  Year(): Year {
    return {
      _kind: 'Year',
      baseType: 'year',
    };
  },

  // Node groups
  isNode,
  isBytes,
  isDataType,
  isDefaultValue,
  isExpression,
  isInteger,
  isNumeric,
  isReal,
  isStart,
  isTemporal,
  isTextual,
  isTextualOrEnum,
};
