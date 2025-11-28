/**
 * Lógica para la Regla 50/30/20
 */

function calculateBudget() {
    // 1. Obtener el Ingreso
    const incomeInput = document.getElementById('netIncome');
    const income = parseFloat(incomeInput.value);
    
    // Referencia a la sección de resultados
    const resultsSection = document.getElementById('resultsSection');

    // 2. Validación
    if (isNaN(income) || income <= 0) {
        alert("Por favor, ingresa un ingreso mensual válido mayor a 0.");
        return;
    }

    // 3. Cálculos de la Regla
    const needs = income * 0.50;   // 50%
    const wants = income * 0.30;   // 30%
    const savings = income * 0.20; // 20%

    // 4. Formateador de Moneda (Pesos)
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0
    });

    // 5. Inyectar valores en el HTML
    // Usamos una pequeña animación numérica para que se vea elegante
    animateValue("valNeeds", 0, needs, 1000, formatter);
    animateValue("valWants", 0, wants, 1000, formatter);
    animateValue("valSavings", 0, savings, 1000, formatter);

    // 6. Mostrar la sección de resultados con animación
    resultsSection.classList.remove('d-none');
    
    // Desplazar la vista hacia los resultados suavemente
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Función auxiliar para animar el conteo de números
 * (Hace que los números suban rápidamente hasta el valor final)
 */
function animateValue(id, start, end, duration, formatter) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = formatter.format(value);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}