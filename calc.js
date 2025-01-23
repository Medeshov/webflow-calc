// Основная функция калькулятора
function calculator() {
    // Получаем элементы формы
    const form = document.querySelector('form');
    const result = document.querySelector('#result');
    
    // Добавляем обработчик события submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем значения из полей ввода
        const num1 = parseFloat(document.querySelector('#number1').value);
        const num2 = parseFloat(document.querySelector('#number2').value);
        const operation = document.querySelector('#operation').value;
        
        // Выполняем вычисление
        let calculationResult;
        switch(operation) {
            case 'add':
                calculationResult = num1 + num2;
                break;
            case 'subtract':
                calculationResult = num1 - num2;
                break;
            case 'multiply':
                calculationResult = num1 * num2;
                break;
            case 'divide':
                calculationResult = num2 !== 0 ? num1 / num2 : 'Ошибка: деление на ноль';
                break;
            default:
                calculationResult = 'Выберите операцию';
        }
        
        // Выводим результат
        result.textContent = calculationResult;
    });
}

// Запускаем калькулятор при загрузке страницы
document.addEventListener('DOMContentLoaded', calculator);
