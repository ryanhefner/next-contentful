# Next Contentful

[![npm](https://img.shields.io/npm/v/next-contentful?style=flat-square)](https://www.npmjs.com/package/next-contentful)
[![NPM](https://img.shields.io/npm/l/next-contentful?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/dt/next-contentful?style=flat-square)](https://www.npmjs.com/package/next-contentful)

React library for integrating [`react-contentful`](https://github.com/ryanhefner/react-contentful)
into the server-side rendering of your Next.js app.

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
const space = '[CONTENTFUL SPACE]';
const accessToken = '[CONTENTFUL ACCESS TOKEN]';
const host = 'cdn.contentful.com';
const locale = 'es-US';

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
  space,
  accessToken,
  host,         // Optional: Defaults to 'cdn.contentful.com'
  locale,       // Optional: Defaults to `en-US`
})(MyApp);

```

### `withContentful`

Higher-order component that makes it easy to quickly add Contentful support to your Next.js application by providing the setup to that allows [`react-contentful`](https://github.com/ryanhefner/react-contentful) components to be rendered both server-side and client-side within your React applications.

#### Options

* `space: string` - ID of the Contentful space you are working with

* `accessToken: string` - Contentful access token used to access the space

* `locale: string` - Default locale to apply to queries (Note: This can be overriden with locales set on the individual queries).

* `host: string` - Host to use for the Contentful requests. Defaults to `cdn.contentful.com`, but could be set to `preview.contentful.com` when used with a preview token.

* `environment: string` – Environment value to use for Contentful requests. Defaults to `master`.

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
