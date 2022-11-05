import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'binaryimage-app';
  imgFile: string = '';
  area_total: number | undefined;

   imgForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  change(e:any) {
    const reader = new FileReader();

    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imgFile = reader.result as string;
        this.imgForm.patchValue({
          imgSrc: reader.result as string
        });

      };
    }
  }

  ramdomPuntos(min:any, max:any) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onSubmit(){

    let arr = this.imgFile.split(","),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

    while (n--) {
      if (bstr.charCodeAt(n) >= 64){
        u8arr[n] = 1
      } else {
        u8arr[n] = 0
      }
    }

    var iter = 20
    this.area_total = 0

    for (let r = 0; r < iter; r++){

        let area = 0
        let n_random = this.ramdomPuntos(0, bstr.length)
        
        for (let i = 0; i < n_random; i++ ){
            let pixel = this.ramdomPuntos(0, bstr.length)
            if (u8arr[pixel] == 1) {
              area = area + 1
            }
        }

        area = area/bstr.length
        this.area_total = this.area_total + area
    }

    this.area_total = 100.0 * this.area_total /iter
    
  }

}
