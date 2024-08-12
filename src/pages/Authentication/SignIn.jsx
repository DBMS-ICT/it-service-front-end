import { Link, Navigate } from 'react-router-dom';
import Logo from '../../assets/images/logo/krg_logo_2480x2056.png';
import Input from '../../components/common/Input';
import Label from '../../components/common/Label';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useSigninMutation } from '../../app/api/user';
import { toast } from 'react-hot-toast';
const SignIn = () => {
  const [signin, { isLoading, isError, error, isSuccess, data }] =
    useSigninMutation();

  const { language, rtl } = useSelector((state) => state.language);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (
      data?.status === 'success' &&
      !isError &&
      !isLoading &&
      data?.data?.token
    ) {
      localStorage.setItem('user', JSON.stringify(data?.data?.token));
      // dispatch(setRole(data?.data?.data));
    } else if (data?.status == 404) {
      toast.error(
        language == 'en'
          ? 'User not found'
          : language == 'ar'
          ? 'المستخدم غير موجود'
          : 'بەکارهێنەر نەدۆزرایەوە',
        {
          className: ' p-[16px] rounded flex items-center gap-[10px]',
        }
      );
    }
  }, [data, isError, isLoading]);

  if (data?.status === 'success' && data?.data?.token) {
    if (data?.data?.data?.role === 'admin') return <Navigate to="/" replace />;
    if (data?.data?.data?.role === 'emp')
      return <Navigate to="/processing" replace />;
  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSignin = (e) => {
    e.preventDefault();
    if (userData.password.length < 8) {
      toast.error(
        language == 'en'
          ? 'Password must be at least 8 characters long'
          : language == 'ar'
          ? 'كلمة المرور يجب ان تكون على الاقل 8 حروف'
          : 'پێویستە وشەی نهێنی لانیکەم ٨ پیت بێت'
      );
      return;
    }
    signin(userData);
  };
  return (
    <>
      <div
        className="rounded-sm border border-stroke
       bg-white shadow-default dark:border-strokedark
        dark:bg-boxdark min-h-screen flex flex-col 
         justify-between text-boxdark dark:text-white"
      >
        <div></div>
        <div
          className={`flex flex-wrap items-center
        ${rtl ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
        >
          <div className="hidden xl:flex justify-center items-center xl:w-1/2">
            <div className="py-17.5 w-[80%] px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/"></Link>

              <p className="2xl:px-20 font-bold">
                {language == 'en'
                  ? 'Ministry of Peshmerga'
                  : language == 'ar'
                  ? 'وزارة البيشمركة'
                  : 'وەزارەتی پێشمەرگە'}
              </p>

              <div
                className="mt-15 flex justify-center items-center
               overflow-hidden "
              >
                <img className="" src={Logo} alt="Logo" />
              </div>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2
                className={`mb-9 text-2xl font-bold text-black 
              dark:text-white sm:text-title-xl2 ${
                rtl ? 'text-right' : 'text-left'
              }`}
              >
                {language == 'en'
                  ? 'Sign In'
                  : language == 'ar'
                  ? 'تسجيل الدخول'
                  : 'چوونە ژوورەوە'}
              </h2>

              <form onSubmit={handleSignin}>
                <div className="mb-4">
                  <Label
                    text={
                      language == 'en'
                        ? 'Email'
                        : language == 'ar'
                        ? 'البريد الالكتروني'
                        : 'ئیمەیڵ'
                    }
                    textSize="text-lg font-medium mx-3"
                  />
                  <div className="relative">
                    <Input
                      type="email"
                      reqired={true}
                      onChange={handleInput}
                      name={'email'}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label
                    text={
                      language == 'en'
                        ? 'Password'
                        : language == 'ar'
                        ? 'كلمة المرور'
                        : 'وشەی نهێنی'
                    }
                    textSize="text-lg font-medium mx-3"
                  />
                  <div className="relative">
                    <Input
                      name={'password'}
                      onChange={handleInput}
                      reqired={true}
                      isPassword={showPassword}
                      type={showPassword ? 'text' : 'password'}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`
                    w-full text-right px-5 pt-3 outline-none
                     text-[#676b72] flex ${
                       rtl ? 'justify-start' : 'justify-end'
                     }`}
                  >
                    {!showPassword ? (
                      <IoEye className="text-body " size={20} />
                    ) : (
                      <IoEyeOff className="text-body " size={20} />
                    )}
                  </button>
                </div>
                <div className="mb-5">
                  <PrimaryButton
                    type={'submit'}
                    content={
                      language == 'en'
                        ? 'Sign In'
                        : language == 'ar'
                        ? 'تسجيل الدخول'
                        : 'چوونە ژوورەوە'
                    }
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    {language == 'en'
                      ? 'forgot password'
                      : language == 'ar'
                      ? 'هل نسيت كلمة المرور'
                      : 'وشەی نهێنی لەبیر کردووە'}
                    <Link to="/forget-password" className="text-primary">
                      {language == 'en'
                        ? 'click here'
                        : language == 'ar'
                        ? 'انقر هنا'
                        : 'کرتەی ئێرە بکە'}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer showLang={true} />
      </div>
    </>
  );
};

export default SignIn;
