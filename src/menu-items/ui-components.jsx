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
          url: '#'
        },
        {
          id: 'badges',
          title: 'permissions',
          type: 'item',
          url: '#'
        },
        {
          id: 'breadcrump',
          title: 'roles',
          type: 'item',
          url: '#'
        }
       
      ]
    }
  ]
};

export default uiComponents;
