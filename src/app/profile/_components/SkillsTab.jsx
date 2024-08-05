import { Button, Form, Input } from "antd";
import { Trash2 } from "lucide-react";

const SkillsTab = () => {
  return (
    <div>
      <Form.List name="skills">

        {(fieldsArray, {add, remove}) => {

          return <div>

            <div className="flex items-center gap-5">

              <Button size="small" onClick={() => add()} className="mb-5">Add Skill</Button>

            </div>

            <div className="flex flex-col gap-5">

              {fieldsArray.map((field, index) => (

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end" key={index}>

                  <Form.Item
                    name={[field.name, 'technology']}
                    label="Technology"
                    rules={[{ required: true, message: 'technology is required' }]}
                  >
                    <Input type="text" placeholder="enter the technology name" />
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

export default SkillsTab;