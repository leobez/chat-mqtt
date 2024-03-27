type Props = {
    value: string
}

const FormButton = (props: Props) => {
    return (
        <>
            {props.value === 'K' &&
                <input type="Submit" defaultValue="Connect" className="form-button"/>
            }
            {props.value === 'C' &&
                <input type="Submit" value="Connecting..." disabled className="form-button"/>
            }
            {props.value === 'D' &&
                <input type="Submit" value="Disconnecting..." disabled className="form-button"/>
            }
        </>

    )
}

export default FormButton