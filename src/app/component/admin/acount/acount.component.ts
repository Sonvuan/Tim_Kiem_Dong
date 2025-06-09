import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule } from 'ngx-permissions';

@Component({
  selector: 'app-acount',
  standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule, NgxPermissionsModule],
  templateUrl: './acount.component.html',
  styleUrl: './acount.component.css'
})
export class AcountComponent {

  

}
