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
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return rows;
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

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query('UPDATE contacts SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *', [name, email, phone, category_id, id]);
    return row;
  }
}

module.exports = new ContactsRepository();
