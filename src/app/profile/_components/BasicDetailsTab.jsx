import { Form, Input, Upload } from 'antd';


const BasicDetailsTab = () => {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">


      <Form.Item 
        name="fullName" 
        label="Full Name"
        rules={[{ required: true, message: 'fullname is required' }]}
      >
        <Input 
          placeholder="enter your full name" 
          type="text" 
        />
      </Form.Item>


      <Form.Item 
        name="emailAddress" 
        label="Email Address"
        rules={[{ required: true, message: 'email address is required' }]}
      >
        <Input 
          placeholder="enter your email address" 
          type="email"
      />
      </Form.Item>


      <Form.Item 
        name="phoneNumber" 
        label="Phone Number"
        rules={[{ required: true, message: 'phone number is required' }]}
      >
        <Input 
          placeholder="enter your phone number" 
          type="tel" 
        />
      </Form.Item>


      <Form.Item 
        name="portfolioWebsite" 
        label="Portfolio Website"
      >
        <Input 
          placeholder="enter your portfolio website link" 
          type="url" 
        />
      </Form.Item>


      <Form.Item 
        name="carrerObjective" 
        label="Carrer Objective" 
        className='col-span-1 lg:col-span-4'
        rules={[{ required: true, message: 'carrer objective is required' }]}
      >

        <Input.TextArea 
          className='!resize-none' 
          rows={4} 
          placeholder='enter your career objective' 
        />

      </Form.Item>

    </div>
  );
};

export default BasicDetailsTab;
