import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css']
})
export class WhatsappButtonComponent {
  /** Nomor WhatsApp (format internasional tanpa '+' atau spasi, contoh: 6281234567890) */
  @Input() phoneNumber: string = '6281934271202';

  /** Pesan awal default saat pengguna membuka chat WhatsApp */
  @Input() defaultMessage: string = 'Halo Admin Desa Belok Sidan, saya ingin bertanya terkait informasi dan produk desa.';

  /** Teks popup / tooltip pada tombol */
  @Input() label: string = 'Hubungi Kami';

  /**
   * Menghasilkan URL langsung ke WhatsApp API / Web
   */
  get whatsappUrl(): string {
    const cleanNumber = this.phoneNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(this.defaultMessage);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }
}
