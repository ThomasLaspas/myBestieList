export interface friend{
    name?:string,
    role?:string,
    gender?: "male" | "female" | "";
    description?:string,
    
}
export interface Friend {
    id: number;
    name: string;
    role: string;
    description: string;
    gender: string;
    img_url: string;
}[]

export interface Props {
    friends: Friend;
}
