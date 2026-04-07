declare module 'sql.js' {
  export type SqlValue = number | string | Uint8Array | null;

  export interface SqlJsConfig {
    locateFile?: (file: string) => string;
  }

  export interface QueryExecResult {
    columns: string[];
    values: SqlValue[][];
  }

  export class Database {
    constructor(data?: ArrayLike<number> | ArrayBuffer | Uint8Array | null);
    run(sql: string, params?: SqlValue[]): Database;
    exec(sql: string, params?: SqlValue[]): QueryExecResult[];
    close(): void;
  }

  export interface SqlJsStatic {
    Database: typeof Database;
  }

  export default function initSqlJs(config?: SqlJsConfig): Promise<SqlJsStatic>;
}
