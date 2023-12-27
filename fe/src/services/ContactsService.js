import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(contacts) {
    return this.HttpClient.post(`/contacts`, contacts);
  }
}

export default new ContactService();
