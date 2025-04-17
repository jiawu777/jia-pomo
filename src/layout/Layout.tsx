import { use100vh } from 'react-div-100vh';
import { useAtomValue } from 'jotai';
import { timerStateAtom } from '@/atoms/taskAtoms';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import './Layout.scss';

interface IProps {
  children?: React.ReactNode;
}

const Layout = (props: IProps) => {
  const { children } = props;
  const height = use100vh() as number;
  return (
    <section className="layout">
      <section
        className="layout__wrapper"
        style={{ height }}
      >
        {children}
      </section>
    </section>
  );
};

const LayoutHeader = () => {
  return (
    <header className="layout__header">
      <Header />
    </header>
  );
};

const LayoutPageHeader = (props: IProps) => {
  const { children } = props;
  return <header className="layout__pageHeader">{children}</header>;
};

const LayoutNavBar = (props: IProps) => {
  const { children } = props;
  return <section className="layout__navBar">{children}</section>;
};

const LayoutMain = (props: IProps) => {
  const state = useAtomValue(timerStateAtom);
  const { children } = props;
  return (
    <main
      className={`layout__main ${state === 'work' ? 'layout__main--work' : 'layout__main--break'}`}
    >
      {children}
    </main>
  );
};

const LayoutFooter = () => {
  return (
    <footer className="layout__footer">
      <Footer />
    </footer>
  );
};

export { Layout, LayoutHeader, LayoutPageHeader, LayoutNavBar, LayoutMain, LayoutFooter };
