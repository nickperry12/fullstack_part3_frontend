import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((res) => res.data);
}

const create = (newPerson) => {
  const response = axios.post(baseUrl, newPerson);
  return response.then((res) => res.data);
}

const remove = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((res) => res.data);
}

const update = (id, newPerson) => {
  const response = axios.put(`${baseUrl}/${id}`, newPerson);
  return response.then((res) => res.data);
}

export default { getAll, create, remove, update }