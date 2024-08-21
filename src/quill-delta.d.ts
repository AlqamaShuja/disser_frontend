declare module 'quill-delta' {
    export default class Delta {
      constructor(ops?: any);
      retain(length: number, attributes?: any): Delta;
      delete(length: number): Delta;
      insert(text: string, attributes?: any): Delta;
      insert(embed: object, attributes?: any): Delta;
      compose(other: Delta): Delta;
      concat(other: Delta): Delta;
      diff(other: Delta): Delta;
      length(): number;
      slice(start?: number, end?: number): Delta;
      chop(): Delta;
      eachLine(
        predicate: (line: Delta, attributes: any, index: number) => boolean | void,
        newline?: string
      ): void;
      transform(other: Delta, priority: boolean): Delta;
      transformPosition(index: number, priority: boolean): number;
      reduce<T>(
        predicate: (accum: T, op: any) => T,
        initialValue: T
      ): T;
      changeLength(): number;
      filter(predicate: (op: any) => boolean): any[];
      map<T>(predicate: (op: any) => T): T[];
      partition(predicate: (op: any) => boolean): [any[], any[]];
      forEach(predicate: (op: any) => void): void;
      ops: any[];
    }
}
  