import { apolloClient } from '../apollo-client';
import {
  SearchProfilesDocument,
  SearchQueryRequest,
  SearchRequestTypes,
} from './graphql/generated';
import { formatProfile } from './utils';

const searchRequest = async (request: SearchQueryRequest) => {
  const result = await apolloClient.query({
    query: SearchProfilesDocument,
    variables: {
      request,
    },
  });

  return result.data.search;
};

export const search = async (query: string) => {
  const result = await searchRequest({
    query,
    type: SearchRequestTypes.Profile,
  });

  // @ts-ignore
  result.items.forEach((item) => {
    formatProfile(item);
  });

  return result;
};
