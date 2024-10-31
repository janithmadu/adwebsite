// schemas/user.js
export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'externalId', title: 'External ID', type: 'string' },
    { name: 'avatarUrl', title: 'Avatar URL', type: 'url' },
    {
      name: 'verifiedSeller',
      title: 'Verified Seller',
      type: 'boolean',
      description: 'Indicates if the user is a verified seller',
    },
    {
      name: 'member',
      title: 'Member',
      type: 'boolean',
      description: 'Indicates if the user is a member of the platform',
    },
  ],
};