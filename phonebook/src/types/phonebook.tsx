export interface Phonebook {
  id: string;
  name: string;
  number: string;
}
export type NewPhonebookEntry = Omit<Phonebook, "id">;

export type Searchlistprops = {
  persons: Phonebook[];
};
