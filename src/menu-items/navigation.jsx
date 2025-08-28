// const icons = {
//   distributor: <i className="ph ph-factory" />, // better than 'warehouse'
//   dashboard: <i className="ph ph-gauge" />,     // better for a dashboard
//   retailers: <i className="ph ph-storefront" />, // more specific than 'shopping-cart'
//   letters: <i className="ph ph-file-text" />,
//   config: <i className="ph ph-sliders-horizontal" />,
//   edit: <i className="ph ph-pencil-simple-line" />
// };

const icons = {
  distributor: <i className="ph ph-factory" />, // better than 'warehouse'
  dashboard: <i className="ph ph-gauge" />,     // better for a dashboard
  retailers: <i className="ph ph-storefront" />, // more specific than 'shopping-cart'
  letters: <i className="ph ph-file-text" />,
  config: <i className="ph ph-sliders-horizontal" />,
  edit: <i className="ph ph-pencil-simple-line" />
};

const navigation = {
  id: 'group-dashboard-loading-unique',
  title: 'Distributorship',
  type: 'group',
  icon: icons.dashboard,
  children: [
    {
      id: 'dashboard',
      title: 'Retailers',
      type: 'collapse',
      icon: icons.config,
      children: [
        {
          id: 'retailers',
          title: 'Retailers',
          type: 'item',
          icon: icons.retailers,
          url: '/retailers'
        },
        {
          id: 'auth-letters',
          title: 'Auth Letters',
          type: 'item',
          icon: icons.letters,
          url: '/auth-letters'
        }
      ]
    },

    {
      id: 'distributors',
      title: 'Distributors',
      type: 'collapse',
      icon: icons.config,
      children: [
        {
          id: 'distributors',
          title: 'distributors',
          type: 'item',
          icon: icons.distributor,
          url: '/distributors'
        },
        {
          id: 'dist-letters',
          title: 'Auth Letters',
          type: 'item',
          icon: icons.letters,
          url: '/distributor-letters'
        }
      ]
    },
     {
      id: 'documents',
      title: 'Documents',
      type: 'collapse',
      icon: icons.config,
      children: [
        {
          id: 'docs',
          title: 'documents',
          type: 'item',
          icon: icons.distributor,
          url: '/documents'
        },
       
      ]
    }

    
  ]
};

    //  {
    //   id: 'distributors',
    //   title: 'Distributors',
    //   type: 'item',
    //   icon: icons.distributor,
    //   url: '#'
    // },
    // {
    //   id: 'retailers',
    //   title: 'Retailers',
    //   type: 'item',
    //   icon: icons.retailers,
    //   url: '/retailers'
    // },
    //  {
    //   id: 'auth-letters',
    //   title: 'Authorization Letters',
    //   type: 'item',
    //   icon: icons.retailers,
    //   url: '/auth-letters'
    // }
//   ]
// };

export default navigation;

// sales reps
// garage repairs
