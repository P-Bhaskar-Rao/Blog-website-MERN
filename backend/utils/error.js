const  errorHandler=(statusCode,message,success)=>{
    const error=new Error()
    error.statusCode=statusCode
    error.message=message
    error.success=success
    return error
}
export default errorHandler