// eslint-disable-next-line @typescript-eslint/no-unused-vars
import redux from 'redux';

import { Actions as FlickrActions } from 'src/reducers/flickr/actions';

import RootReducer from 'src/reducers';

declare global {
  namespace Redux {
    type Action<T, R = {}> = { type: T } & R;

    type RootActions = FlickrActions;

    interface Dispatch<A = RootActions> {
      <T extends A>(action: T): T;
    }

    type RootState = ReturnType<typeof RootReducer>;

    type GetState = () => RootState;

    type ThunkAction<R = void> = (dispatch: Redux.Dispatch<RootActions>, getState: GetState) => R;
  }
}

declare module 'redux' {
  function bindActionCreators<A>(
    actions: A,
    dispatch: Redux.Dispatch,
  ): {
    [T in keyof A]: (...args: Parameters<A[T]>) => ReturnType<ReturnType<A[T]>>;
  };
}