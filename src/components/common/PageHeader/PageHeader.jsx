import { usePageHeaderData } from '@/hooks/usePageHeaderData';
import './PageHeader.scss';
import BgHeader from '@images/pageHeader/1.jpg';

const PageHeader = () => {
  const { PageHeaderTitle } = usePageHeaderData();
  const title = PageHeaderTitle;

  return (
    <section className="pageHeader">
      <div
        className="pageHeader__wrapper"
        style={{ backgroundImage: `url(${BgHeader})` }}
      >
        <div className="pageHeader__title">{title}</div>
      </div>
    </section>
  );
};

export default PageHeader;
