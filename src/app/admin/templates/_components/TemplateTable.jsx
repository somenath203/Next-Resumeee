'use client';

import { Button, Table } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { message } from "antd";

import { deleteTemplateByID } from "@/server-actions/templates";


const TemplateTable = ({ templateData }) => {   
    

  const router = useRouter();


  const [ loading, setLoading ] = useState();


  const onDeleteResumeTemplate = async (idOfResume) => {

    try {

      setLoading(true);

      const response = await deleteTemplateByID({ idOfTheTemplate: idOfResume });

      if (response?.success) {

        message.success(response?.message);

      }
      
    } catch (error) {
      
      console.log(error);

      message.error('Something went wrong. Please try again.');

    } finally {

      setLoading(false);
      
    }

  }


  const columns = [
    { 
        title: 'Name of the Template', 
        dataIndex: 'templateName' 
    },
    { 
        title: 'Only For Subscribers', 
        dataIndex: 'isResumeOnlyForPremiumUsers',
        render: (value) => {
            return value === true ? 'Yes' : 'No'
        } 
    },
    { 
        title: 'Created At', 
        dataIndex: 'createdAt',
        render: (value) => {
            return dayjs(value).format('MMM DD, YYYY hh:mm A');
        }
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        render: (value, record) => {
          
          return <div className="flex gap-5">

            <Button size="small" onClick={() => router.push(`/admin/templates/edittemplate/${record._id}`)}>
              <Pencil size={16} />
            </Button>

            <Button size="small" onClick={() =>  onDeleteResumeTemplate(record?._id)}>
              <Trash2 size={16} />
            </Button>

          </div>
        }
    }
  ];


  return (
    <div>
        <Table columns={columns} dataSource={templateData} loading={loading} className="overflow-x-auto" />
    </div>
  )
};

export default TemplateTable;