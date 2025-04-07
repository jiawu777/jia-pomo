import { useRouter } from '@/router';
import { useAboutData } from '@/hooks/useAboutData';
import usePageVisitTracker from '@/hooks/usePageVisitTracker';
import './About.scss';

const About = () => {
  const { AboutList, AboutIntro } = useAboutData();
  const forMapItem = (item, index) => {
    return (
      <li
        key={`item${index}`}
        className={`about__item  about__item${(index + 1) % 2 === 0 ? '--even' : '--odd'}
            ${index + 1 === AboutList.length ? 'about__item--end' : ''}`}
      >
        <div className="about__desArea">
          <pre className="about__desLabel">{item.title}</pre>
          <p className="about__desTxt">{item.p}</p>
        </div>
        <div className="about__imgArea">
          <img
            className="about__img"
            src={item.img}
            alt="Img"
          />
        </div>
      </li>
    );
  };
  const child = AboutList.map(forMapItem);

  const { location } = useRouter();
  const currentPage = location.pathname.slice(1).toString();

  usePageVisitTracker(currentPage);

  return (
    <div className="about">
      <div className="about__wrapper">
        <div className="about__info">{AboutIntro}</div>
        <ul className="about__list">{child}</ul>
      </div>
    </div>
  );
};

export default About;
