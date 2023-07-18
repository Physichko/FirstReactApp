export const requiredValidator = (value) => {
    if(!value)
        return "Value is required";

    return undefined;
}