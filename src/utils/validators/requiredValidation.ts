export const requiredValidator = (value : string | undefined) => {
    if(!value)
        return "Value is required";

    return undefined;
}