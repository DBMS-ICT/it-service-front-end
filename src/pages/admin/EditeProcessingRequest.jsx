import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleRequestQuery } from '../../app/api/request';
import Label from '../../components/common/Label';
import { useSelector } from 'react-redux';
import Element from '../../components/request.edit/Element';
import { useAddEmployeeMutation } from '../../app/api/request';
import Description from '../../components/request.edit/Description';
import PrintPage from '../../components/PrintableComponent ';
import SuccessButton from '../../components/common/Button/SuccessButton';
import { useGetActiveEmployeeQuery } from '../../app/api/user';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import AddCompleteRequest from '../../components/common/processing/AddCompleteRequest';
import { handelDate } from '../../function/function';
function EditeProcessingRequest() {
  const { language, rtl } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.setUser);
  const [emp, setEmp] = useState({});
  //------------- add employee ----------------//
  const [
    addEmployee,
    {
      isLoading: addEmpIsLoading,
      isError: addEmpIsError,
      data: addEmpData,
      error: addEmpError,
      isSuccess: addEmpIsSuccess,
    },
  ] = useAddEmployeeMutation();
  //------------- get employee ------------------
  const {
    data: getEmpData,
    isSuccess: getEmpIsSuccess,
    isError: getEmpIsError,
    isLoading: getEmpIsLoading,
    error: getEmpError,
  } = useGetActiveEmployeeQuery();
  //------------- get request id from url ------------------
  const { id } = useParams();
  const {
    data: getSingleData,
    isLoading: getSingleISLaoding,
    isError: getSingleIsError,
  } = useGetSingleRequestQuery(id);
  //------------- set request data ------------------
  const [requestData, setRequestData] = useState({});
  //------------- set employee data ------------------
  useEffect(() => {
    setRequestData(getSingleData?.data);
  }, [getSingleData]);
  //------------- handel date ------------------

  //------------- add employee ------------------
  const AddEmployee = (e) => {
    e.preventDefault();
    if (!emp.emp)
      return toast.error(
        language === 'en'
          ? 'Please select an employee'
          : language === 'ar'
          ? 'يرجى اختيار الموظف'
          : 'تکایە کارمەندێک هەڵبژێرە'
      );

    addEmployee(emp);
  };
  //------------- handel employee ------------------
  const handleEmpoyee = (e) => {
    setEmp({
      oldemp: requestData?.empVist?._id,
      emp: e.target.value,
      request: requestData?._id,
    });
  };
  //------------- handle update employee ------------------
  useEffect(() => {
    // console.log(addEmpData?.status);
    if (addEmpIsSuccess && addEmpData?.status == 'success') {
      toast.success(
        language === 'en'
          ? 'Successfully Added'
          : language === 'ar'
          ? 'أضيف بنجاح'
          : 'بە سەرکەوتوویی زیادکرا'
      );
      return;
    }
    if (addEmpIsError) {
      toast.error(
        language === 'en'
          ? 'Failed please try again'
          : language === 'ar'
          ? 'فشل يرجى المحاولة مرة أخرى'
          : 'شکستی هێنا تکایە هەوڵبدەرەوە'
      );
      return;
    }
  }, [addEmpIsLoading]);
  //------------- return desing ------------------
  return getSingleISLaoding ? (
    <Loader />
  ) : (
    !getSingleIsError && (
      <div className="w-full flex flex-col gap-y-7">
        <div className={`flex flex-col ${rtl ? 'text-right' : 'text-left'}`}>
          <Label
            text={
              language === 'en'
                ? 'Request'
                : language === 'ar'
                ? 'الطلب'
                : 'داواکاری'
            }
            textSize={'text-3xl font-bold'}
          />
          <div
            className={`w-full flex items-center gap-x-3
            ${rtl ? 'flex-row-reverse' : 'flex-row'} `}
          >
            <PrintPage id={id} />
            <AddCompleteRequest reqId={id} />
          </div>
        </div>
        <div
          className={`grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3
         xl:grid-cols-4 p-5`}
          style={{ direction: rtl ? 'rtl' : 'ltr' }}
        >
          {/* full name */}
          <Element
            label={
              language == 'en'
                ? 'Full Name'
                : language == 'ar'
                ? 'الاسم الكامل'
                : 'ناوی تەواو'
            }
            content={requestData?.fullname}
          />
          {/* directorate name */}
          <Element
            label={
              language == 'en'
                ? 'Directorate Name'
                : language == 'ar'
                ? 'اسم المديرية'
                : 'ن.بەڕێوەبەرایەتی'
            }
            content={requestData?.dirName}
          />
          {/* directorate address */}
          <Element
            label={
              language == 'en'
                ? 'Address'
                : language == 'ar'
                ? 'عنوان'
                : 'ناونیشان'
            }
            content={requestData?.dirAddress}
          />
          {/* vist date */}
          <Element
            label={
              language == 'en'
                ? 'Visit Date'
                : language == 'ar'
                ? 'تاريخ الزيارة'
                : 'بەرواری سەردان'
            }
            content={handelDate(getSingleData?.data?.dateVist)}
          />
          {/* problem */}
          <Element
            label={
              language == 'en' ? 'Problem' : language == 'ar' ? 'مشكلة' : 'کێشە'
            }
            content={requestData?.problem}
          />
          {/* phone */}
          <Element
            label={
              language == 'en'
                ? 'Phone Number'
                : language == 'ar'
                ? 'رقم الهاتف'
                : 'ژمارەی تەلەفون'
            }
            content={requestData?.phone}
          />
          {/* select employee for visit width tow column  */}
          {user?.role === 'admin' && (
            <div className="col-span-1 sm:col-span-2">
              <div
                className={`p-4 flex flex-col gap-3 ${
                  rtl ? 'text-right' : 'text-left'
                }`}
              >
                <label className="text-primary dark:text-secondary text-lg font-semibold">
                  {language == 'en'
                    ? 'Select Employee'
                    : language == 'ar'
                    ? 'اختر الموظف'
                    : 'دیاری کردنی کارمەند'}
                </label>
                <form
                  onSubmit={AddEmployee}
                  className="w-full flex items-center justify-center gap-x-2"
                >
                  {requestData?.empVist?._id && (
                    <select
                      onChange={handleEmpoyee}
                      defaultValue={requestData?.empVist?._id}
                      required={true}
                      disabled={
                        getEmpIsError ||
                        getEmpIsLoading ||
                        addEmpIsLoading ||
                        addEmpIsError
                      }
                      className={`w-full outline-none rounded-full border-[1.5px]
  border-stroke bg-transparent py-3 px-5 font-medium transition
   focus:border-primary active:border-primary 
   disabled:cursor-default disabled:bg-white 
   dark:border-form-strokedark dark:bg-form-input 
   dark:focus:border-primary
    ${rtl ? 'text-right pr-3' : 'text-left pl-3'} `}
                    >
                      <option value="">
                        {language == 'en'
                          ? 'Select'
                          : language == 'ar'
                          ? 'اختر'
                          : 'دیاری کردن'}
                      </option>
                      {!getEmpIsError &&
                        !getEmpIsLoading &&
                        getEmpIsSuccess &&
                        getEmpData?.data?.data?.map((emp) => (
                          <option key={emp?._id} value={emp?._id}>
                            {emp?.fullname}
                          </option>
                        ))}
                    </select>
                  )}
                  <SuccessButton
                    disabled={addEmpIsLoading}
                    type="submit"
                    content={
                      language == 'en'
                        ? 'Add'
                        : language == 'ar'
                        ? 'اضافة'
                        : 'زیادکردن'
                    }
                  />
                </form>
              </div>
            </div>
          )}
          {user?.role === 'emp' && (
            <Element
              label={
                language == 'en'
                  ? 'Maintenance employee'
                  : language == 'ar'
                  ? 'موظف صيانة'
                  : 'کارمەندی چاککردنەوە'
              }
              content={requestData?.empVist?.fullname}
            />
          )}
          {/* request description */}

          <div
            className="col-span-1 sm:col-span-2 md:col-span-3
         xl:col-span-4"
          >
            <Element
              label={
                language == 'en'
                  ? 'Note'
                  : language == 'ar'
                  ? 'ملاحظات'
                  : 'تێبینی'
              }
              content={requestData?.desc}
            />
          </div>
          {/* emp note */}
          <div
            className="col-span-1 sm:col-span-2 md:col-span-3
         xl:col-span-4"
          >
            <Description empNote={requestData?.empDesc} request={id} />
          </div>
        </div>
      </div>
    )
  );
}

export default EditeProcessingRequest;
