//
//
import { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange, lastSearch }) => {

  const defaultCity = { label: "New York City, US", value: "40.7128 -74.0060" };


  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };



  useEffect(() => {

    if (lastSearch && lastSearch.name) {
      console.log("hii", lastSearch);


      setSearch({ label: lastSearch.name, value: `${lastSearch.lat} ${lastSearch.lon}` });
      onSearchChange({ label: lastSearch.name, value: `${lastSearch.lat} ${lastSearch.lon}` });
    } else {



      setSearch(defaultCity);
      onSearchChange(defaultCity);
    }

  }, []);

  const handleOnChange = (searchData) => {
    setSearch(searchData || lastSearch);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions || lastSearch}
    />
  );
};

export default Search;


















