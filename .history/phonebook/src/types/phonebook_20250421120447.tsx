export interface Phonebook {
  id?: string;
  name: string;
  number: number;
}

export type Searchlistprops = {
  persons: Phonebook[];
};
