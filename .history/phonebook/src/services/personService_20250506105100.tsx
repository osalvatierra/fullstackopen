import axios from "axios";
const baseUrl = "http://localhost:3002/api/persons";
import { PersonService } from "../types/personserviceprops";
import { NewPhonebookEntry, Phonebook } from "../types/phonebook";

const getAll: PersonService["getAll"] = () => {
  return axios.get(baseUrl);
};

// const create: PersonService["create"] = (newObject) => {
//   return axios.post(baseUrl, newObject);
// };
const create = (newPerson: NewPhonebookEntry) => {
  return axios.post<Phonebook>(baseUrl, newPerson);
};

const update: PersonService["update"] = (id: string, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove: PersonService["remove"] = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personService: PersonService = {
  getAll,
  create,
  update,
  remove,
};

export default personService;
