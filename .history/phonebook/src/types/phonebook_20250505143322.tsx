export interface Phonebook {
  id: string;
  name: string;
  number: number;
}
export type NewPhonebookEntry = Omit<Phonebook, "id">;

export type Searchlistprops = {
  persons: Phonebook[];
};
