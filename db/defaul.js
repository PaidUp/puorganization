const db = 0

db.pu_organization_beneficiaries.createIndex({
  organizationName: 'text',
  firstName: 'text',
  lastName: 'text',
  assigneesEmail: 'text'
},
{
  name: 'text-search'
})
