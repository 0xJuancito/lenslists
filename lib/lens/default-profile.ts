import { apolloClient } from '../apollo-client';
import {
  DefaultProfileDocument,
  DefaultProfileRequest,
} from './graphql/generated';
import { formatProfile } from './utils';

const getDefaultProfileRequest = async (request: DefaultProfileRequest) => {
  const result = await apolloClient.query({
    query: DefaultProfileDocument,
    variables: {
      request,
    },
  });

  return result.data.defaultProfile;
};

export const getDefaultProfile = async (address: string) => {
  const result = await getDefaultProfileRequest({ ethereumAddress: address });

  formatProfile(result);

  return result;
};
