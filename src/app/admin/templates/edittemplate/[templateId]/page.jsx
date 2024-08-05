import { getParticulatTemplateByID } from "@/server-actions/templates";
import TemplateForm from "../../_components/TemplateForm";

const Page = async ({ params }) => {

  const response = await getParticulatTemplateByID(params?.templateId);
  
  if(!response?.success) {

    return <div>{response?.message ? response?.message : 'Something went wrong. Please try again after sometime.'}</div>

  }  
  
  return (
    <div>

      <h1 className="text-xl font-bold text-primary">Edit Template</h1>

      <TemplateForm 
        initalValuesOfResumeEdit={response?.template} 
        type='edit'
      />

    </div>
  )
};

export default Page;