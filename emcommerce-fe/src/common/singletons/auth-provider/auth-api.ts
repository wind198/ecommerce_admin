import { AxiosError } from 'axios';
import { axiosClient } from '../axios';

export type ILoginPayload = {
  email: string;
  password: string;
};

const AuthApi = {
  login(payload: ILoginPayload) {
    return axiosClient.post('auth/login', payload);
  },

  logout() {
    return axiosClient.get('auth/logout');
  },

  async checkError(error: AxiosError) {
    if (!error.response) {
      await this.logout();
      return Promise.reject();
    }
    const { status } = error.response;
    if (status === 401 || status === 403) {
      await this.logout();
      return Promise.reject();
    }
    return Promise.resolve();
  },
};

export default AuthApi;
