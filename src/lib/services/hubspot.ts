import { HubSpotContact } from '@/types'

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY

export class HubSpotService {
  private static baseUrl = 'https://api.hubapi.com'

  static async createContact(contact: HubSpotContact): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      if (!HUBSPOT_API_KEY) {
        throw new Error('HubSpot API key not configured')
      }

      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create contact')
      }

      const data = await response.json()
      return { success: true, contactId: data.id }
    } catch (error) {
      console.error('HubSpot contact creation error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  static async updateContact(contactId: string, contact: HubSpotContact): Promise<{ success: boolean; error?: string }> {
    try {
      if (!HUBSPOT_API_KEY) {
        throw new Error('HubSpot API key not configured')
      }

      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update contact')
      }

      return { success: true }
    } catch (error) {
      console.error('HubSpot contact update error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  static async findContactByEmail(email: string): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      if (!HUBSPOT_API_KEY) {
        throw new Error('HubSpot API key not configured')
      }

      const response = await fetch(
        `${this.baseUrl}/crm/v3/objects/contacts/${email}?idProperty=email&properties=email,firstname,lastname`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          },
        }
      )

      if (response.status === 404) {
        return { success: false, error: 'Contact not found' }
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to find contact')
      }

      const data = await response.json()
      return { success: true, contactId: data.id }
    } catch (error) {
      console.error('HubSpot contact search error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }
}
