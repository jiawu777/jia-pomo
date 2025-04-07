import { useTranslation } from 'react-i18next';

const usePolicyData = () => {
  const { t } = useTranslation();
  const PolicyTitle = t('policy:pageTitle');
  const PolicyList = [
    {
      id: 'p1',
      title: t('policy:p1.title'),
      content: t('policy:p1.content'),
    },
    {
      id: 'p2',
      title: t('policy:p2.title'),
      content: t('policy:p2.content'),
    },
    {
      id: 'p3',
      title: t('policy:p3.title'),
      content: t('policy:p3.content'),
    },
    {
      id: 'p4',
      title: t('policy:p4.title'),
      content: t('policy:p4.content'),
    },
    {
      id: 'p5',
      title: t('policy:p5.title'),
      content: t('policy:p5.content'),
    },
    {
      id: 'p6',
      title: t('policy:p6.title'),
      content: t('policy:p6.content'),
    },
    {
      id: 'p7',
      title: t('policy:p7.title'),
      content: t('policy:p7.content'),
    },
    {
      id: 'p8',
      title: t('policy:p8.title'),
      content: t('policy:p8.content'),
    },
    {
      id: 'p9',
      title: t('policy:p9.title'),
      content: t('policy:p9.content'),
    },
    {
      id: 'p10',
      title: t('policy:p10.title'),
      content: t('policy:p10.content'),
    },
    {
      id: 'p11',
      title: t('policy:p11.title'),
      content: t('policy:p11.content'),
    },
  ];
  return {
    PolicyList,
    PolicyTitle,
  };
};

export { usePolicyData };
