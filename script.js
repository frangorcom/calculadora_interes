let datosTabla = [];
let chart;

// Formato moneda MXN
const formato = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
});

function validarInputs(monto, tasa, meses, iva) {
    if (
        isNaN(monto) || isNaN(tasa) || isNaN(meses) || isNaN(iva) ||
        monto <= 0 || tasa < 0 || meses <= 0 || iva < 0
    ) {
        alert("Valores inválidos");
        return false;
    }
    return true;
}

function calcular() {
    const monto = parseFloat(document.getElementById("monto").value);
    const tasa = parseFloat(document.getElementById("tasa").value);
    const meses = parseInt(document.getElementById("meses").value);
    const iva = parseFloat(document.getElementById("iva").value);

    if (!validarInputs(monto, tasa, meses, iva)) return;

    const r = tasa / 100 / 12;
    const ivaRate = iva / 100;

    const pagoBase = r === 0
        ? monto / meses
        : (r * monto) / (1 - Math.pow(1 + r, -meses));

    let saldo = monto;
    let totalInteres = 0;
    let totalPago = 0;

    datosTabla = [];
    document.querySelectorAll(".result-box").forEach(el => {
        el.classList.remove("fade-in");
        void el.offsetWidth; // reflow para reiniciar animación
        el.classList.add("fade-in");
    });
    const tbody = document.querySelector("#tabla tbody"); // <-- FALTA ESTO
    tbody.innerHTML = "";
    let saldos = [];

    for (let i = 1; i <= meses; i++) {
        const interes = saldo * r;
        const ivaInteres = interes * ivaRate;
        const capital = pagoBase - interes;
        const pagoTotal = pagoBase + ivaInteres;

        saldo -= capital;

        totalInteres += interes;
        totalPago += pagoTotal;

        datosTabla.push([i, interes, ivaInteres, capital, pagoTotal, saldo]);

        saldos.push(saldo > 0 ? saldo : 0);

        tbody.innerHTML += `
        <tr class="scale-in">
            <td>${i}</td>
            <td>${formato.format(interes)}</td>
            <td>${formato.format(ivaInteres)}</td>
            <td>${formato.format(capital)}</td>
            <td>${formato.format(pagoTotal)}</td>
            <td>${formato.format(saldo > 0 ? saldo : 0)}</td>
        </tr>`;
    }

    document.getElementById("pagoBase").textContent = formato.format(pagoBase);
    document.getElementById("pagoTotal").textContent =
        formato.format(pagoBase + (monto * r * ivaRate));
    document.getElementById("totalInteres").textContent = formato.format(totalInteres);
    document.getElementById("totalPago").textContent = formato.format(totalPago);

    generarGrafica(saldos);
}

function descargarCSV() {
    let csv = "Mes,Interes,IVA,Capital,Pago,Saldo\n";

    datosTabla.forEach(fila => {
        csv += fila.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "amortizacion.csv";
    a.click();
}
function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Tabla de Amortización", 14, 15);

    doc.setFontSize(10);
    doc.text(`Pago base: ${document.getElementById("pagoBase").textContent}`, 14, 25);
    doc.text(`Total interés: ${document.getElementById("totalInteres").textContent}`, 14, 30);
    doc.text(`Total pagado: ${document.getElementById("totalPago").textContent}`, 14, 35);

    // Tabla
    doc.autoTable({
        startY: 40,
        head: [["Mes", "Interés", "IVA", "Capital", "Pago", "Saldo"]],
        body: datosTabla.map(f => [
            f[0],
            f[1].toFixed(2),
            f[2].toFixed(2),
            f[3].toFixed(2),
            f[4].toFixed(2),
            f[5].toFixed(2)
        ]),
        styles: {
            fontSize: 8
        }
    });

    doc.save("amortizacion.pdf");
}
function generarGrafica(saldos) {
    const ctx = document.getElementById("grafica").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: saldos.map((_, i) => i + 1),
            datasets: [{
                label: 'Saldo restante',
                data: saldos
            }]
        },
        options: {
            responsive: true
        }
    });
}