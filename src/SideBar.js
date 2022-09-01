import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import getData from './helpers';
import SuppliersTable from './tables/SuppliersTable';
import CountriesTable from './tables/CountriesTable';
import CitiesTable from './tables/CitiesTable';
import { withStyles } from '@material-ui/core';
import styles from './styles/SidebarStyles';
import data from './data';

function SideBar({ classes }) {
  // if no data cond.
  const noDataText = 'Click dashboard to see Suppliers, Countries & Cities';
  const [loading, setLoading] = useState(false);
  // get data URLs - JSON_SERVER
  const suppliersGetURL = 'suppliers';
  const countriesGetURL = 'countries';
  const citiesGetURL = 'cities';
  // data to fetch
  const [suppliers, setSuppliers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const supplierTypes = data.supplierTypes;
  // hide forms and table
  const [showSupplierCreateForm, setShowSupplierCreateForm] = useState(false);
  const [showSupplierUpdateForm, setShowSupplierUpdateForm] = useState(false);
  const [showCountryCreateForm, setShowCountryCreateForm] = useState(false);
  const [showCountryUpdateForm, setShowCountryUpdateForm] = useState(false);
  const [showCityCreateForm, setShowCityCreateForm] = useState(false);
  const [showCityUpdateForm, setShowCityUpdateForm] = useState(false);
  const [showSupplierTable, setShowSupplierTable] = useState(false);
  const [showCountryTable, setShowCountryTable] = useState(false);
  const [showCityTable, setShowCityTable] = useState(false);
  const [renderedData, setRenderedData] = useState('');
  const localCities = JSON.parse(window.localStorage.getItem('cities'));
  const localCountries = JSON.parse(window.localStorage.getItem('countries'));
  const localSuppliers = JSON.parse(window.localStorage.getItem('suppliers'));

  useEffect(() => {
    if (localCities === null) {
      setCities(data.cities);
    } else {
      setCities(localCities);
    }
    if (localCountries === null) {
      setCountries(data.countries);
    } else {
      setCountries(localCountries);
    }
    if (localSuppliers === null) {
      setSuppliers(data.suppliers);
    } else {
      setSuppliers(localSuppliers);
    }
  }, []);

  function hideAllForms() {
    setShowSupplierCreateForm(false);
    setShowSupplierUpdateForm(false);
    setShowCountryCreateForm(false);
    setShowCountryUpdateForm(false);
    setShowCityCreateForm(false);
    setShowCityUpdateForm(false);
  }

  // fetch data function
  function handleClick(dataUrl, setData, data, popupState, renderedData) {
    popupState.close();
    setLoading(true);
    // console.log(data);

    getData(dataUrl, data, setData);
    hideAllForms();
    if (renderedData === 'suppliers-rendered') {
      setShowSupplierTable(true);
      setRenderedData('suppliers-rendered');
    } else if (renderedData === 'countries-rendered') {
      setShowCountryTable(true);
      setRenderedData('countries-rendered');
    } else if (renderedData === 'cities-rendered') {
      setShowCityTable(true);
      setRenderedData('cities-rendered');
    }
  }

  return (
    <div className={classes.Content}>
      <div className={classes.Sidebar}>
        <div
          className={classes.Menu}
          style={{ width: '11vw', position: 'fixed', top: 0 }}
        >
          <PopupState variant='popover' popupId='demo-popup-menu'>
            {(popupState) => (
              <React.Fragment>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <h4 className={classes.logoTitle}>Supplier App</h4>
                  <Button
                    variant='contained'
                    {...bindTrigger(popupState)}
                    style={{
                      backgroundColor: 'black',
                      textTransform: 'uppercase',
                      minWidth: '64px',
                      padding: '0.3vw 1.75vw',
                      borderRadius: '4px',
                    }}
                  >
                    Dashboard
                  </Button>
                  <Menu {...bindMenu(popupState)} className={classes.MenuList}>
                    <MenuItem
                      style={{ width: '10vw' }}
                      className={
                        renderedData === 'suppliers-rendered'
                          ? `${classes.MenuListItemRendered} ${classes.MenuListItem}`
                          : `${classes.MenuListItem}`
                      }
                      onClick={() =>
                        handleClick(
                          suppliersGetURL,
                          setSuppliers,
                          localSuppliers === null
                            ? data.suppliers
                            : localSuppliers,
                          popupState,
                          'suppliers-rendered'
                        )
                      }
                    >
                      Suppliers
                    </MenuItem>
                    <MenuItem
                      style={{ width: '10vw' }}
                      className={
                        renderedData === 'countries-rendered'
                          ? `${classes.MenuListItemRendered} ${classes.MenuListItem}`
                          : `${classes.MenuListItem}`
                      }
                      onClick={() =>
                        handleClick(
                          countriesGetURL,
                          setCountries,
                          localCountries === null
                            ? data.countries
                            : localCountries,
                          popupState,
                          'countries-rendered'
                        )
                      }
                    >
                      Countries
                    </MenuItem>
                    <MenuItem
                      style={{ width: '10vw' }}
                      className={
                        renderedData === 'cities-rendered'
                          ? `${classes.MenuListItemRendered} ${classes.MenuListItem}`
                          : `${classes.MenuListItem}`
                      }
                      onClick={() =>
                        handleClick(
                          citiesGetURL,
                          setCities,
                          localCities === null ? data.cities : localCities,
                          popupState,
                          'cities-rendered'
                        )
                      }
                    >
                      Cities
                    </MenuItem>
                  </Menu>
                </div>
              </React.Fragment>
            )}
          </PopupState>
        </div>
        <div className={classes.Table}>
          {!loading && <div className={classes.NoDataText}>{noDataText}</div>}
          {suppliers && renderedData === 'suppliers-rendered' && (
            <div>
              <div className={classes.Tables}>
                <SuppliersTable
                  // suppliers data
                  suppliers={suppliers}
                  countries={countries}
                  cities={cities}
                  supplierTypes={supplierTypes}
                  suppliersGetURL={suppliersGetURL}
                  setSuppliers={setSuppliers}
                  // countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  // citiesGetURL={citiesGetURL}
                  setCities={setCities}
                  // show/hide supplier forms and table
                  showSupplierTable={showSupplierTable}
                  setShowSupplierTable={setShowSupplierTable}
                  showSupplierCreateForm={showSupplierCreateForm}
                  setShowSupplierCreateForm={setShowSupplierCreateForm}
                  showSupplierUpdateForm={showSupplierUpdateForm}
                  setShowSupplierUpdateForm={setShowSupplierUpdateForm}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
          {countries && renderedData === 'countries-rendered' && (
            <div>
              <div className={classes.Tables}>
                <CountriesTable
                  // countries data
                  cities={cities}
                  countries={countries}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  // show/hide country forms and table
                  showCountryTable={showCountryTable}
                  setShowCountryTable={setShowCountryTable}
                  showCountryCreateForm={showCountryCreateForm}
                  setShowCountryCreateForm={setShowCountryCreateForm}
                  showCountryUpdateForm={showCountryUpdateForm}
                  setShowCountryUpdateForm={setShowCountryUpdateForm}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
          {cities && renderedData === 'cities-rendered' && (
            <div>
              <div className={classes.Tables}>
                <CitiesTable
                  // cities data
                  cities={cities}
                  countries={countries}
                  suppliers={suppliers}
                  citiesGetURL={citiesGetURL}
                  setCities={setCities}
                  // countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  // show/hide city forms and table
                  showCityTable={showCityTable}
                  setShowCityTable={setShowCityTable}
                  showCityCreateForm={showCityCreateForm}
                  setShowCityCreateForm={setShowCityCreateForm}
                  showCityUpdateForm={showCityUpdateForm}
                  setShowCityUpdateForm={setShowCityUpdateForm}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(SideBar);
