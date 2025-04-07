import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/router';
import Imgh1 from '@images/Header/menuIcon/imgh1.png';
import Imgh2 from '@images/Header/menuIcon/imgh2.png';
import Imgh3 from '@images/Header/menuIcon/imgh3.png';
import Imgh4 from '@images/Header/menuIcon/imgh4.png';

const useNavigationData = () => {
  const { t } = useTranslation();
  const NavigationListTitle = [
    {
      id: 'n1',
      title: t('navigation:n1.title'),
      path: '',
    },
    {
      id: 'n2',
      title: t('navigation:n2.title'),
      path: '',
    },
    {
      id: 'n3',
      title: t('navigation:n3.title'),
      path: '',
    },
    {
      id: 'n4',
      title: t('navigation:n4.title'),
      path: '',
    },
    {
      id: 'n5',
      title: t('navigation:n5.title'),
      path: '',
    },
    {
      id: 'n6',
      title: t('navigation:n6.title'),
      path: ROUTES.About,
    },
    {
      id: 'n7',
      title: t('navigation:n7.title'),
      path: ROUTES.Policy,
    },
  ];
  const NavigationIcon = [
    { id: 'n1', img: Imgh1 },
    { id: 'n2', img: Imgh2 },
    { id: 'n3', img: Imgh3 },
    { id: 'n4', img: Imgh4 },
  ];

  return {
    NavigationListTitle,
    NavigationIcon,
  };
};

export { useNavigationData };
