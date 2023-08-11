import axios, {AxiosResponse} from 'axios';
import {COIN_API_KEY, CRYPTO_API} from '../constants/common';

class Api{
  private client;
  constructor() {
    this.client = axios.create({
      baseURL: CRYPTO_API,
      headers: {
        'X-CoinAPI-Key': COIN_API_KEY
      }
    });
  }

  get = async (url: string, params = {}): Promise<AxiosResponse> => {
    return await this.client.get(url, params);
  };
}

const api = new Api();

export const {
  get,
} = api;

export default api;
