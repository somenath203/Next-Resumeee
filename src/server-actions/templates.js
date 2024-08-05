'use server';

import { revalidatePath } from "next/cache";

import { connectToMongoDB } from "@/config/dbConnect";
import TemplateModel from "@/models/templateModel";


connectToMongoDB();


export const createNewTemplate = async (payload) => {

    try {

        await TemplateModel.create(payload);

        revalidatePath('/admin/templates');

        return {
            success: true,
            message: 'template has been created successfully'
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message
        }
        
    }

}


export const getAllTemplates = async () => {

    try {

        const allTemplates = await TemplateModel.find().sort({ createdAt: -1 });

        return {
            success: true,
            message: 'all templates has been fetched successfully',
            allTemplates: JSON.parse(JSON.stringify(allTemplates))
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message
        }
        
    }

}


export const getParticulatTemplateByID = async (idOfTheTemplate) => {

    try {

        const template = await TemplateModel.findById(idOfTheTemplate);

        return {
            success: true,
            message: `template with ID: ${template?._id} has been fetched successfully`,
            template: JSON.parse(JSON.stringify(template))
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message
        }
        
    }

}


export const updateTemplateByID = async ({ idOfTheTemplate, payload}) => {

    try {

        await TemplateModel.findByIdAndUpdate(idOfTheTemplate, payload, { new: true });

        revalidatePath('/admin/templates');

        return {
            success: true,
            message: 'template has been updated successfully'
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message
        }

    }

}


export const deleteTemplateByID = async ({ idOfTheTemplate }) => {

    try {

        await TemplateModel.findByIdAndDelete(idOfTheTemplate);

        revalidatePath('/admin/templates');

        return {
            success: true,
            message: 'template has been deleted successfully'
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message
        }

    }

}