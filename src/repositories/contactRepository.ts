import * as pg from 'pg';
import { Contact, ContactType } from 'entitites/contact';

export class ContactRepository {
  constructor(private db: pg.Pool) {}

  async createContact(contact: ContactType): Promise<pg.QueryResultRow> {
    const newContact = new Contact(contact);
    newContact.generateId();
    newContact.generateCreatedAt();
    const query =
      'INSERT INTO contacts (id, name, email, phone_number, message, created_at) VALUES ($1, $2, $3, $4, $5, $6);';
    const values = [
      newContact.getId(),
      newContact.getName(),
      newContact.getEmail(),
      newContact.getPhoneNumber(),
      newContact.getMessage(),
      newContact.getCreatedAt(),
    ];
    await this.db.query(query, values);
    return this.getContactById(newContact.getId());
  }

  async deleteContact(id: string): Promise<pg.QueryResultRow> {
    const contact = await this.getContactById(id);
    if (!contact || contact.length === 0) {
      throw new Error(`Contact with ID ${id} does not exist.`);
    }
    const query = 'DELETE FROM contacts WHERE id = $1;';
    await this.db.query(query, [id]);
    return contact;
  }

  async getAllContacts(): Promise<pg.QueryResultRow> {
    const query =
      'SELECT id, name, email, phone_number, message, created_at FROM contacts;';
    const response = await this.db.query(query);
    return response.rows;
  }

  async getContactById(id: string): Promise<pg.QueryResultRow> {
    const query =
      'SELECT id, name, email, phone_number, message, created_at FROM contacts WHERE id = $1 ORDER BY created_at DESC;';
    const response = await this.db.query(query, [id]);
    return response.rows;
  }
}
