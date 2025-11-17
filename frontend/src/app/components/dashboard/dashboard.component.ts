import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  invoicesData: any = [];
  totalInvoice: any;
  pendingPeyments: any;

  columns = [
    { key: 'invoice_number', label: 'Invoice Number' },
    { key: 'bill_from_name', label: 'Bill From' },
    { key: 'bill_to_name', label: 'Bill To' },
    { key: 'payment_status', label: 'Payment Status' },
    { key: 'formattedTotal', label: 'Total' },
  ];
  paidPeyments: any;
  overduePeyments: any;
  userId: any;

  constructor(
    private invoiceService: InvoiceService,
    private currencyPipe: CurrencyPipe,
    private rout: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.getProfile().subscribe((res) => {
      this.userId = res.user.id;
      this.getInvoices();
    });
  }

  getInvoices() {
    this.invoiceService.getInvoices(this.userId).subscribe((data) => {
      if (data) {
        this.invoicesData = data
          .map((item) => ({
            ...item,
            formattedTotal: this.currencyPipe.transform(item.total, 'INR', 'symbol', '1.2-2'),
          }))
          .slice(0, 5);
        this.getCountAllDatas(data);
        this.drawChart(data);
      }
    });
  }
  viewPage(item: any) {
    this.rout.navigate(['/invoices/view'], {
      queryParams: { id: item.invoice_id },
    });
  }

  getCountAllDatas(data: any[]) {
    this.totalInvoice = data.length;

    const groupByStatus = (status: string) =>
      data
        .filter((item) => item.payment_status === status)
        .reduce((sum, item) => sum + parseFloat(item.total), 0)
        .toFixed(2);

    this.pendingPeyments = groupByStatus('Pending');
    this.paidPeyments = groupByStatus('Paid');
    this.overduePeyments = groupByStatus('Overdue');
  }

  drawChart(invoiceData: any[]) {
    const canvas = document.getElementById('invoiceChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const monthTotals: Record<string, number> = {};

    invoiceData.forEach((item) => {
      const date = new Date(item.invoice_date);
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      const total = parseFloat(item.total) || 0;
      monthTotals[monthName] = (monthTotals[monthName] || 0) + total;
    });

    const allMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const months = allMonths.filter((m) => monthTotals[m]);
    const values = months.map((m) => parseFloat(monthTotals[m].toFixed(2)));

    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    const barWidth = chartWidth / values.length - 20;
    const maxVal = Math.max(...values);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px Arial';
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#1976d2';

    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, canvas.height - 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 20);
    ctx.lineTo(canvas.width - 10, canvas.height - 20);
    ctx.stroke();

    values.forEach((val, i) => {
      const barHeight = (val / maxVal) * chartHeight * 0.8;
      const x = 40 + i * (barWidth + 20);
      const y = canvas.height - 20 - barHeight;

      ctx.fillStyle = '#1976d2';
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = '#000';
      ctx.fillText('₹' + val.toFixed(0), x, y - 5);

      ctx.fillText(months[i], x, canvas.height - 5);
    });
  }
}
