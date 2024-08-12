import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleRequestQuery } from '../../app/api/request';
import Label from '../../components/common/Label';
import { useSelector } from 'react-redux';
import Element from '../../components/request.edit/Element';
import SelectEmp from '../../components/request.edit/SelectEmp';
import Description from '../../components/request.edit/Description';
import PrintPage from '../../components/PrintableComponent ';
import Loader from '../common/Loader';
import { handelDate } from '../../function/function';
function EditNewRequest() {
  const { language, rtl } = useSelector((state) => state.language);
  const user = useSelector((state) => state.setUser);

  const { id } = useParams();
  const {
    data: getData,
    isLoading: getISLaoding,
    isError: getIsError,
  } = useGetSingleRequestQuery(id);
  useEffect(() => {
    // console.log(getData?.data?.dirName);
  }, [getISLaoding]);

  // console.log(getData?.data);
  return getISLaoding ? (
    <Loader />
  ) : (
    !getIsError && (
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
          <PrintPage id={id} />
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
            content={getData?.data?.fullname}
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
            content={getData?.data?.dirName}
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
            content={getData?.data?.dirAddress}
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
            content={handelDate(getData?.data?.dateVist)}
          />
          {/* problem */}
          <Element
            label={
              language == 'en' ? 'Problem' : language == 'ar' ? 'مشكلة' : 'کێشە'
            }
            content={getData?.data?.problem}
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
            content={getData?.data?.phone}
          />
          {/* select employee for visit width tow column  */}
          <div className="col-span-1 sm:col-span-2">
            <SelectEmp request={id} />
          </div>
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
              content={getData?.data?.desc}
            />
          </div>
          {/* emp note */}
          <div
            className="col-span-1 sm:col-span-2 md:col-span-3
       xl:col-span-4"
          >
            <Description empNote={getData?.data?.empDesc} request={id} />
          </div>
        </div>
      </div>
    )
  );
}

export default EditNewRequest;
