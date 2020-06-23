import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { PlaceOrderService } from './place-order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  heroOrder: FormGroup;

  constructor(private forms: FormBuilder, private placeOrderService: PlaceOrderService) { }

  ngOnInit(): void {
    this.heroOrder = this.createHeroOrderForm();
  }

  get firstName() {
    return this.heroOrder.get('requester.firstName');
  }

  get lastName() {
    return this.heroOrder.get('requester.lastName');
  }

  get email() {
    return this.heroOrder.get('requester.email');
  }

  get likes() {
    return this.heroOrder.get('likes');
  }

  get dislikes() {
    return this.heroOrder.get('dislikes');
  }

  get favoriteColors() {
    return this.heroOrder.get('favoriteColors');
  }

  get images(): FormArray {
    return this.heroOrder.get('images') as FormArray;
  }

  get isForSomeoneElse() {
    return this.heroOrder.value.heroFor === 'other';
  }

  get isAllFeatures() {
    return this.heroOrder.value.features.archEnemy ||
      this.heroOrder.value.features.originStory;
  }

  onSubmit() {
    const order = this.adaptHeroOrder(this.heroOrder.value);
    this.placeOrderService.placeOrder(order).subscribe(
      (_) => {
        window.alert('Your order has been placed! Thank you for choosing Draw Me A Hero :)');
        this.heroOrder = this.createHeroOrderForm();
      },
      (error) => console.error('Failed to place order', error)
    );
  }

  hasError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onRemoveImage(index: number) {
    this.images.removeAt(index);
  }

  onImageSelected(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => this.onImageLoaded(reader, file);
    }
  }

  private onImageLoaded(reader, file) {
    this.images.push(this.forms.group({
      name: this.forms.control(file.name),
      type: this.forms.control(file.type),
      data: this.forms.control(reader.result)
    }));
  }

  private createHeroOrderForm(): FormGroup {
    return this.forms.group({
      requester: this.forms.group({
        firstName: this.forms.control('', Validators.required),
        lastName: this.forms.control('', Validators.required),
        email: this.forms.control('', [Validators.required, Validators.email])
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
      favoriteColors: this.forms.control('', Validators.required),
      qualities: this.forms.control(''),
      habits: this.forms.control(''),
      products: this.forms.group({
        poster: this.forms.control(true),
        mug: this.forms.control(false),
        wood: this.forms.control(false),
        canvas: this.forms.control(false),
        pillow: this.forms.control(false),
        tshirt: this.forms.control(false),
      }),
      images: this.forms.array([], Validators.required)
    });
  }

  private adaptHeroOrder(formValue: any) {
    return {
      requester: formValue.requester,
      forRequester: this.isForRequester(formValue),
      requesteeName: this.resolveRequesteeName(formValue),
      likes: [formValue.likes],
      dislikes: [formValue.dislikes],
      qualities: [formValue.qualities],
      habits: [formValue.habits],
      favoriteColors: [formValue.favoriteColors],
      features: {
        withNemesis: formValue.features.archEnemy,
        withOriginStory: formValue.features.originStory
      },
      products: this.resolveProducts(formValue),
      images: formValue.images
    };
  }

  private isForRequester(formValue: any) {
    return formValue.heroFor === 'myself';
  }

  private resolveRequesteeName(formValue: any) {
    return formValue.requesteeName ? formValue.requesteeName : formValue.requester.firstName + ' ' + formValue.requester.lastName;
  }

  private resolveProducts(formValue: any) {
    return Object.keys(formValue.products).filter(product => formValue.products[product]);
  }
}
