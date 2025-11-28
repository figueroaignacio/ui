export type DocItem = {
  title: string;
  href: string;
};

export type DocSection = {
  title: string;
  items: DocItem[];
};

export interface SearchResultItem {
  title: string;
  href: string;
  category: string;
}

export interface NavigationSection {
  title: string;
  items: { title: string; href: string }[];
}

export interface Message {
  id?: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: string | number;
}
