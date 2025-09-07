import { NextRequest, NextResponse } from 'next/server'
import { HubSpotService } from '@/lib/services/hubspot'

export async function POST(request: NextRequest) {
  try {
    const { name, email, consent } = await request.json()

    // Validate required fields
    if (!name || !email || !consent) {
      return NextResponse.json(
        { error: 'Nome, e-mail e consentimento são obrigatórios' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      )
    }

    // Check if contact already exists
    const existingContact = await HubSpotService.findContactByEmail(email)
    
    if (existingContact.success && existingContact.contactId) {
      // Update existing contact
      const updateResult = await HubSpotService.updateContact(existingContact.contactId, {
        properties: {
          email,
          firstname: name.split(' ')[0],
          lastname: name.split(' ').slice(1).join(' ') || '',
          consent: consent,
          source: 'prepse',
          last_contact_date: new Date().toISOString(),
        }
      })

      if (updateResult.success) {
        return NextResponse.json({
          success: true,
          contactId: existingContact.contactId,
          message: 'Contato atualizado com sucesso'
        })
      } else {
        return NextResponse.json(
          { error: updateResult.error || 'Erro ao atualizar contato' },
          { status: 500 }
        )
      }
    } else {
      // Create new contact
      const createResult = await HubSpotService.createContact({
        properties: {
          email,
          firstname: name.split(' ')[0],
          lastname: name.split(' ').slice(1).join(' ') || '',
          consent: consent,
          source: 'prepse',
          created_date: new Date().toISOString(),
        }
      })

      if (createResult.success) {
        return NextResponse.json({
          success: true,
          contactId: createResult.contactId,
          message: 'Contato criado com sucesso'
        })
      } else {
        return NextResponse.json(
          { error: createResult.error || 'Erro ao criar contato' },
          { status: 500 }
        )
      }
    }
  } catch (error) {
    console.error('HubSpot API error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
