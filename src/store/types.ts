import {StateType, ActionType} from 'typesafe-actions';

export type Store = StateType<typeof import('./index').default>;
export type RootState = StateType<
  ReturnType<typeof import('../actions').default>
>;
export type RootAction = ActionType<typeof import('../actions').default>;

interface Types {
  RootAction: ActionType<typeof import('../actions').default>;
}
