import { Component, OnInit } from '@angular/core';
import { ParaCurrencyRateService } from '../../services/para-currency-rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

declare var bootstrap: any; // Khai báo biến bootstrap để sử dụng trong component

@Component({
  selector: 'app-para-currency-rate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PaginationModule, NgxPaginationModule],
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
  selectedItem : any; // Biến để lưu item được chọn khi mở modal
    

  constructor(
    private service: ParaCurrencyRateService,
    private route: ActivatedRoute,
    private router: Router,
    
    
  ) { }


  ngOnInit(): void {
    this.loadList();
  }

  // load lại dannh sách
  loadList(page: number = 1, size: number = this.pageSize) {

    this.service.getAll({}).subscribe({
      next: data => {
        this.list = data;          
      
        this.totalElements = this.list.length;
        this.totalPages = Math.ceil(this.totalElements / this.pageSize);
        this.currentPage = page;
      },
      error: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Load danh sách thất bại!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }

  // Hàm gọi khi người dùng click chuyển trang
  pageChanged(event: any) {
    const selectedPage = event.page || event;
    if (this.isSearching) {
      this.search(selectedPage, this.pageSize);
    } else {
      this.loadList(selectedPage, this.pageSize);
    }
  }



  // Khi thay đổi số bản ghi trên trang
  onSizeChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const value = input?.value ? Number(input.value) : this.pageSize;

    if (value > 0) {
      this.pageSize = value;       // Cập nhật lại giá trị pageSize

      if (this.isSearching) {
        this.search(1, this.pageSize);  // Tìm kiếm lại từ trang đầu
      } else {
        this.loadList(1, this.pageSize); // Load danh sách lại từ trang đầu
      }
    } else {
      Swal.fire('Thông báo', 'Số bản ghi mỗi trang phải lớn hơn 0', 'warning');
    }
  }


  //khi nhảy trang
  goToPage() {
    if (!this.goToPageInput || this.goToPageInput < 1 || this.goToPageInput > this.totalPages) {
      Swal.fire('Thông báo', 'Số trang không hợp lệ', 'warning');
      console.log('Số trang không hợp lệ:', this.goToPageInput);
      return;
    }

    const selectedPage = this.goToPageInput;

    if (this.isSearching) {
      this.search(selectedPage, this.pageSize);
      console.log(this.search);
    } else {
      this.loadList(selectedPage, this.pageSize);
    }
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
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Xoá thành công!',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });

            this.loadList(this.currentPage, this.pageSize);
          },
          error: () => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Xoá thất bại!',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });
          }
        });
      }
    });
  }


  // chuyển trang khi thêm
  goToAdd() {
    this.router.navigate(['/add'])
  }

  // chuyển trang khi ấn sửa
  goToEdit(item: any) {
    this.router.navigate(['/edit'], {
      state: { data: item }
    });
  }

  // hàm tìm kiếm động
  search(page: number = 1, size: number = this.pageSize) {
  

    this.isSearching = true;

    const searchBody = {
      search: this.searchInput,
      page: page - 1,
      size: size
    };

    // gọi api tìm kiếm động
    // this.service.findBySpec(searchBody).subscribe({
    //   next: data => {
    //     this.list = data.content;
    //     this.totalPages = data.totalPages;
    //     this.totalElements = data.totalElements;
    //     this.currentPage = reqPage+1;
    //     this.pageSize = reqSize;
    //   },
    //   error: err => console.error('Lỗi tìm kiếm:', err),
    // });
    this.service.findByNav(searchBody).subscribe({
      next: data => {
        this.list = data.content;
        this.totalElements = this.list.length;
        this.totalPages = Math.ceil(this.totalElements / this.pageSize);
        this.currentPage = page;
        this.pageSize = size;
        
      },
  
      error: err => console.error('Lỗi tìm kiếm:', err),
    });
    //  this.service.findByPro(searchBody).subscribe({
    //   next: data => {
    //     this.list = data.content;
    //     this.totalPages = data.totalPages;
    //     this.totalElements = data.totalElements;
    //     this.currentPage = reqPage+1;
    //     this.pageSize = reqSize;
    //   },
    //   error: err => console.error('Lỗi tìm kiếm:', err),
    // });

  }
 openDetail(item: any) {
    this.selectedItem = item;
    // Mở modal Bootstrap
    const modalElement = document.getElementById('detailModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
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
