const Filter = ({value, handleValue}) => {

    return (
        <div>
            find countries &nbsp;

            <input 
                value={value}
                onChange={handleValue}
            />
        </div>
    )

}

export default Filter