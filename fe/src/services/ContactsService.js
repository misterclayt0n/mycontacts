import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?order=${orderBy}`);
  }
}

export default new ContactService();
