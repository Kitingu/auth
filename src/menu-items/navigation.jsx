const icons = { distributor: <i className="ph ph-warehouse" />, dashboard: <i className="ph ph-house-line" />, retailers: <i className="ph ph-shopping-cart" /> };

const navigation = {
  id: 'group-dashboard-loading-unique',
  title: 'Distributorship',
  type: 'group',
  icon: icons.dashboard,
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: icons.dashboard,
      url: '/'
    },
     {
      id: 'distributors',
      title: 'Distributors',
      type: 'item',
      icon: icons.distributor,
      url: '#'
    },
    {
      id: 'retailers',
      title: 'Retailers',
      type: 'item',
      icon: icons.retailers,
      url: '/retailers'
    },
     {
      id: 'auth-letters',
      title: 'Authorization Letters',
      type: 'item',
      icon: icons.retailers,
      url: '/auth-letters'
    }

  ]
};

export default navigation;


// sales reps
// garage repairs