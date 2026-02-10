import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPassword } from '@slices';
import { ForgotPasswordUI } from '@ui-pages';

import { useDispatch } from '../../services/store';

export const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setErrorText(undefined);

    const requestReset = async () => {
      try {
        await dispatch(forgotPassword({ email })).unwrap();
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      } catch (error) {
        setErrorText(
          typeof error === 'string'
            ? error
            : 'Не удалось отправить письмо для сброса пароля'
        );
      }
    };

    void requestReset();
  };

  return (
    <ForgotPasswordUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
