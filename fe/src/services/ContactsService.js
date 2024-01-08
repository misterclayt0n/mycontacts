import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.HttpClient.get(`/contacts/${id}`);
  }

  createContact(contacts) {
    return this.HttpClient.post(`/contacts`, { body: contacts });
  }
}

export default new ContactService();
