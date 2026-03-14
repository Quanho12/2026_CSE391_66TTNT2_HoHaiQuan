const form = document.getElementById('registerForm');

function showError (errorId, message){
    const errorSpan = document.getElementById(errorId);
    if(errorSpan) {
        errorSpan.innerText = message;
        errorSpan.style.color = 'red';
    }
}

function clearError(errorId){
    const errorSpan = document.getElementById(errorId);
    if(errorSpan) {
        errorSpan.innerText ='';
    }
}

function validateFullName(){
    const name = document.getElementById('fullname').value.trim();
    const errorId = 'nameError'; // Đã sửa thành chuỗi
    const regex = /^[\p{L}\s]{3,}$/u;

    if(name === ''){
        showError(errorId, 'Vui lòng nhập họ và tên.');
        return false;
    }
    else if(!regex.test(name)){
        showError(errorId, "Tên phải >= 3 ký tự, chỉ chứa chữ cái và khoảng trắng");
        return false;
    }
    clearError(errorId);
    return true; // Đã sửa T viết thường
}

function validateEmail(){
    const email = document.getElementById('email').value.trim();
    const errorId = 'emailError'; // Đã sửa
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(email === ''){
        showError(errorId, 'Vui lòng nhập email.');
        return false;
    }
    else if(!regex.test(email)){
        showError(errorId, 'Email không hợp lệ (VD: name@domain.com).');
        return false;
    }
    clearError(errorId);
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone').value.trim(); // Đã thêm .value.trim()
    const errorId = 'phoneError'; // Đã sửa
    const regax = /^0\d{9}$/;
    
    if(phone === ''){
        showError(errorId, "Vui lòng nhập SDT");
        return false;
    }
    else if(!regax.test(phone)){
        showError(errorId,'Số điện thoại không hợp lệ');
        return false;
    }
    clearError(errorId);
    return true;
}

function validatePassword(){
    const pass = document.getElementById('password').value.trim(); // Đã thêm .value.trim()
    const errorId = 'passwordError'; // Đã sửa
    const regax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Đã thêm dấu phẩy
    
    if(pass === ''){
        showError(errorId,"Vui lòng nhập Mật khẩu");
        return false;
    }
    if(!regax.test(pass)){
        showError(errorId,"Vui lòng nhập đúng theo yêu cầu");
        return false;
    }
    clearError(errorId);
    
    if (document.getElementById('confirmPassword').value !== '') {
        validateConfirmPassword();
    }
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorId = 'confirmPasswordError';
    
    if (confirmPassword === '') {
        showError(errorId, 'Vui lòng xác nhận mật khẩu.');
        return false;
    } else if (confirmPassword !== password) {
        showError(errorId, 'Mật khẩu xác nhận không khớp.');
        return false;
    }
    clearError(errorId);
    return true;
}

function validateGender() {
    const errorId = 'genderError';
    const isChecked = document.querySelector('input[name="gender"]:checked');
    if (!isChecked) {
        showError(errorId, 'Vui lòng chọn giới tính.');
        return false;
    }
    clearError(errorId);
    return true;
}

function validateTerms() {
    const errorId = 'termsError';
    const isChecked = document.getElementById('terms').checked;
    if (!isChecked) {
        showError(errorId, 'Bạn phải đồng ý với các điều khoản.');
        return false;
    }
    clearError(errorId);
    return true;
}

const fields = [
    { inputId: 'fullname', errorId:'nameError', validator: validateFullName}, // Đã sửa chữ D hoa thành d thường
    { inputId: 'email', errorId: 'emailError', validator: validateEmail },
    { inputId: 'phone', errorId: 'phoneError', validator: validatePhone },
    { inputId: 'password', errorId: 'passwordError', validator: validatePassword },
    { inputId: 'confirmPassword', errorId: 'confirmPasswordError', validator: validateConfirmPassword }
];

fields.forEach(field => {
    const inputElement = document.getElementById(field.inputId);
    inputElement.addEventListener('blur', field.validator);
    inputElement.addEventListener('input', () => clearError(field.errorId));
});

const genderRadios = document.querySelectorAll('input[name="gender"]');
genderRadios.forEach(radio => radio.addEventListener('change', validateGender));

document.getElementById('terms').addEventListener('change', () => {
    clearError('termsError');
    validateTerms();
});

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
   
    const isValid = validateFullName() 
                  & validateEmail() 
                  & validatePhone() 
                  & validatePassword() 
                  & validateConfirmPassword() 
                  & validateGender() 
                  & validateTerms();
                  
    if (Boolean(isValid)) {
        const userName = document.getElementById('fullname').value.trim();
        form.style.display = 'none';
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <h2 style="color: green;">Đăng ký thành công! 🎉</h2>
            <p>Chào mừng bạn, <strong>${userName}</strong>!</p>
        `;
        document.body.insertBefore(successMessage, form);
    }
});