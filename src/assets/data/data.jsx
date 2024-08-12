import { FaCalendarCheck, FaUserAlt, FaUserCheck } from 'react-icons/fa';
import { GrServices } from 'react-icons/gr';
import {
  MdFiberNew,
  MdIncompleteCircle,
  MdStoreMallDirectory,
} from 'react-icons/md';

export const sideBarLanguage = (lang, role) => {
  if (role === 'admin') {
    return [
      {
        name:
          lang == 'en'
            ? 'New Repair Request'
            : lang == 'ar'
            ? 'طلب أصلاح جديد'
            : 'د.چاککردنەوەی نوێ',
        path: '/',
        icon: <MdFiberNew size={20} />,
        open: false,
      },
      {
        name:
          lang == 'en'
            ? 'Incomplete application'
            : lang == 'ar'
            ? 'تطبيق غير مكتمل'
            : 'داواکاری تەواونەکراو',
        path: '/processing',
        icon: <MdIncompleteCircle size={20} />,
        open: false,
      },
      {
        name:
          lang == 'en'
            ? 'Complete application'
            : lang == 'ar'
            ? 'التطبيق المكتمل'
            : 'داواکاری تەواوکراو',
        path: '/complete/request',
        icon: <FaCalendarCheck size={20} />,
        open: false,
      },
      // role === 'admin' &&
      {
        name:
          lang == 'en'
            ? 'Directories'
            : lang == 'ar'
            ? 'المديريات'
            : 'بەڕێوەبەرایەتییەکان',
        path: '/directory',
        icon: <MdStoreMallDirectory size={20} />,
        open: false,
      },
      {
        name:
          lang == 'en'
            ? 'Repairs'
            : lang == 'ar'
            ? 'الإصلاحات'
            : 'چاککردنەوەکان',
        path: '/repair',
        icon: <GrServices size={20} />,
        open: false,
      },
      {
        name:
          lang == 'en'
            ? 'Employees'
            : lang == 'ar'
            ? 'الموظفين'
            : 'فەرمانبەران',
        path: '/users',
        icon: <FaUserCheck size={20} />,
        open: false,
      },
      {
        name:
          lang == 'en'
            ? 'New Employees'
            : lang == 'ar'
            ? 'موظفين جدد'
            : 'فەرمانبەرانی نوێ',
        path: '/new/users',
        icon: <FaUserAlt size={20} />,
        open: false,
      },
    ];
  }
  if (role === 'emp') {
    return [
      // {
      //   name:
      //     lang == 'en'
      //       ? 'New Repair Request'
      //       : lang == 'ar'
      //       ? 'طلب أصلاح جديد'
      //       : 'د.چاککردنەوەی نوێ',
      //   path: '/',
      //   icon: <MdFiberNew size={20} />,
      //   open: false,
      // },
      {
        name:
          lang == 'en'
            ? 'New Repair Request'
            : lang == 'ar'
            ? 'طلب أصلاح جديد'
            : 'د.چاککردنەوەی نوێ',
        path: '/processing',
        icon: <MdFiberNew size={20} />,
        open: false,
      },
      {
        name:
          lang == 'en'
            ? 'Complete application'
            : lang == 'ar'
            ? 'التطبيق المكتمل'
            : 'داواکاری تەواوکراو',
        path: '/complete/request',
        icon: <FaCalendarCheck size={20} />,
        open: false,
      },
    ];
  }
  return [];
};
export const Languages = [
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'ar',
    name: 'عربى',
  },
  {
    id: 'kr',
    name: 'کوردی',
  },
];
