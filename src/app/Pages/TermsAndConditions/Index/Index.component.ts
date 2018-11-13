import { Component, OnInit } from '@angular/core';
import { TermsService } from '../../../Services/Terms.service';
import { IResponse, ITerms } from '../../../models/Response';
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit {
  TremsAr: string;
  TremsEn: string;
  constructor(private _sellerService: TermsService) { }

  ngOnInit() {
    this._sellerService.getTerms().subscribe(result => {
      const terms: ITerms = <ITerms>((<IResponse>result).Terms_Conditions);
      debugger;
      this.TremsEn = terms.ValueEn;
      this.TremsAr = terms.ValueAr;
    });
  }
  AddUpdateTerms() {
    this._sellerService.UpdateTerms({ValueAr: this.TremsAr , ValueEn: this.TremsEn}).subscribe(result => {
      const response: IResponse = <IResponse>result;
      if (response.success === true) {
        swal({
          title: 'Success',
          text: 'The transaction is succeeded',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
      }).catch(swal.noop);
      } else {
        swal({
          title: 'Failed',
          text: 'The transaction is failed',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
      }).catch(swal.noop);
      }
    });
  }
}
