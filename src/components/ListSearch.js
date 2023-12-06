import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ListSearch.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchTerm, setSearchRegion } from '../reducers/actions';

const ListSearch = ({ countries }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchReg, setSearchReg] = useState('');
    const navigate = useNavigate();

    const getFilterKey = () => {
        return `scrollPosition-${searchTerm}-${searchReg}`;
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const key = getFilterKey();
        localStorage.setItem(key, window.scrollY)
        localStorage.setItem('searchTerm', value);
    }

    const handleRegionChange = (e) => {
        const value = e.target.value;
        setSearchReg(value);
        const key = getFilterKey();
        localStorage.setItem(key, window.scrollY)
        localStorage.setItem('searchReg', value);
    }

    const handleCountryClick = (selectedCountry) => {
        const key = getFilterKey();
        const currentPosition = window.scrollY;
        localStorage.setItem(key, currentPosition);
        navigate(`/country/${selectedCountry.cca3}`);
    };

    useEffect(() => {
        const getFilterKey = () => {
            return `scrollPosition-${searchTerm}-${searchReg}`;
        };
        const savedSearchTerm = localStorage.getItem('searchTerm');
        const savedSearchReg = localStorage.getItem('searchReg');
        const key = getFilterKey();
        const previousScrollPosition = localStorage.getItem(key);

        if (savedSearchTerm) {
            setSearchTerm(savedSearchTerm);
        }
        
        if (savedSearchReg) {
            setSearchReg(savedSearchReg);
        }

        if(previousScrollPosition) {
            window.scrollTo(0, previousScrollPosition);
        }

    }, [searchTerm, searchReg]);

    // const filteredCountries = countries.filter(
    //     country => 
    //       country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //       ((searchReg === 'option1') || country.region.toLowerCase().includes(searchReg.toLowerCase()))
    // );

    const filteredCountries = useMemo(() => {
        return countries.filter (
        country => 
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
          ((searchReg === 'option1') || country.region.toLowerCase().includes(searchReg.toLowerCase()))
        );
    }, [countries, searchTerm, searchReg]);

    const formatPopulation = (population) => {
        return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return (
    <div className='listSearch'>
        <div className='Searchbar'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className='darkLoupe'>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z" fill="#848484"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className='lightLoupe'>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z" fill="white"/>
                </svg>
                <input 
                type="text" 
                placeholder="Search for a country"
                value={searchTerm}
                onChange={handleSearchChange}
                />
            </div>
            <div className='menuRegion'>
                <select value={searchReg} onChange={handleRegionChange}>
                    <option value="option1">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Amérique</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Océanie</option>
                    <option value="Antarctic">Antarctic</option>
                </select>
            </div>
        </div> 

        <ul>
            {filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                    <Link key={country.cca3} to={`/country/${country.cca3}`} className='country-link' onClick={() => handleCountryClick(country)}>
                        <li>
                            <img src={country.flags.png} alt={country.name.common}/>
                            <h3>{country.name.common}</h3><br />
                            <strong>Population</strong>: {formatPopulation(country.population)}<br />
                            <strong>Region</strong>: {country.region}<br />
                            <strong>Capital</strong>: {country.capital}<br />
                        </li>
                    </Link>
                ))
                ) : (
                <p>No matching countries found.</p>
            )}
        </ul>
    </div>);
}

const mapStateToProps = state => ({
    searchTerm: state.search.searchTerm,
    searchRegion: state.search.searchRegion,
  });
  
  const mapDispatchToProps = dispatch => ({
    setTerm: term => dispatch(setSearchTerm(term)),
    setRegion: region => dispatch(setSearchRegion(region)),
  });

// export default ListSearch;
export default connect(mapStateToProps, mapDispatchToProps)(ListSearch);