export interface Phonebook {
  id: number;
  name: string;
  number: number;
}

export type Searchlistprops = {
  persons: Phonebook[];
};
