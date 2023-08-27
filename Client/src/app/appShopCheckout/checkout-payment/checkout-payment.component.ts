import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Address } from 'src/app/appModels/address';
import { Basket } from 'src/app/appModels/basket';
import { OrderToCreate } from 'src/app/appModels/orderToCreate';
import { AccountService } from 'src/app/appServices/account.service';
import { BasketService } from 'src/app/appServices/basket.service';
import { CheckoutService } from 'src/app/appServices/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;
  cardErrors: any;
  loading = false;



  constructor(private checkoutService: CheckoutService, private accountService: AccountService, private basketService: BasketService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    loadStripe('pk_test_51NaejaCIqvJXAV1alqBmyqf5XwXynsImuxoSWoXME7m5q78LOwRU7Wmf9qD0DIa6pC7ATFLMmruCgfEZwu5727SN00Y21NL3Kp').then(stripe => {
      this.stripe = stripe;
      const element = stripe?.elements();
      if (element) {
        this.cardNumber = element.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', event => {
          this.cardNumberComplete = event.complete;
          // console.log(event);
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })

        this.cardExpiry = element.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', event => {
          this.cardExpiryComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })

        this.cardCvc = element.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', event => {
          this.cardCvcComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })
      }
    })
  }

  get paymentFormComplete() {
    return this.checkoutForm?.get('paymentForm')?.valid && this.cardNumberComplete && this.cardExpiryComplete && this.cardCvcComplete
  }


  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error("can not ge the basket");
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        // console.log(order);
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras)
      }
      else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error: any) {
      console.log(error);
      this.toastr.error(error.message)
    }
    finally {
      this.loading = false;
    }
  }
  private async confirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket Is Null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
    if (!result) throw new Error('problem attempting payment with stripe');
    return result;
  }

  private async createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket Is Null');
    const orderToCreate = this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address
    if (!deliveryMethodId || !shipToAddress) throw new Error('something wrong with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress,
    }
  }
}
