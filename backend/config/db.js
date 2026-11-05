import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

class JsonModel {
  constructor(filename) {
    this.filePath = path.join(DATA_DIR, filename);
  }

  async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await this.write([]);
        return [];
      }
      throw err;
    }
  }

  async write(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async find(filterFn) {
    const items = await this.read();
    return filterFn ? items.filter(filterFn) : items;
  }

  async findOne(filterFn) {
    const items = await this.read();
    return items.find(filterFn) || null;
  }

  async findById(id) {
    const items = await this.read();
    return items.find((item) => item.id === id) || null;
  }

  async create(newItem) {
    const items = await this.read();
    items.push(newItem);
    await this.write(items);
    return newItem;
  }

  async update(id, updates) {
    const items = await this.read();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    await this.write(items);
    return items[index];
  }

  async delete(id) {
    const items = await this.read();
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) return false;
    await this.write(filtered);
    return true;
  }
}

export const db = {
  products: new JsonModel('products.json'),
  orders: new JsonModel('orders.json'),
  users: new JsonModel('users.json'),
  coupons: new JsonModel('coupons.json'),
  messages: new JsonModel('messages.json')
};

