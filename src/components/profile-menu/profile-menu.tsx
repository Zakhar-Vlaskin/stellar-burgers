import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';
import { logoutUser } from '@slices';

import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const logout = async () => {
      try {
        await dispatch(logoutUser()).unwrap();
        navigate('/login', { replace: true });
      } catch {}
    };

    void logout();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
