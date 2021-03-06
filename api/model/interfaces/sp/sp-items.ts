export interface AddableMultiLookupId {
  results: number[];
}

export interface AddableListItem {
  Title: string;
  [x: string]:
    | string
    | number
    | boolean
    | AddableMultiLookupId
    | null
    | undefined;
}

export interface UpdatableListItem extends MakeUpdatable<AddableListItem> {}

export interface PersistedListItem extends AddableListItem {
  id: number;
  Created: string;
  Modified: string;
}

export interface OrderBySpec {
  columnName: string;
  direction: "ASC" | "DESC";
}

export type MakeUpdatable<T> = Partial<{
  [P in keyof T]: T[P] | null;
}>;
