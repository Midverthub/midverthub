// to check if the barer token is passed from the front end
//if the token is not passed then the user is not authenticated
// and throw and unauthorized error 


//where it is validated if it true or false 
//if the token is not passed then the user is not authenticated
const validate = (token) => {
    const validToken = true
    if (!validToken || !token) {
        return false
    }
    return true
}


//this is trriger in the middleware file 
export function authMiddleware(req) {
    //this gets the authorization barer token from the headers by splitting it out as a sceond value
    const token = req.headers.get('authorization')?.split(" ")[1]


    //the token is then passed to the utility function 
    //to check if the barer token is passed from the front end
    return { isValid: validate(token) }
}