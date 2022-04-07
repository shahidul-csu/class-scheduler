import React from 'react';
import { IoSchoolSharp } from "react-icons/io5";
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Semester',
    path: '/Semester',
    icon: <IoSchoolSharp />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Spring 2020',
        path: '/overview/users',
        icon: <IoSchoolSharp />
      },
      {
        title: 'Fall 2020',
        path: '/overview/revenue',
        icon: <IoSchoolSharp />
      },
      {
        title: 'Spring 2021',
        path: '/overview/users',
        icon: <IoSchoolSharp />
      },
      {
        title: 'Fall 2021',
        path: '/overview/revenue',
        icon: <IoSchoolSharp />
      },
      {
        title: 'Spring 2022',
        path: '/overview/users',
        icon: <IoSchoolSharp />
      },
    ]
  },
  {
    title: 'Class',
    path: '/Class',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'CST 270',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'CST 338',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'CST 402',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
];