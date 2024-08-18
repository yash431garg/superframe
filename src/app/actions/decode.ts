import jwt, { Secret } from "jsonwebtoken";
import * as jose from 'jose'


export const getKey = async (): Promise<{ error?: unknown; key?: String }> => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.DYNAMIC_BEARER_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/keys`,
      options,
    );
    const responseJson = await response.json();
    const publicKey = responseJson.key.publicKey;
    return { key: publicKey };
  } catch (ex: unknown) {
    console.error(ex);
    return { error: ex };
  }
};

export const decodeJwtPayload = async (
  token: string,
): Promise<any | null> => {
  try {
    if (!token) {
      return null;
    }

    const key = await getKey();
    if (key.error || !key.key) {
      return null;
    }

    const publicKeyPem = Buffer.from(key.key, 'base64').toString('ascii');
    const publicKey = await jose.importSPKI(publicKeyPem , 'RS256');

    const { payload } = await jose.jwtVerify(token, publicKey);

    if (typeof payload === "object" && payload !== null) {
      return payload;
    }

    return null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
