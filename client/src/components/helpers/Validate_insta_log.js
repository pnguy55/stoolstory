
export default class Validate {
    static validate_insta_log = (values) => {
        const errors = {}
        const requiredFields = [
            'date_time',
            'pain_level',
            'kind',
            'blood',
        ]
        requiredFields.forEach(field => {
            if(!values[field]) {
                errors[field] = 'Required'
            }
        })
        if (
            values.email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address'
        }
        return errors;

    }


}
