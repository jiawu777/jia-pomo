import { useTranslation } from 'react-i18next';

const usePageHeaderData = () => {
  const { t } = useTranslation();
  const PageHeaderTitle = t('pageheader:PageHeaderTitle');
  return { PageHeaderTitle };
};

export { usePageHeaderData };
