import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
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
  customerDataFrom: any[] = [];
  customerDataTo: any[] = [];
  paymentMethods: any[] = [];
  termsOptions: any[] = [];

  editId!: number;
  userId!: number;
  submited = false;

  paymentStatus = [
    { id: 1, value: 'Pending' },
    { id: 2, value: 'Overdue' },
    { id: 3, value: 'Paid' },
  ];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private termService: TermsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formInit();

    this.authService.getProfile().subscribe((res) => {
      this.userId = res.user.id;
      this.loadDropdownData();
      this.checkEditMode();
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
        payment_status: ['', Validators.required],
      }),

      items: this.fb.array([this.itemForm()]),
    });
  }

  itemForm(): FormGroup {
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

  loadDropdownData() {
    this.customerService.getCustomers(this.userId).subscribe((res) => {
      this.customerDataFrom = res.filter((x) => x.type === 'BILL_FROM');
      this.customerDataTo = res.filter((x) => x.type === 'BILL_TO');
    });

    this.paymentService.getPayments(this.userId).subscribe((res) => {
      this.paymentMethods = res;
    });

    this.termService.getTerms(this.userId).subscribe((res) => {
      this.termsOptions = res;
    });
  }

  checkEditMode() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.editId = params['id'];
        this.loadInvoiceForEdit();
      }
    });
  }

  loadInvoiceForEdit() {
    this.invoiceService.getInvoiceItems(this.editId, this.userId).subscribe((res) => {
      this.invoiceForm.get('invoice')?.patchValue({
        bill_from_id: res.bill_from_id,
        bill_to_id: res.bill_to_id,
        invoice_date: res.invoice_date?.split('T')[0],
        due_date: res.due_date?.split('T')[0],
        subtotal: res.subtotal,
        tax_rate: res.tax_rate,
        total: res.total,
        payment_id: res.payment_id,
        term_id: res.term_id,
        payment_status: res.payment_status,
      });

      const items = this.getitemsForms();
      items.clear();

      res.invoice_items.forEach((itm: any) => {
        items.push(
          this.fb.group({
            description: itm.description,
            price: itm.price,
            quantity: itm.quantity,
            total: itm.item_total,
          })
        );
      });
    });
  }

  addItem() {
    this.getitemsForms().push(this.itemForm());
  }

  removeItem(index: number) {
    this.getitemsForms().removeAt(index);
    this.calculateTotals();
  }

  calculateTotals() {
    let subtotal = 0;

    this.getitemsForms().controls.forEach((item) => {
      const price = +item.get('price')?.value || 0;
      const qty = +item.get('quantity')?.value || 0;
      const total = price * qty;

      item.get('total')?.setValue(total, { emitEvent: false });
      subtotal += total;
    });

    this.invoiceForm.get('invoice.subtotal')?.setValue(subtotal);

    const taxRate = +this.invoiceForm.get('invoice.tax_rate')?.value || 0;
    const total = subtotal + (subtotal * taxRate) / 100;

    this.invoiceForm.get('invoice.total')?.setValue(total);
  }

  onSubmit() {
    this.submited = true;

    if (this.invoiceForm.invalid) return;

    const data = {
      ...this.invoiceForm.get('invoice')?.value,
      items: this.invoiceForm.get('items')?.value,
    };

    if (this.editId) {
      this.invoiceService.updateInvoice(this.editId, data, this.userId).subscribe(() => {
        this.toastr.success('Invoice updated successfully!');
        this.router.navigate(['/invoices']);
      });
    } else {
      this.invoiceService.createInvoice(data, this.userId).subscribe(() => {
        this.toastr.success('Invoice created successfully!');
        this.router.navigate(['/invoices']);
      });
    }
  }
}
