export enum FormTypes {
  add,
  edit,
  delete
}

export function parseFormType(n: number | string): FormTypes {
  const enumKey = typeof n === 'string'
    ? parseInt(n)
    : n;

  return FormTypes[FormTypes[enumKey] as keyof typeof FormTypes]
}
