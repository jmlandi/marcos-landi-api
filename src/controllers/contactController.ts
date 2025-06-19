import { ContactRepository } from '@repositories/contactRepository';
import { ContactServices } from '@services/contactServices';
import { Request, Response } from 'express';
import { ContactType } from 'entitites/contact';
import { db } from '@config/database';

const contactRepository = new ContactRepository(db.pool);
const contactServices = new ContactServices(contactRepository);

export class ContactController {
  async handleRequest(req: Request, res: Response): Promise<void> {
    switch (req.method) {
      case 'POST':
        await this.createContact(req, res);
        break;
      case 'DELETE':
        await this.deleteContact(req, res);
        break;
      case 'GET':
        if (req.query.id) {
          await this.getContactById(req, res);
        } else {
          await this.getAllContacts(req, res);
        }
        break;
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
    }
  }

  private async createContact(req: Request, res: Response): Promise<void> {
    try {
      const contact: ContactType = req.body;
      const response = await contactServices.createContact(contact);
      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ error: 'Failed to create contact' });
    }
  }

  private async deleteContact(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id as string;
      const response = await contactServices.deleteContact(id);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  }

  private async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await contactServices.getAllContacts();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error retrieving contacts:', error);
      res.status(500).json({ error: 'Failed to retrieve contacts' });
    }
  }

  private async getContactById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id as string;
      const contact = await contactServices.getContactById(id);
      if (!contact || contact.length === 0) {
        res.status(404).json({ error: 'Contact not found' });
        return;
      }
      res.status(200).json(contact[0]);
    } catch (error) {
      console.error('Error retrieving contact by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve contact by ID' });
    }
  }
}
