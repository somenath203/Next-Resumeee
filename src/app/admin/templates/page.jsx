import { Button } from "antd";
import Link from "next/link";

import { getAllTemplates } from "@/server-actions/templates";
import TemplateTable from "./_components/TemplateTable";


const page = async () => {

  const response = await getAllTemplates();

  if(!response?.success) {

    return <div>{response?.message ? response?.message : 'Something went wrong. Please try again after sometime.'}</div>

  }

  return (
    <div>

        <div className="flex justify-between items-center">

            <h1 className="text-xl font-bold text-primary">Templates</h1>

            <Link href="/admin/templates/createtemplate">
                <Button>
                    New Template
                </Button>
            </Link>

        </div>

        <TemplateTable templateData={response?.allTemplates} />

    </div>
  )
};

export default page;