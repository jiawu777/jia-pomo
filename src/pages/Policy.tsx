import { Layout, LayoutHeader, LayoutMain, LayoutFooter } from '@/layout/Layout';
import Policy from '@/components/Modules/Policy';

const PagePolicy = () => {
  return (
    <Layout>
      <LayoutHeader />
      <LayoutMain>
        <Policy />
      </LayoutMain>
      <LayoutFooter />
    </Layout>
  );
};

export default PagePolicy;
