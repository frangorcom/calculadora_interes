<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Calculadora de Préstamo</title>

<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="animate.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>
<body>
    <div class="container">

        <div class="card">
            <h2>Calculadora de Préstamo</h2>

            <div class="form-grid">
                <input id="monto" placeholder="Monto">
                <input id="tasa" placeholder="Tasa anual (%)">
                <input id="meses" placeholder="Meses">
                <input id="iva" placeholder="IVA (%)">
            </div>

            <div class="btn-group">
                <button class="btn-primary" onclick="calcular()">Calcular</button>
                <button class="btn-secondary" onclick="descargarCSV()">CSV</button>
                <button class="btn-secondary" onclick="descargarPDF()">PDF</button>
            </div>
        </div>

        <div class="card">
            <h3>Resultados</h3>

            <div class="result-grid">
                <div class="result-box">
                    <span>Pago base</span>
                    <strong id="pagoBase"></strong>
                </div>

                <div class="result-box">
                    <span>Pago mensual</span>
                    <strong id="pagoTotal"></strong>
                </div>

                <div class="result-box">
                    <span>Total interés</span>
                    <strong id="totalInteres"></strong>
                </div>

                <div class="result-box">
                    <span>Total pagado</span>
                    <strong id="totalPago"></strong>
                </div>
            </div>
        </div>

        <div class="card">
            <canvas id="grafica"></canvas>
        </div>

        <div class="card">
            <table id="tabla">
                <thead>
                    <tr>
                        <th>Mes</th><th>Interés</th><th>IVA</th>
                        <th>Capital</th><th>Pago</th><th>Saldo</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
    <script src="script.js"></script>
</body>
</html>