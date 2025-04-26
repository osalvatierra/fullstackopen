export interface Phonebook {
  id: existingPerson.id;
  name: string;
  number: number;
}

export type Searchlistprops = {
  persons: Phonebook[];
};
