import axios from "axios";
const baseUrl = "http://localhost:3002/api/persons";
import { PersonService } from "../types/personserviceprops";

const getAll: PersonService["getAll"] = () => {
  return axios.get(baseUrl);
};

const create: PersonService["create"] = (newEntry: NewPhonebookEntry) => {
  axios.post<Phonebook>(baseUrl, newEntry);
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
