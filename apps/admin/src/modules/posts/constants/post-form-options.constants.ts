export interface IPostFormCategoryOption {
  id: string;
  name: string;
}

export interface IPostFormTagOption {
  id: string;
  name: string;
}

export const POST_FORM_CATEGORY_OPTIONS: IPostFormCategoryOption[] = [
  { id: '1', name: 'Diseño' },
  { id: '2', name: 'Desarrollo' },
  { id: '3', name: 'Productividad' },
];

export const POST_FORM_TAG_OPTIONS: IPostFormTagOption[] = [
  { id: '1', name: 'Diseño UI' },
  { id: '2', name: 'Minimalismo' },
  { id: '3', name: 'Principios UX' },
  { id: '4', name: 'Frontend' },
];
