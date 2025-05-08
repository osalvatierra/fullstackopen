import axios from "axios";
const baseUrl = "http://localhost:3001/src/services/personService.tsx";
import { PersonService } from "../types/personserviceprops";

const getAll: PersonService["getAll"] = () => {
  return axios.get(baseUrl);
};

const create: PersonService["create"] = (newObject) => {
  return axios.post(baseUrl, newObject);
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
