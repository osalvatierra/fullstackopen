import axios from "axios";
const baseUrl = "http://localhost:3002/api/persons";
import { PersonService } from "../types/personserviceprops";
import { NewPhonebookEntry, Phonebook } from "../types/phonebook";

const getAll: PersonService["getAll"] = () => {
  return axios.get(baseUrl);
};

const create = async (newEntry: NewPhonebookEntry): Promise<Phonebook> => {
  const response = await axios.post<Phonebook>(baseUrl, newEntry);
  return response.data;
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
