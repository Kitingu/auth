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
          url: '/basic/buttons'
        },
        {
          id: 'badges',
          title: 'permissions',
          type: 'item',
          url: '/basic/badges'
        },
        {
          id: 'breadcrump',
          title: 'roles',
          type: 'item',
          url: '/basic/breadcrumb'
        },
        {
          id: 'collapse',
          title: 'Collapse',
          type: 'item',
          url: '/basic/collapse'
        },
        {
          id: 'tabs-pills',
          title: 'Tabs-pills',
          type: 'item',
          url: '/basic/tabs-pills'
        },
        {
          id: 'typography',
          title: 'Typography',
          type: 'item',
          url: '/basic/typography'
        }
      ]
    }
  ]
};

export default uiComponents;
