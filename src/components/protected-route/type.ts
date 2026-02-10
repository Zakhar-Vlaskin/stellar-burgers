import { ReactElement } from 'react';

export type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  element: ReactElement;
};
