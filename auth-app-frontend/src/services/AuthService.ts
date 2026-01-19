import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";

//register function
export const registerUser = async(signupData: RegisterData) => {
    //api call to server to save data
    const response = await apiClient.post('/auth/register', signupData);
    return response.data;
};


// login function


//get current login user function


//refresh token function


//apis