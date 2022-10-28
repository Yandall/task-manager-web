import { createAction, props } from '@ngrx/store';
import { Section } from 'src/app/shared/types';

export const fetchSections = createAction(
  '[Section State] Fetch Sections',
  props<{ sections: ReadonlyArray<Section> }>()
);

export const addSection = createAction(
  '[Section State] Add Section',
  props<{ section: Section }>()
);

export const removeSection = createAction(
  '[Section State] Remove Section',
  props<{ sectionId: string }>()
);

export const updateSection = createAction(
  '[Section State] Update Section',
  props<{ section: Section }>()
);
