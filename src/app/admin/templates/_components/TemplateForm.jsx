'use client';

import { Button, Form, Input, message, Radio, Upload } from "antd";
import { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { useRouter } from "next/navigation";

import { uploadResumeThumbnailInFirebase } from "@/helpers/resumeThumbnailUpload";
import { createNewTemplate, updateTemplateByID } from "@/server-actions/templates";


const TemplateForm = ({ initalValuesOfResumeEdit={}, type="add" }) => {

  const [ thumbnail, setThumbnail ] = useState(initalValuesOfResumeEdit?.thumbnailOfResume || "");
  
  const [ htmlMarkdownForTemplate, setHtmlMarkdownForTemplate ] = useState(initalValuesOfResumeEdit?.htmlMarkdownOfResumeTemplate || "");
  
  const [ loading, setLoading ] = useState(false);
  
  const router = useRouter();


  const onSubmitResumeTemplate = async (valuesFromForm) => {
    try {

      setLoading(true);

      if(typeof thumbnail === "string") {

        valuesFromForm.thumbnailOfResume = thumbnail;

      } else {

        valuesFromForm.thumbnailOfResume = (await uploadResumeThumbnailInFirebase(thumbnail)).urlOfTheUploadedThumbnailInFirebase;
      
      }

      valuesFromForm.htmlMarkdownOfResumeTemplate = htmlMarkdownForTemplate;


      let response = null;

      if (type === 'add') {

        response = await createNewTemplate(valuesFromForm);
      
      } else {

        response = await updateTemplateByID({ idOfTheTemplate: initalValuesOfResumeEdit?._id, payload: valuesFromForm });
      
      }

      if(response?.success) {

        message.success(response?.message);

        router.push('/admin/templates');

      }
  
    } catch (error) {

      console.log(error);

      message.error('Something went wrong. Please try again.');

    } finally {

      setLoading(false);

    }
  }

  let selectedFilesList = [];

  if (type === 'edit' && thumbnail && typeof thumbnail === "string") {

    selectedFilesList = [{
      url: thumbnail
    }];

  } else if (thumbnail) {

    selectedFilesList = [{
      url: URL.createObjectURL(thumbnail)
    }];

  } else {

    selectedFilesList = [];

  }


  return (
    <Form 
      onFinish={onSubmitResumeTemplate} 
      layout="vertical" 
      className="mt-7 flex flex-col gap-7"
      initialValues={initalValuesOfResumeEdit}
    >


      <Form.Item label="Name of the Resume Template" name="templateName">
        <Input type="text" placeholder="enter the name of resume template" />
      </Form.Item>


      <Form.Item label="Thumbnail Photo">
        <Upload 
          listType="picture-card" 
          beforeUpload={(file) => {
            setThumbnail(file);
            return false;
          }}
          onRemove={() => setThumbnail("")}
          fileList={selectedFilesList}
        >
          <div className="span text-xs">
            Upload Thumbnail
          </div>
        </Upload>
      </Form.Item>


      <Form.Item label="Is this Resume Only for Subscribers ?" name="isResumeOnlyForPremiumUsers">
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>


      <Form.Item label="Html Markdown for Resume Template">
        <CodeMirror
          value={htmlMarkdownForTemplate}
          onChange={(value) => setHtmlMarkdownForTemplate(value)}
          extensions={[html()]}
        />
      </Form.Item>


      <div className="flex items-center justify-end gap-5">
        <Button onClick={() => router.push('/admin/templates')} disabled={loading}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>SAVE</Button>
      </div>

      
    </Form>
  )
};

export default TemplateForm;
