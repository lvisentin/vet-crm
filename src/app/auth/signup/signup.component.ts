import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm!: FormGroup;
  loading: boolean = false;

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly supabaseService: SupabaseService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    try {
      this.loading = true;
      const email = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;
      const { error } = await this.supabaseService.signUp(email, password);
      if (error) throw error;
      this.toastr.success('Usuário criado');
    } catch (e) {
      this.toastr.error('Ocorreu um erro');
      throw e;
    } finally {
      this.loading = false;
    }
  }
}
