const API_URL = 'http://api.nach-ui.vercel.app/api/v1';

export interface RegistryComponent {
  name: string;
  slug: string;
  code: string;
  dependencies: string[];
}

export interface RegistryTheme {
  css: string;
  utils: string;
  config: {
    $schema: string;
    style: string;
    tailwind: {
      config: string;
      baseColor: string;
    };
    aliases: {
      components: string;
      utils: string;
    };
  };
}

export const api = {
  async getComponents(): Promise<RegistryComponent[]> {
    const response = await fetch(`${API_URL}/registry`);

    if (!response.ok) {
      throw new Error('Error connecting to the API.');
    }

    return response.json() as Promise<RegistryComponent[]>;
  },

  async getComponent(slug: string): Promise<RegistryComponent> {
    const response = await fetch(`${API_URL}/registry/${slug}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Component "${slug}" does not exist in the registry.`);
      }
      throw new Error('Error connecting to the API.');
    }

    return response.json() as Promise<RegistryComponent>;
  },

  async getTheme(theme: string = 'default') {
    const res = await fetch(`${API_URL}/themes/${theme}`);
    if (!res.ok) throw new Error('Failed to fetch styles');
    return res.json() as Promise<RegistryTheme>;
  },

  async getThemes(): Promise<string[]> {
    const response = await fetch(`${API_URL}/themes`);
    if (!response.ok) throw new Error('Error connecting to the API.');
    return response.json() as Promise<string[]>;
  },
};
