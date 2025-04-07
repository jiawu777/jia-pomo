import { useState } from 'react';
import { changeLanguage } from 'i18next';
import { LanguageType } from '@/i18n';
import { useFooterData } from '@/hooks/useFooterData';
import './Footer.scss';

const Footer = () => {
  const { FooterCompany, FooterCopyright, FooterButton } = useFooterData();
  const [lang, setLang] = useState(LanguageType.ZH_TW);
  const handleChangeLanguage = () => {
    let newLang = '';
    if (lang === LanguageType.EN) {
      newLang = LanguageType.ZH_TW;
    } else {
      newLang = LanguageType.EN;
    }
    setLang(newLang);
    changeLanguage(newLang);
  };

  return (
    <div className="footer__wrapper">
      <div className="footer__info">
        <div className="footer__info footer__info--company"> {FooterCompany}</div>
        <div className="footer__info footer__info--copyright">{FooterCopyright}</div>
      </div>
      <button
        className="footer__btn"
        onClick={handleChangeLanguage}
      >
        {FooterButton}
      </button>
    </div>
  );
};

export default Footer;
