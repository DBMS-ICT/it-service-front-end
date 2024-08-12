import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo/krg_logo_2480x2056.png';
import Input from '../../components/common/Input';
import Label from '../../components/common/Label';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForgetPasswordMutation } from '../../app/api/user';
import toast from 'react-hot-toast';
import LanguageChange from '../../components/header/LanguageChange';
import DarkModeSwitcher from '../../components/header/DarkModeSwitcher';

const ForgetPassword = () => {
  const { language, rtl } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.setUser);
  const [ForgetPassword, { isError, isSuccess, error, data }] =
    useForgetPasswordMutation();

  const [email, setEmail] = useState({
    email: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ForgetPassword(email);
  };

  useEffect(() => {
    if (isSuccess && data?.status === 'success') {
      toast.success(
        language === 'en'
          ? 'Password reset email sent'
          : language === 'ar'
          ? 'تم إرسال البريد الإلكتروني لإعادة تعيين كلمة المرور'
          : 'ئیمەیڵی نوێکردنەوەی وشەی نهێنی نێردرا'
      );
      return;
    }
    if (error?.data?.data?.message === 'email-not-found') {
      toast.error(
        language === 'en'
          ? 'Email not found'
          : language === 'ar'
          ? 'البريد الالكتروني غير موجود'
          : 'ئیمەیڵ نەدۆزراوەیەوە'
      );
      return;
    }
    if (error?.data?.data?.message === 'email-required') {
      toast.error(
        language === 'en'
          ? 'Please enter your email'
          : language === 'ar'
          ? 'رجاءا أدخل بريدك الإلكتروني'
          : 'تکایە ئیمەیڵەکەت بنووسە'
      );
      return;
    }
    if (isError) {
      toast.error(
        language === 'en'
          ? 'An error occurred'
          : language === 'ar'
          ? 'حدث خطأ'
          : 'هەڵەیەک ڕوویدا'
      );
      return;
    }
  }, [isSuccess, isError, error, language]);

  return (
    <>
      <div
        className="rounded-sm border dark:text-whiten
       border-stroke bg-white shadow-default 
       dark:border-strokedark dark:bg-boxdark min-h-screen 
       flex flex-col justify-start"
      >
        <div
          className={`w-full bg-black flex p-3 border-b ${
            rtl ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <div className="flex pb-4">
            <div className="mt-5">
              <LanguageChange />
            </div>
            <div className="ml-5">
              <DarkModeSwitcher />
            </div>
          </div>
        </div>
        <div
          className={`flex flex-wrap items-center  ${
            rtl ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          {/* logo */}
          <div className="hidden xl:flex justify-center items-center xl:w-1/2">
            <div className="py-17.5 w-[80%] px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/"></Link>
              <p className="2xl:px-20 font-bold">
                {language == 'en'
                  ? 'Ministry of Peshmerga'
                  : language == 'ar'
                  ? 'وزارة البيشمركة'
                  : 'وزارەتی پێشمەرگە'}
              </p>
              <div className="mb-15 flex justify-center items-center overflow-hidden">
                <img className="" src={Logo} alt="Logo" />
              </div>
            </div>
          </div>

          <div
            className=" w-full border-stroke dark:border-strokedark 
          xl:w-1/2 xl:border-l-2"
          >
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2
                className={`mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 ${
                  rtl ? 'text-right' : 'text-left'
                }`}
              >
                {language === 'en'
                  ? 'Forget Password'
                  : language === 'ar'
                  ? 'نهێنی كلمة المرور'
                  : 'وشەی نهێنی لەبیر کردووە؟'}
              </h2>

              <form onSubmit={handleSubmit}>
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
                      required
                      name="email"
                      onChange={handleInput}
                      value={email.email}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <PrimaryButton
                    type="submit"
                    content={
                      language === 'en'
                        ? 'Submit'
                        : language === 'ar'
                        ? 'ارسال'
                        : 'پێشکەشکردن'
                    }
                  />
                </div>
                {user ? (
                  <div className="mt-6 text-center">
                    <p>
                      {language === 'en'
                        ? 'back to Change Password page'
                        : language === 'ar'
                        ? 'العودة لصفحة تغيير كلمة المرور'
                        : 'گەڕانەوە بۆ لاپەڕەی گۆڕینی وشەی نهێنی'}
                      <Link to="/update/password" className="text-primary">
                        {language === 'en'
                          ? 'click here'
                          : language === 'ar'
                          ? '! انقر هنا'
                          : '! کلیک لێرە بکە'}
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 text-center">
                    <p>
                      {language === 'en'
                        ? 'back to sign in'
                        : language === 'ar'
                        ? 'العودة لتسجيل الدخول'
                        : 'گەڕانەوە بۆ چوونە ژوورەوە'}
                      <Link to="/auth/signin" className="text-primary">
                        {language === 'en'
                          ? 'click here'
                          : language === 'ar'
                          ? '! انقر هنا'
                          : '! کلیک لێرە بکە'}
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
