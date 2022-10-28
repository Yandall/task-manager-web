import { createReducer, on } from '@ngrx/store';
import { Section } from 'src/app/shared/types';
import { genericAdd, genericRemove, genericUpdate } from '../app.generics';
import {
  addSection,
  fetchSections,
  removeSection,
  updateSection,
} from './sections.actions';

export type SectionsState = { list: ReadonlyArray<Section> };

const initialState: SectionsState = { list: [] };

export const sectionsReducer = createReducer(
  initialState,
  on(fetchSections, (state, { sections }) => {
    return { ...state, list: [...sections] };
  }),
  on(addSection, (state, { section }) => genericAdd(state, section)),
  on(updateSection, (state, { section }) => genericUpdate(state, section)),
  on(removeSection, (state, { sectionId }) => genericRemove(state, sectionId))
);
