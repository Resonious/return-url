import fetch from './serve';

const server = Bun.serve({
  port: 3009,
  fetch,
});

console.log(`Listening on localhost:${server.port}`);
