import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Sphere, Graticule } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import CountryInfo from "./countryInfo/CountryInfo";
import s from './Home.module.css'


const allCountriesUrl = 'https://restcountries.com/v3.1/all'
const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'
const colorScale = scaleLinear().domain([0, 1500000000]).range(['#0071ce', '#0a1f8f'])

const App = () => {
  const[countries, setCountries] = useState([])
  const[position, setPosition] = useState({coordinates:[0,0], zoom:1})
  const[content, setContent] = useState("")
  const[details, setDetails] = useState([])

  const handleMoveEnd = (position) => {
    setPosition(position)
  }

  const getData = async() => {
    try {
      const response = await axios.get(
        allCountriesUrl
      )
      return setCountries(response.data)
    } catch (error) {
      return error.message
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const getDetails = async(geo) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${geo.id}`
      )
      return setDetails([...details, response.data])
    } catch (error) {
      return error.message
    }
  }


  return (
    <div>
      <h4 className={s.header}>World mapchart showing main details of each country</h4>
      <ReactTooltip>{content}</ReactTooltip>
      <div className={s.container}>
        <ComposableMap
        width={900}
        height={400}
        projectionConfig={{
          rotate:[-10, 0, 0],
          scale: 147
        }}
        data-tip=""
        >
          {countries.length > 0 
          ?
          <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}>
            <Sphere stroke="#000" strokeWidth={0.3}/>
            <Graticule stroke="#000" strokeWidth={0.3}/>
            <Geographies geography={geoUrl}>
              {({geographies}) => 
                geographies.map((geo) => {
                  const isos = countries.find((s) => s.cca3 === geo.id)
                  return (
                    <Geography 
                      className={s.geo}
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isos ? colorScale(isos["population"]) : "#333"} 
                      onMouseEnter={() => {
                        const name = geo.properties.name
                        setContent(name)
                      }}
                      onMouseLeave={() => {
                        setContent("")
                      }}
                      onClick={() => getDetails(geo)}
                      />
                  )
                })}
            </Geographies>            
          </ZoomableGroup>
          : 
          <p>Loading...</p>}
        </ComposableMap>        
      </div>
      {details.length ? <CountryInfo details={details}/> :  <></>}
    </div>
  );
}

export default App;
