import axios from "axios";
const baseUrl = "https://fullstackopen-server-19ct.onrender.com/api/persons";
import { PersonService } from "../types/personserviceprops";
import { NewPhonebookEntry, Phonebook } from "../types/phonebook";

const getAll: PersonService["getAll"] = () => {
  return axios.get(baseUrl);
};

// const create: PersonService["create"] = (newObject) => {
//   return axios.post(baseUrl, newObject);
// };
// const create = (newObject: NewPhonebookEntry) => {
//   return axios.post<Phonebook>(baseUrl, newObject);
// };

const create: PersonService["create"] = async (
  newObject: NewPhonebookEntry
) => {
  try {
    const response = await axios.post<Phonebook>(baseUrl, newObject);
    return response;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      typeof error.response.data.error === "string"
    ) {
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
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
