import { createFrames } from 'frames.js/next';


export const frames = createFrames({
  basePath: '/',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL,
  debug: true,
  imagesRoute: null,
});
