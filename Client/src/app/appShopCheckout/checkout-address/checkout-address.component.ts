import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/appServices/account.service';
import { BasketService } from 'src/app/appServices/basket.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CheckoutAddressComponent {
  @Input() checkoutForm!: FormGroup;


  constructor(private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService, private toastr: ToastrService) {

  }
  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm')?.value).subscribe({
      next: () => {
        this.toastr.success('Address Saved');
        this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm.get('addressForm')?.value);
      }

    })
  }
}
