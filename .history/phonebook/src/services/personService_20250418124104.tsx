import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
import { PersonService } from "../types/personserviceprops";

const getAll: PersonService["getAll"] = () => {
  return axios.get(baseUrl);
};

const create: PersonService["create"] = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update: PersonService["update"] = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const delete: personService["delete"] = ()

const personService: PersonService = {
  getAll,
  create,
  update,
};

export default personService;
