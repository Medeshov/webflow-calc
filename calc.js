var Webflow = Webflow || [];

Webflow.push(function () {
  let priceTable = {};
  let inputTimeout;

  // Собственная реализация debounce
  function debounce(func, wait) {
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(inputTimeout);
        func(...args);
      };
      clearTimeout(inputTimeout);
      inputTimeout = setTimeout(later, wait);
    };
  }

  function loadPricesFromCollection() {
    document.querySelectorAll('.cms-item').forEach((item) => {
      const city = item.getAttribute('data-city');
      const type = item.getAttribute('data-type');
      const prices = JSON.parse(item.getAttribute('data-prices'));

      const key = `${city}-${type}`;
      priceTable[key] = prices;
    });

    console.log('Данные загружены из CMS коллекции:', priceTable);
  }

  function updateDeliveryResult(data) {
    const { from, to, type, weight, length, width, height, sizeType } = data;
    const volumeWeight = (length * width * height) / 6000; // Расчет объемного веса
    const effectiveWeight = Math.max(weight, volumeWeight); // Сравнение весов

    console.log('Текущие значения:', from, to, type, sizeType, weight, length, width, height, volumeWeight, effectiveWeight);

    let weightIndex;
    if (effectiveWeight <= 0.5) {
      weightIndex = 0;
    } else if (effectiveWeight <= 1) {
      weightIndex = 1;
    } else if (effectiveWeight <= 2) {
      weightIndex = 2;
    } else if (effectiveWeight <= 3) {
      weightIndex = 3;
    } else if (effectiveWeight <= 4) {
      weightIndex = 4;
    } else if (effectiveWeight <= 5) {
      weightIndex = 5;
    } else if (effectiveWeight <= 6) {
      weightIndex = 6;
    } else if (effectiveWeight <= 7) {
      weightIndex = 7;
    } else if (effectiveWeight <= 8) {
      weightIndex = 8;
    } else if (effectiveWeight <= 9) {
      weightIndex = 9;
    } else if (effectiveWeight <= 10) {
      weightIndex = 10;
    } else if (effectiveWeight <= 15) {
      weightIndex = 11;
    } else if (effectiveWeight <= 20) {
      weightIndex = 12;
    } else if (effectiveWeight <= 25) {
      weightIndex = 13;
    } else if (effectiveWeight <= 30) {
      weightIndex = 14;
    } else if (effectiveWeight <= 40) {
      weightIndex = 15;
    } else if (effectiveWeight <= 50) {
      weightIndex = 16;
    } else if (effectiveWeight <= 60) {
      weightIndex = 17;
    } else if (effectiveWeight <= 70) {
      weightIndex = 18;
    } else if (effectiveWeight <= 80) {
      weightIndex = 19;
    } else if (effectiveWeight <= 90) {
      weightIndex = 20;
    } else if (effectiveWeight <= 100) {
      weightIndex = 21;
    } else if (effectiveWeight <= 150) {
      weightIndex = 22;
    } else if (effectiveWeight <= 200) {
      weightIndex = 23;
    } else if (effectiveWeight <= 300) {
      weightIndex = 24;
    } else if (effectiveWeight <= 400) {
      weightIndex = 25;
    } else if (effectiveWeight <= 500) {
      weightIndex = 26;
    } else {
      $('[result="delivery-sum"]').text('Требуется индивидуальный расчет');
      return;
    }

    const key = `${to}-${type}`;
    const basePrice = priceTable[key] ? priceTable[key][weightIndex] : null;

    if (basePrice !== null) {
      const finalPrice = basePrice;
      $('[result="delivery-sum"]').text(finalPrice.toFixed(2) + ' сум');
    } else {
      $('[result="delivery-sum"]').text('Заполните все поля');
    }
  }

 function getDeliveryData() {
const sizeType = $('input[name="Sizes"]:checked').attr('tab') || 'approx';

// Extract "from" and "to" values
const from = $('[select="calc-delivery-from"] .calc-dropdown-toggle-value').attr('val') || 'tashkent';
const to = $('[select="calc-delivery-to"] .calc-dropdown-toggle-value').attr('val');

if (!to) {
  console.warn("Destination ('to') is not selected or has no value.");
}

if (sizeType === 'approx') {
  // Extract values for "approx"
  const $selectedPackage = $('input[name="PackageSize"]:checked').closest('.radio-button-flex-left');
  const height = parseFloat($selectedPackage.find('[val="height"]').text()) || 0;
  const width = parseFloat($selectedPackage.find('[val="width"]').text()) || 0;
  const length = parseFloat($selectedPackage.find('[val="length"]').text()) || 0;
  const weight = parseFloat($selectedPackage.find('[val="weight"]').text()) || 0;

  return {
    from,
    to,
    type: $('input[name="Radio-1"]:checked').attr('val') || 'pvz',
    sizeType,
    weight,
    length,
    width,
    height,
  };
} else {
  // Extract values for "accurate"
  return {
    from,
    to,
    type: $('input[name="Radio-1"]:checked').attr('val') || 'pvz',
    sizeType,
    weight: parseFloat($('[field="delivery-weight"]').val()) || 0,
    length: parseFloat($('[field="delivery-length"]').val()) || 0,
    width: parseFloat($('[field="delivery-width"]').val()) || 0,
    height: parseFloat($('[field="delivery-height"]').val()) || 0,
  };
}
}

  $(document).ready(function () {
    loadPricesFromCollection();
    updateDeliveryResult(getDeliveryData());
  });

  // Используем debounce для обработчиков событий
  const debouncedUpdate = debounce(() => {
    updateDeliveryResult(getDeliveryData());
  }, 300);

  $('[select="calc-delivery-from"] .calc-dropdown-option, [select="calc-delivery-to"] .calc-dropdown-option').on('click', debouncedUpdate);

  $('input[name="Radio-1"], input[name="Sizes"], input[name="PackageSize"]').on('change', debouncedUpdate);

  $('[field="delivery-weight"], [field="delivery-length"], [field="delivery-width"], [field="delivery-height"]').on('input', debouncedUpdate);
});