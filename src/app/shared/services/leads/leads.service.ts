import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

export const LEADS_TABLE = 'leads';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getLeads() {
    return await this.supabase
      .from(LEADS_TABLE)
      .select(`id, name, phone, created_at`);
  }

  async createLead({ name, phone }: { name: string, phone: string }) {
    return await this.supabase.from(LEADS_TABLE).insert({ name, phone });
  }
}
