import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  customerDataFrom: any = [];
  customerDataTo: any = [];
  itemsValidation: boolean[] = [];
  submited: boolean = false;
  paymentMethods: any = [];
  termsOptions: any = [];
  editId: any;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private termService: TermsService,
    private route: Router,
    private actroute: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getQuaryParams();
    this.formInit();
    this.getCustomer();
    this.getPayments();
    this.getTerms();
  }

  getQuaryParams() {
    this.actroute.queryParams.subscribe((res) => {
      if (res) {
        this.editId = res['id'];
        this.getEditValues(this.editId);
      }
    });
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
        term_id: ['', Validators.required],
      }),
      items: this.fb.array([this.itemformInit()]),
    });
    this.itemsValidation = [false];
  }

  itemformInit() {
    return this.fb.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      total: [0],
    });
  }

  getitemsForms(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  getEditValues(id: any) {
    this.invoiceService.getInvoiceItems(id).subscribe((res: any) => {
      this.invoiceForm.get('invoice')?.patchValue({
        bill_from_id: res.bill_from_id,
        bill_to_id: res.bill_to_id,
        invoice_date: res.invoice_date ? res.invoice_date.split('T')[0] : '',
        due_date: res.due_date ? res.due_date.split('T')[0] : '',
        subtotal: res.subtotal,
        tax_rate: res.tax_rate,
        total: res.total,
        payment_id: res.payment_id,
        term_id: res.term_id,
      });

      const itemsFormArray = this.invoiceForm.get('items') as FormArray;
      itemsFormArray.clear();

      res.invoice_items.forEach((item: any) => {
        itemsFormArray.push(
          this.fb.group({
            description: [item.description, Validators.required],
            price: [item.price, Validators.required],
            quantity: [item.quantity, Validators.required],
            total: [item.item_total],
          })
        );
      });
      this.itemsValidation = res.invoice_items.map(() => false);
    });
  }

  addItem() {
    this.getitemsForms().push(this.itemformInit());
    this.itemsValidation.push(false);
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe((res) => {
      this.customerDataFrom = res.filter((res) => res.type === 'BILL_FROM');
      this.customerDataTo = res.filter((res) => res.type === 'BILL_TO');
    });
  }

  getPayments() {
    this.paymentService.getPaymentsByInvoice().subscribe((res) => {
      this.paymentMethods = res;
    });
  }

  getTerms() {
    this.termService.getTermsByInvoice().subscribe((res) => {
      this.termsOptions = res;
    });
  }

  removeItem(index: number) {
    this.getitemsForms().removeAt(index);
    this.calculateTotals();
  }

  // calculateTotals() {
  //   let subtotal = 0;
  //   this.getitemsForms().controls.forEach((item) => {
  //     const price = item.get('price')?.value || 0;
  //     const quantity = item.get('quantity')?.value || 0;
  //     const total = price * quantity;
  //     item.get('total')?.setValue(total, { emitEvent: false });
  //     subtotal += total;
  //   });

  //   this.invoiceForm.get('invoice.subtotal')?.setValue(subtotal);
  //   const tax = this.invoiceForm.get('invoice.tax')?.value || 0;
  //   const total = subtotal + (subtotal * tax) / 100;
  //   this.invoiceForm.get('invoice.total')?.setValue(total);
  // }

  calculateTotals() {
    let subtotal = 0;

    this.getitemsForms().controls.forEach((item) => {
      const price = +item.get('price')?.value || 0;
      const quantity = +item.get('quantity')?.value || 0;
      const total = price * quantity;

      item.get('total')?.setValue(total, { emitEvent: false });
      subtotal += total;
    });

    this.invoiceForm.get('invoice.subtotal')?.setValue(subtotal);

    const taxRate = +this.invoiceForm.get('invoice.tax_rate')?.value || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    this.invoiceForm.get('invoice.total')?.setValue(total);
  }

  onSubmit() {
    this.submited = true;
    this.itemsValidation = this.getitemsForms().controls.map(() => true);

    if (this.invoiceForm.invalid) return;

    const invoiceData = {
      ...this.invoiceForm.get('invoice')?.value,
      items: this.invoiceForm.get('items')?.value,
    };

    const request$ = this.editId
      ? this.invoiceService.updateInvoice(this.editId, invoiceData)
      : this.invoiceService.createInvoice(invoiceData);

    request$.subscribe({
      next: (res) => {
        this.toastr.success(
          `Data ${this.editId ? 'updated' : 'created'}  successfully!`,
          'Success'
        );
        this.route.navigate(['/invoices']);
      },
      error: (err) => {
        this.toastr.error('Something went wrong!', 'Error');
        console.error('Save failed:', err);
      },
    });
  }
}
