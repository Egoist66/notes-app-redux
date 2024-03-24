import { Provider } from "react-redux";
import { ChildrenProps } from "../types/types";
import { store } from "./store";




export const Providers = ({ children }: ChildrenProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
        
};
 
