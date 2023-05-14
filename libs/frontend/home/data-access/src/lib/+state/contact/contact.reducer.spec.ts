import { initialState, reducer } from './contact.reducer';
import * as ContactActions from './contact.actions';
import { ConversationFactory } from '@chatterly/frontend/shared/spec-utils';
import { ApiError } from '@chatterly/shared/data-access';

describe('Contact Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadContacts action', () => {
    it('should set loading to true', () => {
      const result = reducer(initialState, ContactActions.loadContacts);
      const expectedState = {
        ...initialState,
        loading: true,
      };
      expect(result).toEqual(expectedState);
    });
  });

  describe('loadContactsSuccess action', () => {
    const conversations = ConversationFactory.createMany(5);

    it('should set loading to false and set contacts with specified contacts', () => {
      const action = ContactActions.loadContactsSuccess({ conversations });
      const expectedState = {
        ...initialState,
        contacts: conversations,
      };
      const result = reducer({ ...initialState, loading: true }, action);
      expect(result).toEqual(expectedState);
    });

    it('should clear error property', () => {
      const action = ContactActions.loadContactsSuccess({ conversations });
      const expectedState = {
        ...initialState,
        contacts: conversations,
        error: null,
      };
      const result = reducer({ ...initialState, error: 'test' }, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('loadContactsFailure action', () => {
    it('should set loading to false and set error with error message if present', () => {
      const error: ApiError = {
        error: {
          statusCode: 404,
          message: 'not found',
        },
      };
      const action = ContactActions.loadContactsFailure({ error });
      const expectedState = {
        ...initialState,
        error: error.error.message,
        loading: false,
      };
      const result = reducer({ ...initialState, loading: true }, action);
      expect(result).toEqual(expectedState);
    });

    it("should set error with 'error' text if error message is not present", () => {
      const error: ApiError = { error: { statusCode: 404 } };
      const action = ContactActions.loadContactsFailure({ error });
      const expectedState = {
        ...initialState,
        error: 'error',
      };
      const result = reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });
});
