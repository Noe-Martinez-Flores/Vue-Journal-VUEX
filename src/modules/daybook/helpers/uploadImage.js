import axios from "axios"

const uploadImagetoCloudDinary = async ( file ) => { 
    if (!file) return 
    try { 
        const formData = new FormData() 
        formData.append('upload_preset','swhzkl1b') 
        formData.append('file',file) 

        const url = 'https://api.cloudinary.com/v1_1/dzfpjtap0/image/upload'
        const { data } = await axios.post(url,formData)
        console.log('data', data);

        return data.secure_url;
        
    } catch (error) { 
        return console.error(error) 
    } 
} 

export default uploadImagetoCloudDinary