import { NavLink } from 'react-router-dom'

type Props = {
    path: string
    text: string
}

const CNavLink = (props: Props) => {
    return (
        <NavLink
            to={props.path}
            className='h-full w-full grid place-items-center'>
            {props.text}
        </NavLink>
    )
}

/* 
        <NavLink
            to={props.path}
            className={({isActive, isPending}) => 
                isPending ? "isPending" : isActive ? "isActive" : ""
            }
            >
            {props.text}
        </NavLink>

*/

export default CNavLink