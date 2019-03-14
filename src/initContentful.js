import { ContentfulCache, ContentfulClient } from 'react-contentful';

let client = null;

function create({
  accessToken,
  cache,
  host,
  space,
}) {
  return new ContentfulClient({
    host,
    accessToken,
    space,
    ssrMode: !!(process.browser) === false,
    cache: cache instanceof ContentfulCache
      ? cache
      : (new ContentfulCache()).restore(cache),
  });
}

export default function initContentful(initialState = {}) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!client) {
    client = create(initialState);
  }

  return client;
}
