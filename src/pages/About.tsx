import { Layout, LayoutHeader, LayoutMain, LayoutFooter, LayoutPageHeader } from '@/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import About from '@/components/Modules/About';

const PageAbout = () => {
  return (
    <Layout>
      <LayoutHeader />
      <LayoutPageHeader>
        <PageHeader />
      </LayoutPageHeader>
      <LayoutMain>
        <About />
      </LayoutMain>
      <LayoutFooter />
    </Layout>
  );
};

export default PageAbout;
