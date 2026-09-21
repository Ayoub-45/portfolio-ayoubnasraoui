export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Cache for 1 hour via ISR
import { getPayload } from 'payload'
import config from '@/payload.config'
import ServicesClient from '../components/ServicesClient'

export default async function ServicesPage() {
  const payload = await getPayload({ config })

  const servicesData = await payload.find({
    collection: 'services',
    // Retrieves items in the order they are arranged in the admin UI
    sort: 'createdAt',
  })

  return <ServicesClient services={servicesData.docs} />
}
