import { Layout, LayoutHeader, LayoutMain, LayoutFooter } from '@/layout/Layout';
import Countdown from '@/components/Modules/Countdown';
import InputData from '@/components/Modules/InputData';

const PageCountdown = () => {
  return (
    <Layout>
      <LayoutMain>
        <Countdown />
        <InputData />
      </LayoutMain>
    </Layout>
  );
};

export default PageCountdown;
