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
    ],
  };
  