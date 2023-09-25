import {useParams} from "react-router-dom";
import React, {ComponentType, FC} from "react";


export function withRouter<WrappedComponentPropsType>(WrappedComponent : ComponentType<WrappedComponentPropsType>) {
     const ComponentWithRouterProp: FC<WrappedComponentPropsType> = (props) => {
        const params = useParams();
        return <WrappedComponent {...props} router={params} />;
    }

    return ComponentWithRouterProp;
}