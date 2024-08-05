import { Button, Form, Input } from "antd";
import { Trash2 } from "lucide-react";

const EducationTab = () => {
  return (
    <div>
      
      <Form.List name="Education">

        {(fieldsArray, {add, remove}) => {

          return <div>

            <div className="flex items-center gap-5">

              <Button size="small" onClick={() => add()} className="mb-5">Add Education</Button>

            </div>

            <div className="flex flex-col gap-5">

              {fieldsArray.map((field, index) => (

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end" key={index}>

                  <Form.Item
                    name={[field.name, 'qualification']}
                    label="Qualification"
                    rules={[{ required: true, message: 'qualification is required' }]}
                  >
                    <Input type="text" placeholder="enter your qualification" />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'yearOfPassing']}
                    label="Year of Passing"
                    rules={[{ required: true, message: 'year of passing is required' }]}
                  >
                    <Input type="date" />
                  </Form.Item>

                  <Button onClick={() => remove(field?.name)} className="w-max">

                    <Trash2 size={16} />

                  </Button>

                </div>

              ))}

            </div>

          </div>

        }}

      </Form.List>

    </div>
  )
};

export default EducationTab