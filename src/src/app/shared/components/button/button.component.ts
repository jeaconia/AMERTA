import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  /** Warna tombol: 'primary' | 'secondary' | 'outline' */
  @Input() variant: ButtonVariant = 'primary';

  /** Ukuran tombol: 'sm' | 'md' | 'lg' */
  @Input() size: ButtonSize = 'md';

  /** Teks yang ditampilkan di dalam tombol */
  @Input() label: string = 'Klik Saya';

  /** Disable state */
  @Input() disabled: boolean = false;

  /** Event saat tombol diklik, diteruskan ke parent component */
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
