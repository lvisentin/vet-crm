import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-new-lead',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './new-lead.component.html',
  styleUrl: './new-lead.component.scss'
})
export class NewLeadComponent {

}
