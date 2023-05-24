import bcrypt from 'bcrypt'
//set hashpassword
export const hashPassword = async (password:string)=>{
    try {
        const saltrounds =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,saltrounds)
        return hashedPassword   
    } catch (error) {
        console.log("password error",error); 
    }
}


//compare password equal to hashedpassword
export const comparePassword = async (password:string,hashedPassword:string)=>{
    return bcrypt.compare(password,hashedPassword)
}