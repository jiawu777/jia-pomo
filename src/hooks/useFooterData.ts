import { useTranslation } from 'react-i18next';

const useFooterData = () => {
  const { t } = useTranslation();
  const FooterCompany = t('footer:company');
  const FooterCopyright = t('footer:copyright');
  const FooterButton = t('footer:button');
  return {
    FooterCompany,
    FooterCopyright,
    FooterButton,
  };
};

export { useFooterData };
