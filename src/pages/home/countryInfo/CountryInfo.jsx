import React from "react";
import s from './CountryInfo.module.css'

const CountryInfo = ({details}) => {
    return (
    <table className={s.countries}>
        <thead className={s.thead}>
          <tr>
            <th className={s.title}>Country</th>
            <th className={s.title}>Area in km2</th>
            <th className={s.title}>Population</th>
            <th className={s.title}>Capital</th>
            <th className={s.title}>Subregion</th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {details.map((country, i) => (
            <tr className={s.row} key={i}>
              <td className={s.row_item}>{country[0].name.common}</td>
              <td className={s.row_item}>{country[0].area}</td>
              <td className={s.row_item}>{country[0].population}</td>
              <td className={s.row_item}>{country[0].capital}</td>
              <td className={s.row_item}>{country[0].subregion}</td>                  
            </tr>
          ))}
        </tbody>
      </table>     
    )
}

export default CountryInfo
