import { FC, ReactNode } from "react";

/**
 * Component to render the Google Translate widget.
 *
 * The children prop is optional. If given, it will be rendered inside the widget.
 *
 * The widget is rendered in a div with the id "google_translate_element".
 *
 * @param {Object} props
 * @param {ReactNode} [props.children]
 * @returns {ReactNode}
 */
export const GoogleTranslate: FC<{children?: ReactNode}> = ({children}) => {
    return (
        <div id="google_translate_element">
            {children && children}
        </div>

    )
}