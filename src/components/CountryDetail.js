import { useParams, Link } from 'react-router-dom';
import "../styles/CountryDetail.css";

const CountryDetail = ({ countries }) => {
  const { id } = useParams();

  if(countries.length === 0){
    return <div>Loading ...</div>;
  }

  const country = countries.find(country => country.cca3 === id);

  if (!country) {
    return <div>Country not found</div>;
  }

  const { name, capital, region, population, flags, languages, tld, currencies, subregion } = country;
  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const nativeName = country.name?.nativeName?.common || country.name?.nativeName?.eng?.common;

  return (
    <div className='detailCountry'>
      <Link to="/" className='buttonBack'>
        <svg className='arrowBackDark' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z" fill="#111517"/>
        </svg>
        <svg className='arrowBackLight' xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.46447 0.107445L7.64298 1.28596L3.75389 5.17504L18.6031 5.17504L18.6031 6.82496L3.75389 6.82496L7.64298 10.714L6.46447 11.8926L0.57191 6L6.46447 0.107445Z" fill="white"/>
        </svg>
        Back
      </Link>
      <div>
        <img src={flags.png} alt={name.common} />
        <div>
          <h3>{name.common}</h3>
          <div className='countryInformation'>
            <div>      
              {nativeName && (
                <p>
                  <strong>Native Name</strong>: {nativeName}
                </p>
              )} 
              <p><strong>Population</strong>: {formatPopulation(population)}</p>
              <p><strong>Region</strong>: {region}</p>
              <p><strong>Sub Region</strong>: {subregion}</p>
              <p><strong>Capital</strong>: {capital}</p>
            </div>
            <div className='languesCountry'>
              <div>
                <p><strong>Top Level Domain</strong>: {tld[0]}</p>
                <div className='currencies'>
                  <p><strong>Currencies</strong>: </p>
                  <ul>
                    {Object.entries(currencies).map(([key, value]) => (
                      <li key={key}>
                        {value.name} ({key})
                      </li>
                    ))}
                  </ul>
                </div>
                <p><strong>Languages</strong>: {Object.values(languages).join(', ')}</p>
              </div>
            </div>
          </div>
          <div className='bordersCountries'>
            <p><strong>Border Countries</strong>: </p>
            <div className='borderList'>
              {country.borders && country.borders.map((borderCode, index) => {
                const borderCountry = countries.find(country => country.cca3 === borderCode);
                if (borderCountry) {
                  return (
                    <Link className='CountriesLink' key={index} to={`/country/${borderCountry.cca3}`}>
                      <p>{borderCountry.name.common}</p>
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
