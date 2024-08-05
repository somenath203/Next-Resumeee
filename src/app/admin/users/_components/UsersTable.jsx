'use client';

import { Table } from "antd";
import dayjs from "dayjs";

const UsersTable = ({ allUsers }) => {

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName'
    },
    {
      title: 'Email Address',
      dataIndex: 'email'
    },
    {
      title: 'Current Subscription',
      dataIndex: 'currentSubscription',
      render: (currentSubscription) => {
        return currentSubscription ? 'Yes' : 'No'
      }
    },
    {
      title: 'Is Admin',
      dataIndex: 'isAdmin',
      render: (isAdmin) => {
        return isAdmin ? 'Yes' : 'No'
      }
    },
    {
      title: 'Joined At',
      dataIndex: 'createdAt',
      render: (dateAndTime) => {
        return dayjs(dateAndTime).format('MMMM DD, YYYY hh:mm A');
      }
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={allUsers} className="overflow-x-auto" />
    </div>
  )
};

export default UsersTable