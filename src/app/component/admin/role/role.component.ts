import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthService } from '../../../services/auth.services';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule, NgxPermissionsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
    list: any[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  selectedItem: any;
  
constructor(
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.load();
  }


  load(){
    const data= {}
    this.service.list(data).subscribe({
      next: (response: any) => {
        this.list = response;
      }
      
    });
  }
      openDetail(item: any) {
    this.selectedItem = item;

  }
}
