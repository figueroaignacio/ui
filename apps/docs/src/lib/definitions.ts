export interface DocItem {
  title: string;
  href: string;
}

export interface DocSection {
  title: string;
  items: DocItem[];
}

export interface Navigation extends DocItem {}

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
