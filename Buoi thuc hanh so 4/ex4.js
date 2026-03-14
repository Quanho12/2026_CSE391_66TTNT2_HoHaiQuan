
const form = document.getElementById('orderForm');


const productPrices = {
    "T-shirt": 150000, 
    "Jeans": 300000,    
    "Jacket": 450000,   
    "Dress": 250000,    
    "Sneaker": 500000   
};


function showError(errorId, message) {
    const errorDiv = document.getElementById(errorId);
    if(errorDiv) {
        errorDiv.innerText = message;
        errorDiv.style.color = 'red';
    }
}

function clearError(errorId) {
    const errorDiv = document.getElementById(errorId);
    if(errorDiv) errorDiv.innerText = '';
}


const quantityInput = document.getElementById('quantity');
const productInput = document.getElementById('product');
const priceDisplay = document.createElement('div');
priceDisplay.style.color = 'blue';
priceDisplay.style.fontWeight = 'bold';
priceDisplay.style.marginTop = '5px';
priceDisplay.innerText = 'Tổng tiền: 0 VNĐ';
quantityInput.parentNode.insertBefore(priceDisplay, quantityInput.nextSibling);


const notesInput = document.getElementById('notes');
const charCounter = document.createElement('div');
charCounter.id = 'charCounter';
charCounter.style.fontSize = '13px';
charCounter.style.color = 'gray';
charCounter.innerText = '0/200 ký tự';
notesInput.parentNode.insertBefore(charCounter, notesInput.nextSibling);

function validateProduct() {
    const errorId = 'productError';
    if (productInput.value === '') {
        showError(errorId, 'Vui lòng chọn một sản phẩm.');
        return false;
    }
    clearError(errorId);
    return true;
}

function validateQuantity() {
    const errorId = 'quantityError';
    const qty = parseInt(quantityInput.value); 
    
    if (quantityInput.value === '' || isNaN(qty) || qty < 1 || qty > 99) {
        showError(errorId, 'Số lượng phải là số nguyên từ 1 đến 99.');
        return false;
    }
    clearError(errorId);
    return true;
}

function validateDate() {
    const errorId = 'dateError';
    const dateValue = document.getElementById('deliveryDate').value;
    
    if (dateValue === '') {
        showError(errorId, 'Vui lòng chọn ngày giao hàng.');
        return false;
    }

    const selectedDate = new Date(dateValue);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    if (selectedDate < today) {
        showError(errorId, 'Ngày giao hàng không được ở trong quá khứ.');
        return false;
    } else if (selectedDate > maxDate) {
        showError(errorId, 'Chỉ hỗ trợ giao hàng trong vòng 30 ngày tới.');
        return false;
    }
    
    clearError(errorId);
    return true;
}

function validateAddress() {
    const errorId = 'addressError';
    const address = document.getElementById('address').value.trim();
    
    if (address === '') {
        showError(errorId, 'Vui lòng nhập địa chỉ giao hàng.');
        return false;
    } else if (address.length < 10) {
        showError(errorId, 'Địa chỉ phải có tối thiểu 10 ký tự để shipper dễ tìm.');
        return false;
    }
    clearError(errorId);
    return true;
}

function validatePayment() {
    const errorId = 'paymentError';
    const isChecked = document.querySelector('input[name="payment"]:checked');
    if (!isChecked) {
        showError(errorId, 'Vui lòng chọn phương thức thanh toán.');
        return false;
    }
    clearError(errorId);
    return true;
}


const fields = [
    { id: 'product', validator: validateProduct },
    { id: 'quantity', validator: validateQuantity },
    { id: 'deliveryDate', validator: validateDate },
    { id: 'address', validator: validateAddress }
];

fields.forEach(field => {
    const element = document.getElementById(field.id);
    element.addEventListener('blur', field.validator);
    element.addEventListener('input', () => clearError(field.id + 'Error'));
});

const paymentRadios = document.querySelectorAll('input[name="payment"]');
paymentRadios.forEach(radio => radio.addEventListener('change', validatePayment));



notesInput.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCounter.innerText = `${currentLength}/200 ký tự`;
    
    if (currentLength >= 200) {
        charCounter.style.color = 'red';
        showError('notesError', 'Bạn đã nhập tới giới hạn 200 ký tự.');
    } else {
        charCounter.style.color = 'gray';
        clearError('notesError');
    }
});


function calculateTotal() {
    const selectedProduct = productInput.value;
    const qty = parseInt(quantityInput.value);
    
    if (selectedProduct !== '' && !isNaN(qty) && qty > 0 && qty < 100) {
        const price = productPrices[selectedProduct];
        const total = price * qty;
        priceDisplay.innerText = `Tổng tiền: ${total.toLocaleString('vi-VN')} VNĐ`;
        return total;
    } else {
        priceDisplay.innerText = 'Tổng tiền: 0 VNĐ';
        return 0;
    }
}

productInput.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);



form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const isValid = validateProduct() 
                  & validateQuantity() 
                  & validateDate() 
                  & validateAddress() 
                  & validatePayment();
                  
    if (Boolean(isValid)) {
        const productName = productInput.options[productInput.selectedIndex].text;
        const qty = quantityInput.value;
        const totalAmount = calculateTotal().toLocaleString('vi-VN');
        
        const rawDate = document.getElementById('deliveryDate').value;
        const dateParts = rawDate.split('-');
        const prettyDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        form.style.display = 'none';

        const confirmBox = document.createElement('div');
        confirmBox.id = 'confirmBox';
        confirmBox.style.border = '2px dashed #4CAF50';
        confirmBox.style.padding = '20px';
        confirmBox.style.marginTop = '20px';
        confirmBox.innerHTML = `
            <h3>📝 Xác nhận thông tin đơn hàng:</h3>
            <ul>
                <li><strong>Sản phẩm:</strong> ${productName}</li>
                <li><strong>Số lượng:</strong> ${qty}</li>
                <li><strong>Tổng thanh toán:</strong> <span style="color:red; font-weight:bold;">${totalAmount} VNĐ</span></li>
                <li><strong>Ngày giao dự kiến:</strong> ${prettyDate}</li>
            </ul>
            <hr>
            <p>Bạn có chắc chắn muốn đặt hàng không?</p>
            <button type ='button' id="btnConfirm" style="background-color: green; color: white; padding: 10px 20px; border: none; cursor: pointer; margin-right: 10px;">✅ Xác nhận</button>
            <button type = 'button' id="btnCancel" style="background-color: red; color: white; padding: 10px 20px; border: none; cursor: pointer;">❌ Hủy bỏ</button>
        `;
        document.body.appendChild(confirmBox);

        document.getElementById('btnConfirm').addEventListener('click', function() {
            confirmBox.innerHTML = `
                <h2 style="color: green; text-align: center;">Đặt hàng thành công! 🎉</h2>
                <p style="text-align: center;">Cảm ơn bạn đã mua sắm. Đơn hàng sẽ được giao vào ngày <strong>${prettyDate}</strong>.</p>
            `;
        });

        document.getElementById('btnCancel').addEventListener('click', function() {
            confirmBox.remove();
            form.style.display = 'block';
        });
    }
});