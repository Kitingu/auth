// ==============================|| MENU ITEMS - UI-COMPONENTS ||============================== //

const uiComponents = {
  id: 'group-ui-components',
  title: 'Staff Management',
  type: 'group',
  children: [
    {
      id: 'basic',
      title: 'users',
      icon: <i className="ph ph-pencil-ruler" />,
      type: 'collapse',
      children: [
        {
          id: 'buttons',
          title: 'Users',
          type: 'item',
          url: '/users'
        },
        {
          id: 'badges',
          title: 'permissions',
          type: 'item',
          url: '/users'
        },
        {
          id: 'breadcrump',
          title: 'roles',
          type: 'item',
          url: '/roles'
        }
       
      ]
    }
  ]
};

export default uiComponents;
