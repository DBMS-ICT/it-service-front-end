import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './components/common/Loader';
import UpdateForgetPassword from './pages/common/UpdateForgetPassword';
const EditeProcessingRequest = lazy(() =>
  import('./pages/admin/EditeProcessingRequest')
);
const AdminProtect = lazy(() => import('./routes/AdminProtect'));
const ProcessingRequest = lazy(() => import('./pages/admin/ProcessingRequest'));
const Users = lazy(() => import('./pages/admin/Users'));
const NewUsers = lazy(() => import('./pages/admin/NewUsers'));
const EditNewRequest = lazy(() =>
  import('./components/new.request/EditNewRequest')
);
const CompleteRequest = lazy(() => import('./pages/admin/CompleteRequest'));
const EditCompeletRequest = lazy(() =>
  import('./components/complete.request/EditCompeletRequest')
);
const AccountSetting = lazy(() => import('./pages/common/AccountSetting'));
const UpdatePassword = lazy(() => import('./pages/common/UpdatePassword'));
const UserProtect = lazy(() => import('./routes/UserProtect'));
const AllProtect = lazy(() => import('./routes/AllProtect'));
const SigninProtect = lazy(() => import('./routes/SigninProtect'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Directory = lazy(() => import('./pages/admin/Directory'));
const Repair = lazy(() => import('./pages/admin/Repair'));
const Request = lazy(() => import('./pages/directory/Request'));
const SignUp = lazy(() => import('./pages/Authentication/SignUp'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const NewRequst = lazy(() => import('./pages/admin/NewRequst'));
const ForgetPassword = lazy(() =>
  import('./pages/Authentication/ForgetPassword')
);
const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const [signinProtec, setSigninProtec] = useState('a');

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto z-99999"
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/request" element={<Request />} />
          <Route
            path="/update-password/:id"
            element={<UpdateForgetPassword />}
          />
          <Route element={<SigninProtect />}>
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Route>
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* admin */}
          <Route element={<AdminProtect />}>
            <Route element={<DefaultLayout />}>
              {/* Admin */}
              <Route path="/directory" element={<Directory />} />
              {/* ------------------------------------------- */}
              <Route path="/repair" element={<Repair />} />
              {/* Admin */}
              <Route path="/" element={<NewRequst />} />
              {/* ------------------------------------------- */}
              {/* Admin */}
              <Route
                path="/new/request/edit/:id"
                element={<EditNewRequest />}
              />
              {/* ------------------------------------------- */}
              {/* Admin */}
              <Route path="/users" element={<Users />} />
              {/* ------------------------------------------- */}
              {/* Admin */}
              <Route path="/new/users" element={<NewUsers />} />
              {/* ------------------------------------------- */}
            </Route>
          </Route>
          {/* admin user */}
          <Route element={<AllProtect />}>
            <Route element={<DefaultLayout />}>
              {/* Admin user */}
              <Route
                path="/processing/request/edit/:id"
                element={<EditeProcessingRequest />}
              />
              {/* Admin user */}
              <Route path="/processing" element={<ProcessingRequest />} />
              {/* ------------------------------------------- */}
              {/* ------------------------------------------- */}
              {/* Admin user */}
              <Route path="/complete/request" element={<CompleteRequest />} />
              {/* ------------------------------------------- */}
              {/* admin user */}
              <Route
                path="/complete/request/edit/:id"
                element={<EditCompeletRequest />}
              />
              {/* ------------------------------------------- */}
              {/* Admin user */}
              {/* <Route path="/processing" element={<ProcessingRequest />} /> */}
              {/* ------------------------------------------- */}
              {/* Admin user */}
              <Route path="/account-setting" element={<AccountSetting />} />
              {/* ------------------------------------------- */}
              {/* Admin user */}
              <Route path="/update/password" element={<UpdatePassword />} />
              {/* ------------------------------------------- */}
            </Route>
          </Route>
          {/* user */}
          <Route element={<UserProtect />}>
            <Route element={<DefaultLayout />}>
              {/* Admin user */}
              <Route
                path="/processing/request/edit/:id"
                element={<EditeProcessingRequest />}
              />
              {/* ------------------------------------------- */}
              {/* Admin user */}
              <Route path="/complete/request" element={<CompleteRequest />} />
              {/* ------------------------------------------- */}
              {/* admin user */}
              <Route
                path="/complete/request/edit/:id"
                element={<EditCompeletRequest />}
              />
              {/* ------------------------------------------- */}
              {/* Admin user */}
              <Route path="/account-setting" element={<AccountSetting />} />
              {/* ------------------------------------------- */}
              {/* Admin user */}
              <Route path="/update-password" element={<UpdatePassword />} />
              {/* ------------------------------------------- */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
