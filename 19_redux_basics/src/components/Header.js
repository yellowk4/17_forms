import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import classes from './Header.module.css';

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated); //useSelector 함수를 사용하여 상태를 가져올 수 있습니다. 이 함수는 리덕스 스토어의 상태를 가져오는 데 사용됩니다. state.auth.isAuthenticated는 authSlice.reducer의 isAuthenticated 키를 의미합니다.
  const dispatch = useDispatch(); //useDispatch 함수를 사용하여 액션을 보낼 수 있습니다. 이 함수는 리덕스 스토어의 dispatch 메서드를 반환합니다.

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
