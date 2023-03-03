import { appActions } from './app.actions';
import { createFeature, createReducer, on } from '@ngrx/store';

export interface AppState {
  lastLogin: Date;
}

export const initialState: AppState = {
  lastLogin: new Date()
};

export const appFeature = createFeature({
  name: 'appState',
  reducer: createReducer(
    initialState,
    on(appActions.clear, () => initialState),
    on(appActions.setlastlogin, (state, { date }) => {
      return {
        ...state,
        lastLogin: date
      };
    })
  )
});
