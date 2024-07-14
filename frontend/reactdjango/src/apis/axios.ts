import axios from 'axios'
import { friend } from '@/types/types';
export const api= axios.create({
    baseURL:"http://127.0.0.1:5000"
   
})


export const getFrineds = async () => {
    try {
        const response = await api.get('/friends');
        return response.data;
    } catch (error) {
        console.error('Error fetching taxes:', error);
        throw error;
    }
};

export const UpdateFriends = async (data: friend,id:number)=> {
    try {
        const response=await api.put(`/update/friends/${id}`,data); 
        return response.data;
    } catch (error) {
        console.error('Error updating tax:', error);
        throw error;
    }
};
export const deletefriend = async (id:number)=> {
    try {
        const response=await api.delete(`/deletefriend/${id}`); 
        return response.data;
    } catch (error) {
        console.error('Error updating tax:', error);
        throw error;
    }
};

export const CreateFriends=async(data:friend)=>{
    try{
        const response=await api.post(`/createfriend`,data); 
        return response.data;
    } catch (error) {
        console.error('Error creating tax:', error);
        throw error;
    }
    
}