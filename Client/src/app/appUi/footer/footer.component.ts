import { Component } from '@angular/core';
import { faFacebookF, faLinkedinIn, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  facebook = faFacebookF;
  twitter = faTwitter;
  linkedIn = faLinkedinIn;
  whatsApp = faWhatsapp;
  location = faLocationDot;
  phone = faPhone;
  email = faEnvelope;

}
