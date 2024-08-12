import { Link, Navigate } from 'react-router-dom';
import Logo from '../../assets/images/logo/krg_logo_2480x2056.png';
import Input from '../../components/common/Input';
import Label from '../../components/common/Label';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Select from '../../components/common/Select';
import toast from 'react-hot-toast';
import { useAddUserMutation } from '../../app/api/user';
const SignUp = () => {
  const { language, rtl } = useSelector((state) => state.language);
  const [showPassword, setShowPassword] = useState(false);
  const [
    addUser,
    {
      isLoading: addLoading,
      isError: addISErro,
      error: addError,
      isSuccess: addSuccess,
      data: addData,
    },
  ] = useAddUserMutation();
  useEffect(() => {
    if (addSuccess && addData?.status == 'success') {
      toast.success(
        language == 'en'
          ? 'Sign Up Success'
          : language == 'ar'
          ? 'تسجيل الدخول بنجاح'
          : 'بەسەرکەوتویی تۆمار بووی'
      );
      setData({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: '',
      });
      return;
    }
    if (addSuccess && addData?.status == 'exist') {
      toast.error(
        language == 'en'
          ? 'This email already exist'
          : language == 'ar'
          ? 'البريد الالكتروني موجود بالفعل'
          : 'ئەم ئیمەیڵ پێشتر بوونی هەیە'
      );
      return;
    }
    if (addSuccess && addData?.status == 'password-required') {
      toast.error(
        language == 'en'
          ? 'Password is required'
          : language == 'ar'
          ? 'كلمة المرور مطلوبة'
          : 'وشەی نهێنی پێویستە'
      );
      return;
    }
    if (addSuccess && addData?.status == 'password-not-match') {
      toast.error(
        language == 'en'
          ? 'Password not match'
          : language == 'ar'
          ? 'كلمة المرور غير متطابقة'
          : 'وشەی نهێنی یەکناگرێتەوە'
      );
      return;
    }
  }, [addLoading]);
  const [data, setData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const handlInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handlSubmit = (e) => {
    if (data.password.length < 8) {
      toast.error(
        language == 'en'
          ? 'Password must be at least 8 characters long'
          : language == 'ar'
          ? 'كلمة المرور يجب ان تكون على الاقل 8 حروف'
          : 'پێویستە وشەی نهێنی لانیکەم ٨ پیت بێت'
      );
      return;
    }
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error(
        language == 'en'
          ? 'Password not match'
          : language == 'ar'
          ? 'كلمة المرور غير متطابقة'
          : 'وشەی نهێنی یەکناگرێتەوە'
      );
      return;
    }
    addUser(data);
  };
  if (addSuccess && addData?.status == 'success') {
    return <Navigate to="/auth/signin" />;
  }
  return (
    <>
      <div
        className="rounded-sm border border-stroke
       bg-white shadow-default dark:border-strokedark
        dark:bg-boxdark min-h-screen flex flex-col 
         justify-between"
      >
        <div></div>
        <div
          className={`flex flex-wrap items-center
        ${rtl ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
        >
          <div className="hidden xl:flex justify-center items-center xl:w-1/2">
            <div className="py-17.5 w-[80%] px-26 text-center">
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
                  ? 'Self registration'
                  : language == 'ar'
                  ? 'التسجيل الذاتي'
                  : 'خۆ تۆمارکردن'}
              </h2>

              <form onSubmit={handlSubmit}>
                {/* -------------- fullname -------------- */}
                <div className="mb-4">
                  <Label
                    text={
                      language == 'en'
                        ? 'Full Name'
                        : language == 'ar'
                        ? 'اسم كامل'
                        : 'ناوی تەواو'
                    }
                    textSize="text-lg font-medium mx-3"
                  />
                  <div className="relative">
                    <Input
                      type="text"
                      name={'fullname'}
                      onChange={handlInput}
                      value={data.fullname}
                      reqired={true}
                    />
                  </div>
                </div>
                {/* -------------- email -------------- */}
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
                      reqired={true}
                      type="email"
                      name={'email'}
                      onChange={handlInput}
                      value={data.email}
                    />
                  </div>
                </div>
                {/* -------------- phone number -------------- */}
                <div className="mb-4">
                  <Label
                    text={
                      language == 'en'
                        ? 'Phone Number'
                        : language == 'ar'
                        ? 'رقم الهاتف'
                        : 'ژمارەی مۆبایل'
                    }
                    textSize="text-lg font-medium mx-3"
                  />
                  <div className="relative">
                    <Input
                      type="text"
                      name={'phone'}
                      onChange={handlInput}
                      value={data.phone}
                      reqired={true}
                    />
                  </div>
                </div>
                {/* -------------- gender -------------- */}
                <div className="mb-4">
                  <Label
                    text={
                      language == 'en'
                        ? 'Gender'
                        : language == 'ar'
                        ? 'جنس'
                        : 'رەگەز'
                    }
                    textSize="text-lg font-medium mx-3"
                  />
                  <div className="relative">
                    <Select
                      name={'gender'}
                      onChange={handlInput}
                      value={data.gender}
                      reqired={true}
                      option={[
                        {
                          name: 'male',
                          gender:
                            language == 'en'
                              ? 'Male'
                              : language == 'ar'
                              ? 'ذكر'
                              : 'نێر',
                        },
                        {
                          name: 'female',
                          gender:
                            language == 'en'
                              ? 'Female'
                              : language == 'ar'
                              ? 'انثني'
                              : 'مێ',
                        },
                      ]}
                      objName={'gender'}
                    />
                  </div>
                </div>
                {/* -------------- password -------------- */}
                <div>
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
                      reqired={true}
                      name={'password'}
                      onChange={handlInput}
                      value={data.password}
                      isPassword={showPassword}
                      type={showPassword ? 'text' : 'password'}
                    />
                  </div>
                  {/* show password */}
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
                {/* -------------- confirm password -------------- */}
                <div className="mb-6">
                  <Label
                    text={
                      language == 'en'
                        ? 'Confirm Password'
                        : language == 'ar'
                        ? 'تاكيد كلمة المرور'
                        : 'دووبارە کردنەوەی وشەی نهێنی'
                    }
                    textSize="text-lg font-medium mx-3"
                  />
                  <div className="relative">
                    <Input
                      reqired={true}
                      name={'confirmPassword'}
                      onChange={handlInput}
                      value={data.confirmPassword}
                      isPassword={showPassword}
                      type={showPassword ? 'text' : 'password'}
                    />
                  </div>
                  {/* show password */}
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
                {/* -------------- submit -------------- */}
                <div className="mb-5">
                  <PrimaryButton
                    type={'submit'}
                    content={
                      language == 'en'
                        ? 'Submit'
                        : language == 'ar'
                        ? 'يُقدِّم'
                        : 'پێشکەشکردن'
                    }
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    {language == 'en'
                      ? 'Go to the '
                      : language == 'ar'
                      ? 'الذهاب '
                      : 'بڕۆ بۆ '}{' '}
                    <Link to="/auth/signin" className="text-primary">
                      {language == 'en'
                        ? 'Sign In'
                        : language == 'ar'
                        ? 'تسجيل الدخول'
                        : 'چوونە ژوورەوە'}
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

export default SignUp;
