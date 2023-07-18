export const updateObjectInArray = (items, itemId, objPropName, newProps) => {
    return items.map(x => {
        if(x[objPropName] === itemId)
        {
            return {
                ...x,
                ...newProps
            };
        }
        return x;
    })
}