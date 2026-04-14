export type Doc = {
  slug: string;
  title: string;
  description: string;
  published: boolean;
  date: Date;
  label?: 'New' | 'Updated';
  body: unknown;
  raw: string;
  locale: 'en' | 'es';
  toc: {
    content: Array<{
      title: string;
      url: string;
      items?: Array<{
        title: string;
        url: string;
      }>;
    }>;
    visible: boolean;
  };
};
