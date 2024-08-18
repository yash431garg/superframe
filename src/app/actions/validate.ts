"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJwtPayload } from './decode';

export const getJwtPayload = async () => {
  const token = cookies().get('token');

  if (!token) {
    return null;
  }

  return await decodeJwtPayload(token.value);
};

export const setJwtPayload = async (token: string) => {
  if (!token) {
    clearJwt();
    return;
  }

  const payload = await decodeJwtPayload(token);

  if (!payload || !payload.sub) {
    clearJwt();
    return;
  }

  cookies().set("token", token, {
    expires: payload.exp * 1000,
    secure: true,
    httpOnly: true,
  });
};

export const clearJwt = () => {
  cookies().set('token', '', { expires: new Date(0) });

  redirect('/auth');
};
