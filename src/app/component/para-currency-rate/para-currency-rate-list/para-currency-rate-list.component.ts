import { Component, OnInit } from '@angular/core';
import { ParaCurrencyRateService } from '../../services/para-currency-rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-para-currency-rate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './para-currency-rate-list.component.html',
  styleUrls: ['./para-currency-rate-list.component.css']
})
export class ParaCurrencyRateListComponent implements OnInit {
  list: any[] = [];
  model: any = {};
  searchInput: any = {
    "currency": "",
    "currencyName": "",
    "currencyHoliday": "",
    "fcPurchase": "",
    "fcSale": "",
    "cashTransaction": "",
    "currencyExchange": "",
    "vndGlAccount": '',
    "fcGlAccount": '',
    "country": "",
    "buyingRate": '',
    "brCashHigh": '',
    "brCashLow": '',
    "sellingRate": '',
    "intermediateRate": '',
    "paraStatus": '',
    "activeStatus": '',
    "jsonData": ""
  };

  totalPages = 0;
  totalElements = 0;
  currentPage = 0;
  deleted = false;
  saved = false;
  edit = false;
  constructor(private service: ParaCurrencyRateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadList();

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

  loadList(page = 0, size = 5) {
    this.currentPage = page;
    this.service.list({ page, size }).subscribe({
      next: (data) => {
        this.list = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.currentPage = page;
      },
      error: (err) => console.error('Lỗi load danh sách:', err),
    });
  }

  delete(id?: number) {
    if (!id) return;

    Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            this.deleted = true; // bật toast thành công
            this.loadList(this.currentPage);
            this.resetForm();
            setTimeout(() => {
              this.deleted = false;
            }, 3000);
          },
          error: (err) => {
            Swal.fire('Lỗi', 'Xóa thất bại', 'error');
          }
        });
      }
    });
  }
goToEdit(item: any) {
  this.router.navigate(['/edit'], {
    state: { data: item }
  });
}
  search(page?: number, size?: number) {
    const reqPage = page ?? this.searchInput.page ?? 0;
    const reqSize = size ?? this.searchInput.size ?? 5;

    const searchBody = {
      search: this.searchInput,
      page: reqPage,
      size: reqSize
    };

    // tìm kiếm theo specification
    this.service.findBySpec(searchBody).subscribe({
      next: (data) => {
        console.log('Kết quả trả về:', data);
        this.list = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.currentPage = reqPage;
      },
      error: (err) => console.error('Lỗi tìm kiếm:', err),
    });

    // tìm kiếm theo nativequery
    //  this.service.findByNav(searchBody).subscribe({
    //   next: (data) => {
    //      console.log('Kết quả trả về:', data);
    //     this.list = data.content;
    //     this.totalPages = data.totalPages;
    //     this.totalElements = data.totalElements;
    //     this.currentPage = page;
    //   },
    //   error: (err) => console.error('Lỗi tìm kiếm:', err),
    // });

    // tìm kiếm theo procedure
    //  this.service.findByPro(searchBody).subscribe({
    //   next: (data) => {
    //      console.log('Kết quả trả về:', data);
    //     this.list = data.content;
    //     this.totalPages = data.totalPages;
    //     this.totalElements = data.totalElements;
    //     this.currentPage = page;
    //   },
    //   error: (err) => console.error('Lỗi tìm kiếm:', err),
    // });
  }


  reset() {
    this.searchInput = {
       "currency": "",
    "currencyName": "",
    "currencyHoliday": "",
    "fcPurchase": "",
    "fcSale": "",
    "cashTransaction": "",
    "currencyExchange": "",
    "vndGlAccount": '',
    "fcGlAccount": '',
    "country": "",
    "buyingRate": '',
    "brCashHigh": '',
    "brCashLow": '',
    "sellingRate": '',
    "intermediateRate": '',
    "paraStatus": '',
    "activeStatus": '',
    "jsonData": ""
    };
    this.search();
  }
  resetForm() {
    this.model = {};
  }
}
