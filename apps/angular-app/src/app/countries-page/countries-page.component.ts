import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

import { themeBalham } from 'ag-grid-community';


@Component({
  selector: 'app-countries-page',
  imports: [AgGridAngular],
  templateUrl: './countries-page.component.html',
  styleUrl: './countries-page.component.css',
  standalone: true,
})
export class CountriesPageComponent {
readonly #http = inject(HttpClient);
  // Row data for the ag-grid table
  rowData: any[] = [];

  constructor() {
    const myTheme = themeBalham.withParams({ accentColor: 'red' });

  }
  // Column definitions for ag-grid. Note: Some fields require custom value getters because the API returns nested objects.
  columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      valueGetter: (params: any) => params.data.name?.common || 'N/A'
    },
    {
      headerName: 'Capital',
      field: 'capital',
      // Some countries have multiple capitals, so we display the first one or N/A if missing.
      valueGetter: (params: any) => (params.data.capital && params.data.capital.length) ? params.data.capital[0] : 'N/A'
    },
    { headerName: 'Region', field: 'region' },
    { headerName: 'Population', field: 'population' }
  ];
  loadCountries() {
    this.#http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      data => {
        this.rowData = data;
      },
      error => {
        console.error('Error fetching countries:', error);
      }
    );
  }
}
