import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { BasketItem } from 'src/app/appModels/basketItem';
import { Product } from 'src/app/appModels/products';
import { User } from 'src/app/appModels/user';
import { AccountService } from 'src/app/appServices/account.service';
import { BasketService } from 'src/app/appServices/basket.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  product!: Product;
  user!: User;

  /**
   *
   */
  constructor(private observer: BreakpointObserver, private router: Router, public accountService: AccountService, public basketService: BasketService) {


  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)']).pipe(delay(1), untilDestroyed(this)).subscribe(
        (response: any) => {
          if (response.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }


  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  getBasketCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
