import axios from "axios";
const baseUrl = "https://fullstackopen-server-19ct.onrender.com/api/persons";
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

import { PersonService } from "../types/personserviceprops";
import { NewPhonebookEntry, Phonebook } from "../types/phonebook";

const getAll: PersonService["getAll"] = async () => {

  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.get(baseUrl, config)
  return response
};

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
  setToken
};

export default personService;
