# Next Contentful

[![npm version](https://badge.fury.io/js/next-contentful.svg)](https://badge.fury.io/js/next-contentful)
[![npm](https://img.shields.io/npm/l/express.svg)](LICENSE)

React library for integrating react-contentful into the server-side rendering of
your Next.js app.

## Install

Via [npm](https://npmjs.com/package/next-contentful)
```sh
npm install --save next-contentful
```

Via [Yarn](https://yarn.fyi/next-contentful)
```sh
yarn add next-contentful
```

## How to use

To use `next-contentful`, just set the parameters that will be used by the
`ContentfulClient` from [`react-contentful`](https://github.com/ryanhefner/react-contentful)
and wraps your Next.js app in a `ContentfulProvider` and handles initiating both
the `ContentfulClient` for both SSR/requests and the browser client.

Any `Query` instance that appear in your React tree will be queued and requested
server-side and included in the initial state to make reduce the requests being
made by the client and results in your Next/React app rendering faster client-side.

Here’s an example of how it is used:

```js
import App, { Container } from 'next/app';
import React from 'react';
import { withContentful } from 'next-contentful';

// Contentful config properties
const accessToken = '[CONTENTFUL ACCESS TOKEN]';
const host = 'cdn.contentful.com';
const space = '[CONTENTFUL SPACE]';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps,
      store,
    } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withContentful({
  accessToken,
  host,
  space,
})(MyApp);

```

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
