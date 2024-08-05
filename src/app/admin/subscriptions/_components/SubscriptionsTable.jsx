'use client';

import { Table } from "antd";
import dayjs from 'dayjs';

const SubscriptionsTable = ({ allSubscriptionData }) => {

  const columns = [
    {
        title: 'User',
        dataIndex: 'user', 
        render: (user) => {
            return user?.fullName
        }
    },
    {
        title: 'Payment ID',
        dataIndex: 'paymentId'
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        render: (amount) => {
            return `Rs.${amount}`
        }
    },
    {
        title: 'Purchased At',
        dataIndex: 'createdAt',
        render: (dateAndTime) => {
            return dayjs(dateAndTime).format('MMMM DD, YYYY hh:mm A');
        }
    }
  ];

  return (
    <div>

      <Table columns={columns} dataSource={allSubscriptionData?.data} className="overflow-x-auto" />
    </div>
  )
};

export default SubscriptionsTable;