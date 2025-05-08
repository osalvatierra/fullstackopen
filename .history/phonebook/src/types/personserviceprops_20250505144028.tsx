import { AxiosResponse } from "axios";
import { Phonebook } from "./phonebook";

export type PhonebookResponse = Promise<AxiosResponse<Phonebook[]>>;
export type PhonebookItemResponse = Promise<AxiosResponse<Phonebook>>;
export type NewPhonebookEntry = Omit<Phonebook, "id">;

export type PersonService = {
  getAll: () => PhonebookResponse;
  create: (newObject: Phonebook) => PhonebookItemResponse;
  update: (id: string, newObject: Phonebook) => PhonebookItemResponse;
  remove: (id: string) => PhonebookItemResponse;
};
