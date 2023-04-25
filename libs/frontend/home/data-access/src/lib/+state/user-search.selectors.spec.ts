import * as fromUserSearch from './user-search.reducer';
import { selectUserSearchState } from './user-search.selectors';

describe('UserSearch Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserSearchState({
      [fromUserSearch.userSearchFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
