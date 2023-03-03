import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const appActions = createActionGroup({
  source: 'App',
  events: {
    clear: emptyProps(),
    setLastLogin: props<{ date: Date }>()
  }
});

