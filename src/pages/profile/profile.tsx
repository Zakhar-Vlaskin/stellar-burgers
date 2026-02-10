import { FC, ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';

import { TRegisterData } from '@api';
import { selectUpdateUserError, selectUser } from '@selectors';
import { updateUser } from '@slices';
import { ProfileUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectUpdateUserError);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const payload: Partial<TRegisterData> = {};

    if (formValue.name !== user.name) {
      payload.name = formValue.name;
    }

    if (formValue.email !== user.email) {
      payload.email = formValue.email;
    }

    if (formValue.password) {
      payload.password = formValue.password;
    }

    if (!Object.keys(payload).length) {
      return;
    }

    const saveProfile = async () => {
      try {
        await dispatch(updateUser(payload)).unwrap();
        setFormValue((prevState) => ({
          ...prevState,
          password: ''
        }));
      } catch {}
    };

    void saveProfile();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError || undefined}
    />
  );
};
