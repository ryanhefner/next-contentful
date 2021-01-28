import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { getDataFromTree } from 'next-utils';
import { ContentfulProvider } from 'react-contentful';
import { getDisplayName } from 'react-hoc-helpers';
import { stringify } from 'flatted';

import initContentful from './initContentful';

export default function withContentful({ accessToken, host, space, environment, locale }) {
  return (ComposedComponent) => {
    const propTypes = {
      contentfulState: PropTypes.shape(),
    };

    const defaultProps = {
      contentfulState: null,
    };

    const Contentful = class extends React.Component {
      static displayName = `withContentful(${getDisplayName(ComposedComponent)})`;

      constructor(props) {
        super(props);

        this.contentfulClient = initContentful(props.contentfulState);
      }

      static async getInitialProps(props) {
        const { Component, router, ctx } = props;

        let composedInitialProps = {};
        if (ComposedComponent.getInitialProps) {
          composedInitialProps = await ComposedComponent.getInitialProps(props);
        }

        // Run all Contentful queries in the component tree
        // and extract the resulting data
        const contentful = initContentful({
          accessToken,
          host,
          space,
          environment,
        });

        if (!process.browser) {
          try {
            // Run all Contentful queries
            await getDataFromTree(
              <ContentfulProvider client={contentful} locale={locale}>
                <ComposedComponent
                  Component={Component}
                  ctx={ctx}
                  router={router}
                  store={ctx.store}
                  {...composedInitialProps}
                />
              </ContentfulProvider>
            );
          } catch (error) {
            // Prevent Contentful Client errors from crashing SSR.
            // Handle them in components via the data.error prop:
            if (process.env.NODE_ENV === 'development') {
              console.log(error);
            }
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }

        // Pass in the Contentful client credentials and initial cache state
        const contentfulState = {
          accessToken,
          host,
          space,
          environment,
          cache: stringify(contentful.cache.extract()),
        };

        return {
          ...composedInitialProps,
          contentfulState,
        };
      }

      render() {
        return (
          <ContentfulProvider client={this.contentfulClient} locale={locale}>
            <ComposedComponent {...this.props} />
          </ContentfulProvider>
        );
      }
    };

    Contentful.propTypes = propTypes;
    Contentful.defaultProps = defaultProps;

    return Contentful;
  };
}
