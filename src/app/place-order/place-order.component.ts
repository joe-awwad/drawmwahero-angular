import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  heroOrder: FormGroup;

  constructor(private forms: FormBuilder) { }

  get isForSomeoneElse() {
    return this.heroOrder.value.heroFor === 'other';
  }

  get isAllFeatures() {
    return this.heroOrder.value.features.archEnemy ||
      this.heroOrder.value.features.originStory;
  }

  ngOnInit(): void {
    this.heroOrder = this.createHeroOrderForm();
  }

  onSubmit() {
    console.log(this.heroOrder.value);
  }


  private createHeroOrderForm(): FormGroup {
    return this.forms.group({
      requester: this.forms.group({
        firstName: this.forms.control('', [Validators.required]),
        lastName: this.forms.control('', Validators.required),
        email: this.forms.control('', Validators.required)
      }),
      heroFor: this.forms.control('myself'),
      requesteeName: this.forms.control(''),
      features: this.forms.group({
        superPowers: this.forms.control(true),
        archEnemy: this.forms.control(false),
        originStory: this.forms.control(false)
      }),
      likes: this.forms.control('', Validators.required),
      dislikes: this.forms.control('', Validators.required),
      favoriteColors: this.forms.control(''),
      qualities: this.forms.control(''),
      habits: this.forms.control(''),
      products: this.forms.group({
        poster: this.forms.control(true),
        mug: this.forms.control(false),
        wood: this.forms.control(false),
        canvas: this.forms.control(false),
        pillow: this.forms.control(false),
        tshirt: this.forms.control(false),
      })
    });
  }
}
