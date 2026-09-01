import Country from "./Country"

const Display = ({countriesToDisplay, handleShowButton}) => {

    if(countriesToDisplay.length === 1) {
        console.log('countriesToDisplay => ',countriesToDisplay[0])
        return (
            <Country country={countriesToDisplay[0]} />
        )
    } else if(countriesToDisplay.length <= 10){
        return (
            <div>
                {countriesToDisplay.map(country => <li key={country.name.common}>
                                                    {country.name.common}&nbsp;
                                                    <button onClick={() => handleShowButton(country)}>Show</button>
                                                   </li>)}
            </div>
        )
    } else {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
}

export default Display