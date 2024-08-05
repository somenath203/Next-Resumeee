import { getParticulatTemplateByID } from "@/server-actions/templates";
import Resume from "../_components/Resume";

const Page = async ({ params }) => {

  const response = await getParticulatTemplateByID(params?.id);

  console.log(response);
  
  
  return (
    <div>
      <Resume resumeTemplate={response?.template} />
    </div>
  )
};

export default Page;