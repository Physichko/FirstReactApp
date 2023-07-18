export const validatorMiddleware = (validators) => {
    return (value) => {
        let errors = {};
        for (let i = 0; i < validators.length; i++) {
            let validateResult = validators[i](value);
            if (validateResult) {
                let validateResultTrimmed = validateResult.split(' ').join('');
                errors[validateResultTrimmed] = validateResult;
            }
        }
        return Object.keys(errors).length > 0 ? errors : undefined;
    }
}