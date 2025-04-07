import { PrimitiveAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/react/utils';

type initialValues = [PrimitiveAtom<any>, unknown][];

interface Props {
  initialValues: initialValues;
  dangerouslyForceHydrate?: boolean;
  children: React.ReactNode;
}

const HydrateAtomsProvider = (props: Props) => {
  const { initialValues, children, dangerouslyForceHydrate = false } = props;
  useHydrateAtoms(initialValues, {
    dangerouslyForceHydrate,
  });

  return <>{children}</>;
};

export { HydrateAtomsProvider };
export type { initialValues as HydrateAtomsInitialValues };
