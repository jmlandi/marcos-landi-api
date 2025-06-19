import { ContactRepository } from '../repositories/contactRepository';
import { ContactType } from 'entitites/contact';
import * as pg from 'pg';

export class ContactServices {
  constructor(private contactRepository: ContactRepository) {}

  async createContact(contact: ContactType): Promise<any> {
    try {
      const response = await this.contactRepository.createContact(contact);
      return response;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error('Failed to create contact');
    }
  }

  async deleteContact(id: string): Promise<any> {
    try {
      const response = await this.contactRepository.deleteContact(id);
      return response;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw new Error('Failed to delete contact');
    }
  }

  async getAllContacts(): Promise<pg.QueryResultRow> {
    try {
      const contacts = await this.contactRepository.getAllContacts();
      return contacts;
    } catch (error) {
      console.error('Error retrieving contacts:', error);
      throw new Error('Failed to retrieve contacts');
    }
  }

  async getContactById(id: string): Promise<any> {
    try {
      const contact = await this.contactRepository.getContactById(id);
      return contact;
    } catch (error) {
      console.error('Error retrieving contact by ID:', error);
      throw new Error('Failed to retrieve contact by ID');
    }
  }
}
