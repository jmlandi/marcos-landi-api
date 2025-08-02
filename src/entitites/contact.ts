import { v4 as uuid } from 'uuid';

export type ContactType = {
  name: string;
  email: string;
  phoneNumber: string | null;
  message: string;
  id?: string;
  createdAt?: Date;
};

export class Contact {
  constructor(private contact: ContactType) {
    // Validate required fields first
    if (!contact.name || !contact.email) {
      throw new Error(
        '[INVALID] Name and email are required when creating a new Contact.'
      );
    }
    if (!contact.email.includes('@')) {
      throw new Error('[INVALID] Email must be a valid email address.');
    }
    if(contact.phoneNumber) {
      if (!/^\+?[1-9]\d{1,14}$/.test(contact.phoneNumber)) {
        throw new Error(
          '[INVALID] Phone number must be a valid international phone number.'
        );
      }
    }
    if (contact.message && contact.message.length > 800) {
      throw new Error('[INVALID] Message must be less than 800 characters.');
    }
  }

  generateId(): void {
    if (!this.contact.id) {
      this.contact.id = uuid();
    }
  }

  getId(): string {
    if (!this.contact.id) {
      throw new Error('Contact ID is not set.');
    }
    return this.contact.id;
  }

  getName(): string {
    return this.contact.name;
  }

  getEmail(): string {
    return this.contact.email;
  }

  getPhoneNumber(): string {
    return this.contact.phoneNumber || '';
  }

  getMessage(): string {
    return this.contact.message || '';
  }

  generateCreatedAt(): void {
    if (!this.contact.createdAt) {
      this.contact.createdAt = new Date();
    }
  }

  getCreatedAt(): Date {
    if (!this.contact.createdAt) {
      throw new Error('Contact creation date is not set.');
    }
    return this.contact.createdAt;
  }

  getContact(): ContactType {
    return this.contact;
  }

  getWhatsAppUrl(): string {
    if (!this.contact.phoneNumber) {
      throw new Error('Phone number is not set for WhatsApp URL generation.');
    }
    const phoneNumber = this.contact.phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
    return `https://wa.me/${phoneNumber}`;
  }
}
