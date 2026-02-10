import { FC, useEffect } from 'react';
import {
  Location,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  IngredientDetailsPage,
  Login,
  NotFound404,
  OrderInfoPage,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { selectIngredients } from '@selectors';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { fetchIngredients, getUser, setAuthChecked } from '@slices';
import '../../index.css';
import styles from './app.module.css';

import { useDispatch, useSelector } from '../../services/store';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredients);

  const state = location.state as { background?: Location } | null;
  const background = state?.background;

  useEffect(() => {
    if (!ingredients.length) {
      void dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      void dispatch(getUser());
      return;
    }

    dispatch(setAuthChecked(true));
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
        />

        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />

        <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
        <Route path='/feed/:number' element={<OrderInfoPage />} />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute element={<OrderInfoPage />} />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                element={
                  <Modal title='' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
