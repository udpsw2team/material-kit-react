// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: '',
    path: '/dashboard/statistics',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: '',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: '',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: '',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: '',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: '',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
