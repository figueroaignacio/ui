const API_URL = 'http://localhost:3001/api/v1';

export interface RegistryComponent {
  name: string;
  slug: string;
  code: string;
  dependencies: string[];
}

export const api = {
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

  async getComponents(): Promise<RegistryComponent[]> {
    const response = await fetch(`${API_URL}/registry`);

    if (!response.ok) {
      throw new Error('Error connecting to the API.');
    }

    return response.json() as Promise<RegistryComponent[]>;
  },
};
