import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { LeadsService } from '../../shared/services/leads/leads.service';
import { from, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [
    HeaderComponent,
    AgGridAngular,
    AgGridModule,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss',
})
export class LeadsComponent {
  public leadsData$: Observable<any> = of([]);

  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };

  colDefs: ColDef[] = [{ field: 'id' }, { field: 'name' }, { field: 'phone' }];

  constructor(private readonly leadsService: LeadsService) {}

  ngOnInit() {
    this.leadsData$ = from(this.leadsService.getLeads()).pipe(
      map(({ data }) => data)
    );
  }
}
