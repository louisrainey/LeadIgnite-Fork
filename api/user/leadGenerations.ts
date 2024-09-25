import prisma from '../../lib/prisma'; // Import the singleton PrismaClient
// Create a new lead
async function createLead(data: any) {
  try {
    const lead = await prisma.leadTypeGlobal.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        status: data.status, // Ensure this matches a LeadStatus enum value
        companyInfoId: data.companyInfoId,
        summary: data.summary, // Add this field
        bed: data.bed, // Add this field
        bath: data.bath, // Add this field
        sqft: data.sqft, // Add this field
        lastUpdate: new Date(), // Or use data.lastUpdate if provided
        address1: data.address1 // Add this field
        // Include any other fields as necessary
      }
    });

    console.log('Lead created:', lead);
    return lead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

// Read leads
async function getLeads() {
  try {
    const leads = await prisma.leadTypeGlobal.findMany();
    console.log('Leads:', leads);
    return leads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

// Update a lead
async function updateLead(leadId: string, updateData: any) {
  try {
    const updatedLead = await prisma.leadTypeGlobal.update({
      where: { id: leadId },
      data: updateData
    });
    console.log('Lead updated:', updatedLead);
    return updatedLead;
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

// Delete a lead
async function deleteLead(leadId: string) {
  try {
    const deletedLead = await prisma.leadTypeGlobal.delete({
      where: { id: leadId }
    });
    console.log('Lead deleted:', deletedLead);
    return deletedLead;
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

// Example usage
createLead({
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  phone: '123-456-7890',
  status: 'New_Lead',
  companyInfoId: 'some-company-id'
})
  .then(() => getLeads())
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect());
