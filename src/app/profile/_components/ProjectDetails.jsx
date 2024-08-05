import { Button, Form, Input } from "antd";
import { Trash2 } from "lucide-react";

const ProjectTab = () => {
  return (
    <div>
    <Form.List name="project">

      {(fieldsArray, {add, remove}) => {

        return <div>

          <div className="flex items-center gap-5">

            <Button size="small" onClick={() => add()} className="mb-5">Add Project</Button>

          </div>

          <div className="flex flex-col gap-10">

            {fieldsArray.map((field, index) => (

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-end p-5 border border-solid border-primary rounded-lg" key={index}>

                <Form.Item
                  name={[field.name, 'projectName']}
                  label="Project Name"
                  rules={[{ required: true, message: 'project name is required' }]}
                >
                  <Input type="text" placeholder="enter the project name" />
                </Form.Item>

                <Form.Item
                  name={[field.name, 'projectGithubRepo']}
                  label="Github URL"
                  rules={[{ required: true, message: 'project github url is required' }]}
                >
                  <Input type="url" placeholder="enter the project github url" />
                </Form.Item>

                <div className="col-span-1 lg:col-span-4 flex flex-col lg:flex-row gap-5 lg:items-end">


                  <Form.Item
                    name={[field.name, 'description']}
                    label="Description"
                    className="flex-1 lg:w-2/4"
                    rules={[{ required: true, message: 'project description is required' }]}
                  >
                    <Input.TextArea className="!resize-none" placeholder="give a brief description about your project" />
                    
                  </Form.Item>

                  <Button onClick={() => remove(field?.name)} className="w-max">

                    <Trash2 size={16} />

                  </Button>

                </div>

              </div>

            ))}

          </div>

        </div>

      }}

    </Form.List>
  </div>
  )
};

export default ProjectTab;