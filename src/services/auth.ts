import {
  LoginResponsePayload,
  LoginRequestBody,
  RegisterResponse,
  RegisterPayload,
} from '../interfaces/auth';
import { Api } from '.';
export const authApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponsePayload, LoginRequestBody>({
      query: (creds) => ({
        url: 'login',
        method: 'POST',
        body: creds,
      }),
      transformResponse: (res: Record<string, unknown>) =>
        res.data as LoginResponsePayload,
    }),
    logout: builder.mutation<Response, void>({
      query: ()=>({
        url: 'logout',
        method: 'POST',
      })
    }),
    getCredentials: builder.query<LoginResponsePayload, void>({
      query: () => 'whoami',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as LoginResponsePayload,
    }),
  }),
});

export const postRegister = (reqBody: FormData) => {
  return fetch(`${process.env.REACT_APP_API_URL}register`, {
    method: 'POST',
    body: reqBody,
  })
    .then(async (resp) => {
      if (!resp || resp.status < 200 || resp.status > 299) {
        throw await resp.json();
      }
      return resp.json();
    })
    .then((res): RegisterResponse => {
      return {
        code: res.code as string,
        data: res.data as RegisterPayload,
        message: 'success',
        status_code: res.status_code,
        error: false,
      };
    })
    .catch((err) => {
      return {
        code: err?.code as string,
        message: err?.message as string,
        status_code: err.status_code as number,
        data: err?.data,
        error: true,
      };
    });
};

export const { useLoginMutation, useLogoutMutation, useLazyGetCredentialsQuery, useGetCredentialsQuery } = authApi;
