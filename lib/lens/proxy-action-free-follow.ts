import { apolloClient } from '../apollo-client';
import { ProxyActionDocument, ProxyActionRequest } from './graphql/generated';

const proxyActionFreeFollowRequest = async (request: ProxyActionRequest) => {
  const result = await apolloClient.query({
    query: ProxyActionDocument,
    variables: {
      request,
    },
  });

  return result;
};

export const proxyActionFreeFollow = async (profileId: string) => {
  const result = await proxyActionFreeFollowRequest({
    follow: {
      freeFollow: {
        profileId,
      },
    },
  });

  return result;
};
