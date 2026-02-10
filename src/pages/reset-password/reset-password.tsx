import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPassword } from '@slices';
import { ResetPasswordUI } from '@ui-pages';

import { useDispatch } from '../../services/store';

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorText, setErrorText] = useState<string | undefined>(undefined);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText(undefined);

    const submitReset = async () => {
      try {
        await dispatch(resetPassword({ password, token })).unwrap();
        localStorage.removeItem('resetPassword');
        navigate('/login');
      } catch (error) {
        setErrorText(
          typeof error === 'string' ? error : 'Не удалось сбросить пароль'
        );
      }
    };

    void submitReset();
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={errorText}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
