
export const maxLengthValidator = (maxLength) => {
    return (text) => {
        if(text.length > maxLength)
            return `Max length is ${maxLength} symbols`
        return undefined;
    }
}
