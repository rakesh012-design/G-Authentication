class CustomError extends Error{
  constructor(statusCode,message){
    super(message)
    this.statusCode=statusCode
  }
  
}
export const notFoundError=()=>{
    return new CustomError(404,'Page not Found')
  }
  export const unAuthorizedError=()=>new CustomError(403,'Access is Forbidden')

  export const valuesMissingError=()=>new CustomError(400,'please enter all the values')

  export const tokenNotAvailableError=()=>new CustomError(400,'Token/ Session not Available')
  
  export const duplicateEmailError=()=>new CustomError(401,'Email Already Exists') 


export default CustomError