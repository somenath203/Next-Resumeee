/* eslint-disable @next/next/no-img-element */
import { getAllTemplates } from "@/server-actions/templates";
import Link from "next/link";

const Page = async () => {

  const response = await getAllTemplates();

  if(!response?.success) {

    return;

  }

  const data = response?.allTemplates;
  
  return (
    <div>

      <div>

        <h1 className="text-xl font-bold text-primary">Templates</h1>

        <span className="text-gray-500 text-sm">
          Browse through our collection of templates
        </span>

      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {data?.map((template) => (
          <Link key={template?._id} className="border border-gray-200 border-solid hover:border-gray-600" href={`/resume-templates-preview/${template._id}`}>
            
            <img src={template?.thumbnailOfResume} alt={template?.templateName} className="w-full h-96" />
          
          </Link>
        ))}
      </div>
      
    </div>
  )

};

export default Page;