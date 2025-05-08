import { AxiosResponse } from "axios";
import { Phonebook } from "./phonebook";

export type PhonebookResponse = Promise<AxiosResponse<Phonebook[]>>;
export type PhonebookItemResponse = Promise<AxiosResponse<Phonebook>>;

export type PersonService = {
  getAll: () => PhonebookResponse;
  create: (newObject: Phonebook) => PhonebookItemResponse;
  update: (newObject: Phonebook) => PhonebookItemResponse;
  remove: (id: string) => PhonebookItemResponse;
};
