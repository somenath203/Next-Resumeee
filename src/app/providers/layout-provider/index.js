'use client';

import { message } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

import { getCurrentUserFromMongoDBAndCreateNewUserInMongoDB } from "@/server-actions/users";
import userGlobalStore from "@/store/user-store";
import Spinner from "@/app/_components/Spinner";
import AdminMenu from "./AdminMenu";


const LayoutProvider = ({ children }) => {

  const { currentUserData, setCurrentUserData } = userGlobalStore();

  const pathname = usePathname();

  const router = useRouter();

  const [ loading, setLoading ] = useState();

  const { signOut }  = useClerk();

  let isPublicRoute = pathname.includes('/sign-in') || pathname.includes('/sign-up');

  const isAdminRoute = pathname.includes('/admin');


  const getloggedInUserFullName = async () => {

    try {

      setLoading(true);

      const loggedInUserData = await getCurrentUserFromMongoDBAndCreateNewUserInMongoDB();
      
  
      if(loggedInUserData?.success) {
  
        setCurrentUserData(loggedInUserData?.data);
  
      }
      
    } catch (error) {
  
      console.log(error);
      
      message.error('Something went wrong. Please try again.')
  
    } finally {

      setLoading(false);

    }

  }

  const logoutUser = async () => {

    try {

      setCurrentUserData(null);

      await signOut(); 

      message.success('you are successfully logged out.');

    } catch (error) {

      console.error('Failed to sign out:', error);

      message.error('Something went wrong. Please try again.');

    }

  }

  useEffect(() => {
    
    if(!isPublicRoute && !currentUserData) {
      getloggedInUserFullName();
      
    }

  }, [pathname]);


  if (isPublicRoute) {

    return children;
    
  }

  if(loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <Spinner />
        
      </div>
    )
  }

  if(currentUserData && !currentUserData?.isAdmin && isAdminRoute && !loading) {

    return <div>
    
      <div className="header p-5 bg-primary flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between items-center px-10">

        <h1 className="text-xl font-bold text-white tracking-wider cursor-pointer" onClick={() => router.push('/')}>Next Resumeeee</h1>

        <div className="flex items-center gap-5">

          <span className="text-white cursor-pointer" onClick={() => router.push('/profile')}>Profile</span>

          <span>
            <LogOut className="text-white cursor-pointer" onClick={logoutUser} />
          </span>

        </div>

      </div>

      <div className="p-5 mt-36">
        <p className="text-xl tracking-wide text-primary text-center">You are not authorized to access this page since you are not the admin.</p>
      </div>

    </div>

  } 
  

  return <div>

    <div className="header p-5 bg-primary flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between items-center px-10">

      <h1 className="text-xl font-bold text-white tracking-wider cursor-pointer" onClick={() => router.push('/')}>Next Resumeeee</h1>

      <div className="flex items-center gap-5">

        {currentUserData?.isAdmin && <>
          <AdminMenu />
        </>}

        <span className="text-white cursor-pointer" onClick={() => router.push('/profile')}>Profile</span>

        <span>
          <LogOut className="text-white cursor-pointer" onClick={logoutUser} />
        </span>

      </div>

    </div>

    <div className="p-5">
      {children}
    </div>

  </div>
};


export default LayoutProvider;
