import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { PaymentService } from 'src/app/services/payment.service';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
})
export class InvoiceCreateComponent implements OnInit {
  invoiceForm!: FormGroup;
  customerData: any = [];
  itemsValidation: boolean[] = [];
  submited:boolean = false;
  paymentMethods:any = [];
  termsOptions:any = [];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private termService: TermsService,
    private route: Router
  ) {}
  ngOnInit() {
    this.formInit();
    this.getCustomer();
    this.getPayments();
    this.getTerms();
  }

formInit() {
  this.invoiceForm = this.fb.group({
    invoice: this.fb.group({
      bill_from_id: ['', Validators.required],
      bill_to_id: ['', Validators.required],
      invoice_date: ['', Validators.required],
      due_date: ['', Validators.required],
      subtotal: [0],
      tax_rate: [0],
      total: [0],
      payment_id: ['', Validators.required],
      term_id: ['']
    }),
    items: this.fb.array([this.itemformInit()]),
  });
  this.itemsValidation = [false];
}


  itemformInit() {
    return this.fb.group({
      description: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [1, Validators.required],
      total: [0],
    });
  }

  getitemsForms(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    this.getitemsForms().push(this.itemformInit());
    this.itemsValidation.push(false);
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe((res) => {
      this.customerData = res;
    });
  }

  getPayments(){
    this.paymentService.getPaymentsByInvoice().subscribe(res => {
      this.paymentMethods = res;
    })
  }

  getTerms(){
    this.termService.getTermsByInvoice().subscribe(res => {
      this.termsOptions = res;
    })
  }

  removeItem(index: number) {
    this.getitemsForms().removeAt(index);
    this.calculateTotals();
  }

  calculateTotals() {
    let subtotal = 0;
    this.getitemsForms().controls.forEach((item) => {
      const price = item.get('price')?.value || 0;
      const quantity = item.get('quantity')?.value || 0;
      const total = price * quantity;
      item.get('total')?.setValue(total, { emitEvent: false });
      subtotal += total;
    });

    this.invoiceForm.get('invoice.subtotal')?.setValue(subtotal);
    const tax = this.invoiceForm.get('invoice.tax')?.value || 0;
    const total = subtotal + (subtotal * tax) / 100;
    this.invoiceForm.get('invoice.total')?.setValue(total);
  }

onSubmit() {
  this.submited = true;
  this.itemsValidation = this.getitemsForms().controls.map(() => true);

  if (this.invoiceForm.invalid) {
    return;
  } else {
    const params: any = this.invoiceForm.value.invoice;
    params.items = this.invoiceForm.value.items;
    this.invoiceService.createInvoice(params).subscribe((res) => {
      if(res){
        this.route.navigate(['/invoices']);
      }
    });
  }
}


}
