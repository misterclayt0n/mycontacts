const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'invalid user id' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name must be provided' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'invalid category' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'this e-mail has already been taken' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'invalid user id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'invalid category' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name must be provided' });
    }

    if (email) {
      const contactExists = await ContactsRepository.findById(id);
      if (!contactExists) {
        return response.status(404).json({ error: 'user not found' });
      }
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'this e-mail has already been taken' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'invalid user id' });
    }

    await ContactsRepository.delete(id);

    response.status(204);
  }
}

module.exports = new ContactController();
