const API_URL = 'https://api-nach-ui.vercel.app/api/v1';
const NACHUI_API_KEY = process.env.NACHUI_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': NACHUI_API_KEY as string,
};

export interface RegistryComponent {
  name: string;
  slug: string;
  code: string;
  dependencies: string[];
}

export const api = {
  async getComponents(): Promise<RegistryComponent[]> {
    try {
      const response = await fetch(`${API_URL}/registry`, { headers });

      if (!response.ok) {
        console.error(`[API Error] Status: ${response.status}`);
        throw new Error('Error connecting to the API.');
      }

      return response.json();
    } catch (error) {
      throw new Error('Error connecting to the API. Make sure it is running.');
    }
  },

  async getComponent(slug: string): Promise<RegistryComponent> {
    const response = await fetch(`${API_URL}/registry/${slug}`, { headers });
    if (!response.ok) throw new Error('Component not found or unauthorized.');
    return response.json();
  },

  async getTheme(theme: string = 'default') {
    const res = await fetch(`${API_URL}/themes/${theme}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch styles.');
    return res.json();
  },

  async getThemes(): Promise<string[]> {
    const response = await fetch(`${API_URL}/themes`, { headers });
    if (!response.ok) throw new Error('Error fetching themes.');
    return response.json();
  },
};
