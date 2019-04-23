// TypeScript Version: 3.0

import { ContentfulClient } from 'react-contentful';

export interface initContentfulParams {
  initialState: any;
}

export default function initContentful(params: initContentfulParams): ContentfulClient.ContentfulClientApi;
