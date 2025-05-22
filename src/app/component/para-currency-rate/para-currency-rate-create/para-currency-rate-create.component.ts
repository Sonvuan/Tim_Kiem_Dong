import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ParaCurrencyRateService } from '../../services/para-currency-rate.service';

@Component({
  selector: 'app-para-currency-rate-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './para-currency-rate-create.component.html',
  styleUrls: ['./para-currency-rate-create.component.css']
})
export class ParaCurrencyRateCreateComponent implements OnInit {
  para = {
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

  saved = false;
  errorMsg = '';
  submitted = false;

  constructor(
    private paraService: ParaCurrencyRateService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(paraform: NgForm) {
    this.submitted = true;
    if (paraform.invalid) {
      return; // Không gọi API khi form chưa hợp lệ
    }
    this.paraService.create(this.para).subscribe({
      next: () => {
        this.router.navigate([''], { queryParams: { saved: true } });
      },
      error: err => {
        console.error('Lỗi lưu dữ liệu:', err);
        this.errorMsg = 'Lỗi lưu dữ liệu. Vui lòng thử lại.';
      }
    });
  }


  // resetForm() {
  //   this.para = {
  //       currency: '',
  //   currencyName: '',
  //   currencyHoliday: '',
  //   fcPurchase: '',
  //   fcSale: '',
  //   cashTransaction: '',
  //   currencyExchange: '',
  //   vndGlAccount: '',
  //   fcGlAccount: '',
  //   country: '',
  //   buyingRate: '',
  //   brCashHigh: '',
  //   brCashLow: '',
  //   sellingRate: '',
  //   intermediateRate: '',
  //   paraStatus: '',
  //   activeStatus: '',
  //   jsonData: ''
  //   };
  //   this.saved = false;
  //   this.errorMsg = '';
  // }
  backForm() {
    this.router.navigate(['']);
  }
}