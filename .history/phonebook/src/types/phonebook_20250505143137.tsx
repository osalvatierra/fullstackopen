export interface Phonebook {
  name: string;
  number: number;
}

export type Searchlistprops = {
  persons: Phonebook[];
};
