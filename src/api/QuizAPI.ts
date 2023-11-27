import axios from "axios";
import { TData, TSettings } from "../assets/types/quizzical.types";

type TResponse = {
  response_code: number;
  results: TData[];
}

const client = axios.create({
  baseURL: "https://opentdb.com/api.php",
  headers: {
    "Content-Type": "application/json"
  }
})

function getUrlParameters<TSettings>(parameters: TSettings): string {
  const result_url = [];

  for (const key in parameters) {
    if (parameters[key]) {
      result_url.push(key + '=' + parameters[key]);
    }
  }

  return '?' + result_url.join('&');
}

export const getQuiz = (settings: TSettings | object) => {
  const url_parameters = getUrlParameters(settings);
  return client.get<TResponse>(url_parameters)
    .then(({ data }) => {
      if (data.response_code === 0) {
        return data.results;
      } else {
        throw new Error("Wrong parameters were passed");
      }
    })
    .catch(ex => {
      const error = ex.code === 'ERR_NETWORK'
        ? "Resource Not found"
        : "An unexpected error has occurred";
      throw new Error(error);
    })
}
