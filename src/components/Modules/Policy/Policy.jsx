import { useRouter } from '@/router';
import { usePolicyData } from '@/hooks/usePolicyData';
import usePageVisitTracker from '@/hooks/usePageVisitTracker';
import './Policy.scss';

const Policy = () => {
  const { PolicyList, PolicyTitle } = usePolicyData();

  const forMapRule = (item) => {
    return (
      <li key={item.id}>
        <label>{item.section}</label>
        <div className="policy__text policy__text--title">{item.title}</div>
        <div className="policy__text policy__text--content">{item.content}</div>
      </li>
    );
  };
  const child = PolicyList.map(forMapRule);

  const { location } = useRouter();
  const currentPage = location.pathname.slice(1).toString();

  usePageVisitTracker(currentPage);

  return (
    <div className="policy">
      <div className="policy__wrapper">
        <h1 className="policy__pageTitle">{PolicyTitle}</h1>
        <h2 className="policy__pageTitle policy__pageTitle--subtitle">{PolicyTitle}</h2>
        <ul className="policy__text">{child}</ul>
      </div>
    </div>
  );
};

export default Policy;
