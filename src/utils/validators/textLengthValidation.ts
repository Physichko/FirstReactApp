
export const maxLengthValidatorCreator = (maxLength : number) => {
    return (text : string) => {
        if(text.length > maxLength)
            return `Max length is ${maxLength} symbols`
        return undefined;
    }
}
