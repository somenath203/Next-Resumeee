import mongoose from "mongoose";


const templateSchema = new mongoose.Schema({
    templateName: {
        type: String
    },
    thumbnailOfResume: {
        type: String
    },
    htmlMarkdownOfResumeTemplate: {
        type: String
    },
    isResumeOnlyForPremiumUsers: {
        type: Boolean
    }
}, {
    timestamps: true 
});


if (mongoose.models && mongoose.models['templates']) {

    delete mongoose.models['templates'];
  
}
  
  
const TemplateModel = mongoose.model('templates', templateSchema);
  
export default TemplateModel;