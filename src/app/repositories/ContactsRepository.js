const { v4: uuidv4 } = require('uuid');

let contacts = [
  {
    id: uuidv4(),
    name: 'clayton',
    email: 'daviarantes13@gmail.com',
    phone: '123123123',
    category_id: uuidv4(),
  },
  {
    id: uuidv4(),
    name: 'rodolfo',
    email: 'arantes.dr@gmail.com',
    phone: '123123123',
    category_id: uuidv4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
