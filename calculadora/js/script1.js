/**
 * @fileoverview Lógica para calcular la Solvencia Financiera Personal.
 */

// Referencias al DOM
const resultContainer = document.getElementById('resultContainer');
const resultValue = document.getElementById('resultValue');
const resultAnalysis = document.getElementById('resultAnalysis');
const debtProgressBar = document.getElementById('debtProgressBar');

function calculatePersonalSolvency() {
    // 1. Obtener valores (parseamos a Float para decimales)
    const income = parseFloat(document.getElementById('monthlyIncome').value) || 0;
    const livingExpenses = parseFloat(document.getElementById('livingExpenses').value) || 0;
    const debtPayments = parseFloat(document.getElementById('debtPayments').value) || 0;

    // 2. Validaciones básicas
    // Usamos el console.error en lugar de alert() para un mejor manejo en entornos web.
    if (income <= 0) {
        console.error("El ingreso mensual debe ser un valor positivo.");
        // Opcional: Podrías añadir un mensaje de error visual en el HTML aquí.
        return;
    }

    // 3. Cálculos Financieros
    const totalExpenses = livingExpenses + debtPayments;
    const cashFlow = income - totalExpenses; // Lo que sobra (o falta)
    
    // Ratio de Endeudamiento: (Deuda / Ingreso) * 100
    // Indica qué porcentaje de tu ingreso se va solo en pagar deudas.
    const debtRatio = (debtPayments / income) * 100;

    // 4. Mostrar Resultados
    resultContainer.classList.remove('d-none');
    
    // Formatear moneda (Asegúrate de que la configuración regional sea correcta)
    const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
    
    // Actualizar barra de progreso de deuda
    debtProgressBar.style.width = `${Math.min(debtRatio, 100)}%`;
    debtProgressBar.textContent = `${debtRatio.toFixed(1)}%`;
    
    // Limpiar clases previas
    resultValue.className = 'display-4 fw-bold my-2';
    debtProgressBar.className = 'progress-bar progress-bar-striped progress-bar-animated';

    // 5. Lógica del Semáforo Financiero
    if (cashFlow < 0) {
        // --- ESCENARIO ROJO: INSOLVENCIA ---
        resultValue.textContent = formatter.format(cashFlow);
        resultValue.classList.add('text-danger');
        resultAnalysis.innerHTML = `
            <strong>DÉFICIT MENSUAL</strong><br>
            Cuidado. Estás gastando más de lo que ganas. 
            Tus gastos superan tus ingresos en <strong>${formatter.format(Math.abs(cashFlow))}</strong>. 
            Es urgente reducir gastos o consolidar deudas.
        `;
        debtProgressBar.classList.add('bg-danger');
        
    } else if (debtRatio > 40) {
        // --- ESCENARIO AMARILLO: RIESGO DE ENDEUDAMIENTO ---
        resultValue.textContent = formatter.format(cashFlow);
        resultValue.classList.add('text-warning');
        resultAnalysis.innerHTML = `
            <strong>SOBREENDEUDAMIENTO</strong><br>
            Tienes flujo positivo, PERO tus deudas consumen el <strong>${debtRatio.toFixed(1)}%</strong> de tu ingreso.
            Lo recomendable es que las deudas no superen el 30-35%. 
            Cualquier imprevisto podría ponerte en aprietos.
        `;
        debtProgressBar.classList.add('bg-warning');
        debtProgressBar.classList.add('text-dark'); // Texto oscuro para contraste
        
    } else {
        // --- ESCENARIO VERDE: SOLVENCIA SALUDABLE ---
        resultValue.textContent = formatter.format(cashFlow);
        resultValue.classList.add('text-excellent'); // Clase definida en CSS
        resultAnalysis.innerHTML = `
            <strong>SALUD FINANCIERA ÓPTIMA</strong><br>
            ¡Felicidades! Tienes un excedente de <strong>${formatter.format(cashFlow)}</strong> para ahorrar o invertir.
            Tu nivel de deuda es manejable (${debtRatio.toFixed(1)}%).
            ¡Sigue así!
        `;
        debtProgressBar.classList.add('bg-success');
    }
}