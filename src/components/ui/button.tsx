import * as React from "react";


export function Button({
children,
...props
}:React.ButtonHTMLAttributes<HTMLButtonElement>){

return (

<button

{...props}

className={`rounded-lg bg-blue-900 px-5 py-3 text-white hover:bg-blue-800 cursor-pointer
    ${props.className || ""}
`}

>

{children}

</button>

)

}