// Type definitions for next-contentful
// Project: https://github.com/ryanhefner/next-contentful
// Definitions by: Ryan Hefner <https://github.com/ryanhefner>
// TypeScript Version: 3.0

import { Component } from 'react';

export interface withContentfulParams {
  accessToken: string;
  host: string;
  space: string;
}

export default function withContentful(params: withContentfulParams): Component;
