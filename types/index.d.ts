// TypeScript Version: 3.0

import { Component } from 'react';
import { ContentfulClientInterface } from 'react-contentful';

/**
 * initContentful
 */

export interface initContentfulParams {
  initialState: any;
}

export function initContentful(params: initContentfulParams): ContentfulClientInterface;

/**
 * withContentful
 */

export interface withContentfulParams {
  accessToken: string;
  host: string;
  space: string;
}

export type withContentful = (params: withContentfulParams) => Component;
