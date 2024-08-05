'use client';

import { useRef } from 'react';
import Mustache from 'mustache';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'antd';

import userGlobalStore from '@/store/user-store';


const Resume = ({ resumeTemplate }) => {

  const router = useRouter();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    
    content: () => componentRef.current,
  
  });
  

  const { currentUserData } = userGlobalStore();

  if(!currentUserData?.profileDataForResume) {

    return;

  }

  
  let showSaveResumeButton = false;

  if(!resumeTemplate?.isResumeOnlyForPremiumUsers || currentUserData?.currentSubscription) {

    showSaveResumeButton = true;
    
  }
  
  
  const htmlOfResume = Mustache.render(resumeTemplate?.htmlMarkdownOfResumeTemplate, currentUserData?.profileDataForResume);

  return (
    <div className="flex flex-col gap-8">

      {<div className="flex justify-end gap-5">

        <Button onClick={() => router.push('/')}>Back to Templates</Button>

        {showSaveResumeButton && <Button type='primary' onClick={handlePrint}>Print</Button>}

      </div>}

      {!showSaveResumeButton && <div className="m-auto bg-red-100 p-3 text-center w-3/4 border border-red-500 text-sm">This resume is only for Premium Users. Please buy our Premium Package to get access to all the resumes.</div>}

      <div className='border border-gray-300 border-solid rounded-sm'>

        <div 
            ref={componentRef} 
            dangerouslySetInnerHTML={{ __html: htmlOfResume }}
          >
        </div>

      </div>

    </div>
  )
  
};

export default Resume;