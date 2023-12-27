import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.HttpClient.get(
      `/contacts/2ef27115-b4ee-4547-a50d-d1defbde7813?orderBy=${orderBy}`,
    );
  }

  async createContact(contacts) {
    return this.HttpClient.post(`/contacts`, contacts);
  }
}

export default new ContactService();
