import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signInForm!: FormGroup;
  loading: boolean = false;

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly supabaseService: SupabaseService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (this.supabaseService.isLoggedIn()) {
      this.router.navigate(['/internal/dashboard']);
    }

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    try {
      this.loading = true;
      const email = this.signInForm.value.email;
      const password = this.signInForm.value.password;
      const {
        error,
        data: { session },
      } = await this.supabaseService.signIn(email, password);
      if (error) throw error;
      this.toastr.success('Login feito');
      localStorage.setItem('authorization', session?.access_token!);
    } catch (e) {
      this.toastr.error('Login ou senha incorretos');
      throw e;
    } finally {
      this.loading = false;
    }
  }
}
