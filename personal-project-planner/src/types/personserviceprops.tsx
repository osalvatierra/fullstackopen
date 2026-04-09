import { AxiosResponse } from 'axios'
import { Phonebook, NewPhonebookEntry } from './phonebook'

export type PhonebookResponse = Promise<Phonebook[]>
export type PhonebookItemResponse = Promise<AxiosResponse<Phonebook>>

export type PersonService = {
  getAll: () => PhonebookResponse
  create: (newObject: NewPhonebookEntry) => Promise<AxiosResponse<Phonebook>>
  update: (id: string, newObject: Phonebook) => PhonebookItemResponse
  remove: (id: string) => PhonebookItemResponse
  setToken: (newToken: string) => void
}
