import { withClientState } from "apollo-link-state";
const cache = new InMemoryCache();

export const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: "NetworkStatus",
            isConnected
          }
        };
        cache.writeData({ data });
        return null;
      }
    }
  }
});
