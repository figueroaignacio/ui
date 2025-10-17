export const namespaces = ['ui', 'components'] as const;
export type Namespace = (typeof namespaces)[number];
