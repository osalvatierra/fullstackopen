export interface Phonebook {
  id: string;
  name: string;
  number: string;
}

export type Searchlistprops = {
  persons: Phonebook[];
};
