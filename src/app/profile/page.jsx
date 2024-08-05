'use client';

import { Button, Form, message, Tabs } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

import BasicDetailsTab from "./_components/BasicDetailsTab";
import EducationTab from "./_components/EducationTab";
import SkillsTab from "./_components/SkillsTab";
import { updateUserProfileDetails } from "@/server-actions/users";
import userGlobalStore from "@/store/user-store";
import UserSubscription from "./_components/UserSubscription";
import ProjectTab from "./_components/ProjectDetails";


const Page = () => {

  const [ activeTabId, setActiveTabId ] = useState("1");

  const router = useRouter();

  const [ loading, setLoading ] = useState();

  const { currentUserData, setCurrentUserData } = userGlobalStore();


  const onSubmitForm = async (valuesFromForm) => {

    try {
      
      setLoading(true);

      const response = await updateUserProfileDetails(valuesFromForm);

      if (response?.success) {

        message.success(response?.message);

        setCurrentUserData(response?.data);

      }
      
    } catch (error) {
      
      console.log(error);

      message.error('Something went wrong. Please try again.');
      
    } finally {

      setLoading(false);

    }

  }


  return (
    <div className="flex flex-col gap-5">

      <h1 className="text-lg font-bold uppercase text-primary">Profile</h1>

      <UserSubscription />

      <Form layout="vertical" onFinish={onSubmitForm} initialValues={currentUserData?.profileDataForResume}>

        <Tabs defaultActiveKey="1"
        activeKey={activeTabId}
        onChange={(key) => setActiveTabId(key)}
        >

          <Tabs.TabPane tab="Basic" key="1">
            <BasicDetailsTab />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Skills" key="2">
            <SkillsTab />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Projects" key="3">
            <ProjectTab />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Education" key="4">
            <EducationTab />
          </Tabs.TabPane>

        </Tabs>


        <div className="flex justify-end gap-5 mt-10">

          <Button onClick={() => router.push('/')} disabled={loading}>Cancel</Button>

          <Button type="primary" htmlType="submit" loading={loading}>SAVE</Button>

        </div>


      </Form>

    </div>
  )
};

export default Page;