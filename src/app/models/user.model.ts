import { college } from "./college.model"

export interface User {
    id: string,
    firstName: string,
    lastName:string,
    age: Number,
    telephone: string,
    collegeID: number
    college: college
}