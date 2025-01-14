import { getDatabase, saveDatabase } from './index';
import type { PageContent, CarouselSlide, Network, SiteSettings } from '../types/content';

// Networks
export function getNetworks(): Network[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM networks ORDER BY name');
  
  if (!result.length) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as string,
    name: row[1] as string,
    description: row[2] as string,
    icon: row[3] as string,
    color: row[4] as string,
    slug: row[5] as string,
    content: JSON.parse(row[6] as string || '[]'),
    lastModified: row[7] as string
  }));
}

export function updateNetwork(id: string, network: Partial<Network>) {
  const db = getDatabase();
  const sets: string[] = [];
  const values: any[] = [];

  if (network.name) {
    sets.push('name = ?');
    values.push(network.name);
  }
  if (network.description) {
    sets.push('description = ?');
    values.push(network.description);
  }
  if (network.icon) {
    sets.push('icon = ?');
    values.push(network.icon);
  }
  if (network.color) {
    sets.push('color = ?');
    values.push(network.color);
  }
  if (network.content) {
    sets.push('content = ?');
    values.push(JSON.stringify(network.content));
  }
  if (network.lastModified) {
    sets.push('last_modified = ?');
    values.push(network.lastModified);
  }

  if (sets.length > 0) {
    db.run(
      `UPDATE networks SET ${sets.join(', ')}, last_modified = ? WHERE id = ?`,
      [...values, new Date().toISOString(), id]
    );
    saveDatabase();
  }
}

// ... rest of the queries implementation remains the same