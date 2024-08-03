import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnDestroy {
  @Input() id: string = '';
  modalRef: any;
  closeModalBtn: any;
  constructor(public ds: DataService) {
    afterNextRender(() => {
      this.modalRef = document.getElementById('myModal-' + this.ds.modalID);
      this.modalRef.style.display = 'block';
      this.closeModalBtn = document.getElementById(
        'closeModalBtn-' + this.ds.modalID
      );

      this.closeModalBtn.onclick = () => {
        this.modalRef.style.display = 'none';
        this.ds.enableModal.next(false);
      };
      window.onclick = (event: any) => {
        if (event.target === this.modalRef) {
          this.modalRef.style.display = 'none';
          this.ds.enableModal.next(false);
        }
      };
    });
  }
  @Input() title: string = '';

  ngOnDestroy(): void {
    this.ds.modalID = null;
    this.modalRef = this.closeModalBtn = null;
  }
}
