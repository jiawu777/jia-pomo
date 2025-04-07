import { useTranslation } from 'react-i18next';
import AboutImg1 from '@images/About/img1.jpg';
import AboutImg2 from '@images/About/img2.jpg';
import AboutImg3 from '@images/About/img3.jpg';
import AboutImg4 from '@images/About/img4.jpg';
import AboutImg5 from '@images/About/img5.jpg';
import AboutImg6 from '@images/About/img6.jpg';
import AboutImg7 from '@images/About/img7.jpg';
import AboutImg8 from '@images/About/img8.jpg';

const useAboutData = () => {
  const { t } = useTranslation();
  const AboutIntro = t('about:intro');
  const AboutList = [
    {
      id: 'a1',
      title: t('about:a1.title'),
      p: t('about:a1.p'),
      img: AboutImg1,
    },
    {
      id: 'a2',
      title: t('about:a2.title'),
      p: t('about:a2.p'),
      img: AboutImg2,
    },
    {
      id: 'a3',
      title: t('about:a3.title'),
      p: t('about:a3.p'),
      img: AboutImg3,
    },
    {
      id: 'a4',
      title: t('about:a4.title'),
      p: t('about:a4.p'),
      img: AboutImg4,
    },
    {
      id: 'a5',
      title: t('about:a5.title'),
      p: t('about:a5.p'),
      img: AboutImg5,
    },
    {
      id: 'a6',
      title: t('about:a6.title'),
      p: t('about:a6.p'),
      img: AboutImg6,
    },
    {
      id: 'a7',
      title: t('about:a7.title'),
      p: t('about:a7.p'),
      img: AboutImg7,
    },
    {
      id: 'a8',
      title: t('about:a8.title'),
      p: t('about:a8.p'),
      img: AboutImg8,
    },
  ];
  return { AboutList, AboutIntro };
};

export { useAboutData };
