import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    this.drawChart();
  }

  drawChart() {
    // Type assertion to HTMLCanvasElement
    const canvas = document.getElementById("invoiceChart") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sample data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const values = [5000, 12000, 8000, 15000, 10000, 18000];

    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    const barWidth = chartWidth / values.length - 20;
    const maxVal = Math.max(...values);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1976d2";
    ctx.font = "12px Arial";

    // Draw Y axis
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, canvas.height - 20);
    ctx.stroke();

    // Draw X axis
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 20);
    ctx.lineTo(canvas.width - 10, canvas.height - 20);
    ctx.stroke();

    // Draw bars
    values.forEach((val, i) => {
      const barHeight = (val / maxVal) * chartHeight * 0.8;
      const x = 40 + i * (barWidth + 20);
      const y = canvas.height - 20 - barHeight;

      // Bar
      ctx.fillStyle = "#1976d2";
      ctx.fillRect(x, y, barWidth, barHeight);

      // Value label
      ctx.fillStyle = "#000";
      ctx.fillText("₹" + val, x, y - 5);

      // Month label
      ctx.fillText(months[i], x, canvas.height - 5);
    });
  }
}
