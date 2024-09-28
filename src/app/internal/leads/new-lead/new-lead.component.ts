import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { LeadsService } from '../../../shared/services/leads/leads.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-lead',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgClass, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './new-lead.component.html',
  styleUrl: './new-lead.component.scss'
})
export class NewLeadComponent {
  public newLeadForm!: FormGroup;
  public loading: boolean = false;

  get name() {
    return this.newLeadForm.get('name');
  }

  get phone() {
    return this.newLeadForm.get('phone');
  }

  constructor(private readonly formBuilder: FormBuilder, private readonly leadsService: LeadsService, private readonly toastrService: ToastrService) { }

  ngOnInit(): void {
    this.newLeadForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  public onSubmit(): void {
    this.loading = true;
    // console.log(this.phone?.errors)
    this.leadsService.createLead({ name: this.name?.value, phone: this.phone?.value })
      .then(() => {
        this.toastrService.success('Lead cadastrado');
        this.newLeadForm.reset();
      })
      .finally(() => this.loading = false)
  }
}
