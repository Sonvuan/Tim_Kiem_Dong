import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParaCurrencyRateService } from '../../services/para-currency-rate.service';

@Component({
  selector: 'app-para-currency-rate-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './para-currency-rate-edit.component.html',
  styleUrls: ['./para-currency-rate-edit.component.css']
})
export class ParaCurrencyRateEditComponent implements OnInit {
  id!: number;
  para: any = {};
  errorMsg = '';
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private paraService: ParaCurrencyRateService,
    private router: Router
  ) { }

 ngOnInit(): void {
    const stateData = history.state?.data;

    if (!stateData || !stateData.id) {
      this.router.navigate(['']);
      return;
    }

    this.para = stateData;
    this.id = stateData.id;
  }




  // loadData(): void {
  //   this.paraService.findById(this.id).subscribe(data => {
  //     this.para = data;
  //   });
  // }


  onSubmit(paraForm: NgForm) {
    this.submitted = true;
    if (paraForm.invalid) return;
    this.paraService.update(this.id, this.para).subscribe({
      next: () => {
        this.router.navigate([''], { queryParams: { saved: true } });
      },
      error: err => {
        console.error('Lỗi lưu dữ liệu:', err);
      }
    });
  }

  backForm(): void {
    this.router.navigate(['']);
  }

} 