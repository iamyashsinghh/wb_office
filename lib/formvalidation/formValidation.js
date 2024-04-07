
//Validation for user signup form
export function user_signup_validation(values) {
    
    const errors = {};

    //For name
    if (!values.name) {
        errors.name = "Name must be required"
    }

    //For email
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    //For password
    if (!values.password) {
        errors.password = "Passwrod Required"

    } else if (values.password.length < 8) {
        errors.password = "Password must be at lest 8 digit"
    }

    //phone
    if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Phone number must be exactly 10 digits.';
    }

    //For event date
    if(!values.event_date){
        errors.event_date = "Event date is required";
    }

    //for city
    if(!values.city){
        errors.city = "City required";
    }

    //for locaiton
    if(!values.location){
        errors.location = "Location required"
    }

    //for user type
    if(!values.user_type){
        errors.user_type = "UserType is required"
    }

    return errors

} 


//Validation for user signup form
export function vendor_signup_validation(values) {
    
    const errors = {};

    //For name
    if (!values.name) {
        errors.name = "Name must be required"
    }

    //For name
    if (!values.business_name) {
        errors.business_name = "\business name must be required"
    }

    if(!values.business_type){
        errors.business_type = "Business type is required"
    }

    if(!values.business_category){
        errors.business_category = "Business category is required"
    }

    //For email
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }


    //phone
    if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Phone number must be exactly 10 digits.';
    }



    //for city
    if(!values.city){
        errors.city = "City required";
    }

    //for address
    if(!values.address){
        errors.address = "address required"
    }

    return errors

} 