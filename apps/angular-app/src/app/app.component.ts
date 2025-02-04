import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountriesPageComponent } from './countries-page/countries-page.component';

@Component({
  imports: [RouterModule, CountriesPageComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app';
}
