// // components/AuthWrapper.tsx
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { logout, selectCurrentToken } from '@/redux/features/auth/authSlice';

// const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
//   const token = useSelector(selectCurrentToken);
//   const dispatch = useDispatch();
//   const [refreshToken] = useRefreshTokenMutation();

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (token) {
//         try {
//           // Optionally verify token or refresh it
//           // await refreshToken().unwrap();
//         } catch (error) {
//           dispatch(logout());
//         }
//       }
//     };

//     checkAuth();
//   }, [token, dispatch, refreshToken]);

//   return <>{children}</>;
// };

// export default AuthWrapper;