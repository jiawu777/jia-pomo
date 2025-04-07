import { useHydrateAtoms } from 'jotai/react/utils';
import { HydrateAtomsInitialValues } from './HydrateAtomsProvider';

/**
 * @example
 * withHydrateAtoms(myInitialValues)(MyComponent);
 */
function withHydrateAtoms(initialValues: HydrateAtomsInitialValues) {
  return function (WrappedComponent: any) {
    return function HydrateAtoms(props: any): React.ReactNode {
      useHydrateAtoms(initialValues);

      return <WrappedComponent {...props} />;
    };
  };
}

export { withHydrateAtoms };
