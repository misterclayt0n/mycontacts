const { v4: uuidv4 } = require('uuid');

const db = require('../../database/index');

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

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
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

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query('INSERT INTO contacts(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *', [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
