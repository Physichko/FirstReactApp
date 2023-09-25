

export const validatorMiddleware =(validators : Array<(value : any) => string | undefined>) => {
    return (value : any) : string | undefined => {
        debugger;
        let errorString ='';
        for (let i = 0; i < validators.length; i++) {
            let validateResult = validators[i](value);
            if (validateResult) {
                errorString.concat(validateResult);
            }
        }
        return errorString;
    }
}