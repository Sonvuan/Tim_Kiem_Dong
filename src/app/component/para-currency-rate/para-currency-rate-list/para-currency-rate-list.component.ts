import { Component, OnInit } from '@angular/core';
import { ParaCurrencyRateService } from '../../services/para-currency-rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-para-currency-rate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PaginationModule],
  templateUrl: './para-currency-rate-list.component.html',
  styleUrls: ['./para-currency-rate-list.component.css']
})
export class ParaCurrencyRateListComponent implements OnInit {
  list: any[] = [];
  model: any = {};
  searchInput: any = {
    currency: '',
    currencyName: '',
    currencyHoliday: '',
    fcPurchase: '',
    fcSale: '',
    cashTransaction: '',
    currencyExchange: '',
    vndGlAccount: '',
    fcGlAccount: '',
    country: '',
    buyingRate: '',
    brCashHigh: '',
    brCashLow: '',
    sellingRate: '',
    intermediateRate: '',
    paraStatus: '',
    activeStatus: '',
    jsonData: ''
  };

  totalPages = 0;
  totalElements = 0;
  currentPage = 1;
  deleted = false;
  saved = false;
  edit = false;
  pageSize = 5;
  isSearching = false;
  goToPageInput = 1;

  constructor(
    private service: ParaCurrencyRateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadList(this.currentPage, this.pageSize);

    this.route.queryParams.subscribe(params => {
      if (params['saved']) {
        this.saved = true;
        setTimeout(() => this.saved = false, 3000);
        this.router.navigate([], { queryParams: { saved: null }, queryParamsHandling: 'merge' });
      }
      if (params['deleted']) {
        this.deleted = true;
        setTimeout(() => this.deleted = false, 3000);
        this.router.navigate([], { queryParams: { deleted: null }, queryParamsHandling: 'merge' });
      }
      if (params['edit']) {
        this.edit = true;
        setTimeout(() => this.edit = false, 3000);
        this.router.navigate([], { queryParams: { edit: null }, queryParamsHandling: 'merge' });
      }
    });
  }

  // load lại dannh sách
  loadList(page: number = 1, size: number = this.pageSize) {
  
    this.service.list({ page: page - 1, size }).subscribe({
      next: data => {
        this.list = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.currentPage = page;
        this.pageSize = size; 
      },
      error: err => console.error('Lỗi load danh sách:', err),
    });
  }

  // Hàm gọi khi người dùng click chuyển trang
  pageChanged(event: any) {
    if (this.isSearching) {
      this.search(event.page, this.pageSize);
    } else {
      this.loadList(event.page, this.pageSize);
    }
  }


  // Khi thay đổi số bản ghi trên trang
  onSizeChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const value = input?.value ? Number(input.value) : this.pageSize;
    if (value > 0) {
      this.loadList(1, value);
    }
  }

  //khi nhảy trang
  goToPage() {
    if (!this.goToPageInput || this.goToPageInput < 1 || this.goToPageInput > this.totalPages) {
      Swal.fire('Thông báo', 'Số trang không hợp lệ', 'warning');
      return;
    }
    this.currentPage = this.goToPageInput;

  }


  // xoá
  delete(id?: number) {
    if (!id) return;

    Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(result => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            this.deleted = true;
            this.loadList(this.currentPage, this.pageSize);
            setTimeout(() => {
              this.deleted = false;
            }, 3000);
          },
          error: () => {
            Swal.fire('Lỗi', 'Xóa thất bại', 'error');
          }
        });
      }
    });
  }

  // chuyển trang khi thêm
  goToAdd(){
    this.router.navigate(['/add'])
  }

  // chuyển trang khi ấn sửa
  goToEdit(item: any) {
    this.router.navigate(['/edit'], {
      state: { data: item }
    });
  }

  // hàm tìm kiếm động
  search(page?: number, size?: number) {
    const reqPage = page ?? 1;
    const reqSize = size ?? this.pageSize;

    this.isSearching = true;

    const searchBody = {
      search: this.searchInput,
      page: reqPage - 1,
      size: reqSize
    };

    // gọi api tìm kiếm động
    this.service.findBySpec(searchBody).subscribe({
      next: data => {
        this.list = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.currentPage = reqPage;
        this.pageSize = reqSize;
      },
      error: err => console.error('Lỗi tìm kiếm:', err),
    });
    //  this.service.findByNav(searchBody).subscribe({
    //   next: data => {
    //     this.list = data.content;
    //     this.totalPages = data.totalPages;
    //     this.totalElements = data.totalElements;
    //     this.currentPage = reqPage;
    //     this.pageSize = reqSize;
    //   },
    //   error: err => console.error('Lỗi tìm kiếm:', err),
    // });
    //  this.service.findByPro(searchBody).subscribe({
    //   next: data => {
    //     this.list = data.content;
    //     this.totalPages = data.totalPages;
    //     this.totalElements = data.totalElements;
    //     this.currentPage = reqPage;
    //     this.pageSize = reqSize;
    //   },
    //   error: err => console.error('Lỗi tìm kiếm:', err),
    // });

  }

  // reset form
  reset() {
    this.searchInput = {
      currency: '',
      currencyName: '',
      currencyHoliday: '',
      fcPurchase: '',
      fcSale: '',
      cashTransaction: '',
      currencyExchange: '',
      vndGlAccount: '',
      fcGlAccount: '',
      country: '',
      buyingRate: '',
      brCashHigh: '',
      brCashLow: '',
      sellingRate: '',
      intermediateRate: '',
      paraStatus: '',
      activeStatus: '',
      jsonData: ''
    };
    this.search(1, this.pageSize);
  }


}
