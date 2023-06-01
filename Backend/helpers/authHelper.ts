import bcrypt from 'bcrypt'
export const hashPassword = async (password:string)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        return hashedPassword   
    } catch (error) {
        console.log("password error",error); 
    }
}


//compare password equal to hashedpassword
export const comparePassword = async (password:string,hashedPassword:string)=>{
    return await bcrypt.compare(password,hashedPassword)
}