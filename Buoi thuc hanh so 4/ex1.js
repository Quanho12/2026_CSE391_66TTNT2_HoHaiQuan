
let currentSTT = 1; 
    const nameInput = document.getElementById('studentName');
    const scoreInput = document.getElementById('studentScore');
    const tbody = document.getElementById('studentTableBody');
    const btnAdd = document.querySelector('button');
btnAdd.addEventListener('click', function(){
    const nameInputValue = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);
if(nameInputValue === ''){
        alert('Vui lòng nhập tên sinh viên');
        return;
    }
    if(isNaN(score) || score < 0 || score > 10){
        alert('Vui lòng nhập điểm hợp lệ (0-10)');
        return;
    }
const tr = document.createElement('tr');
let rank = '';
if(score >= 8.5){
    rank = 'Giỏi';
}else if(score >= 7){
    rank = 'Khá';
}else if(score >= 5){
    rank = 'Trung bình';
}else{
    rank = 'Yếu';
    tr.style.backgroundColor = 'yellow';
}
tr.innerHTML = `
    <td>${currentSTT}</td>
    <td>${nameInputValue}</td>
    <td>${score}</td>
    <td>${rank}</td>
    <td><button class="delete-btn">Xóa</button></td>
`;
tbody.appendChild(tr);
const btnDelete = tr.querySelector('.delete-btn');
btnDelete.addEventListener('click', function(){
    tbody.removeChild(tr);
});
currentSTT++;
nameInput.value = '';
scoreInput.value = '';
nameInput.focus();
});
scoreInput.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        btnAdd.click();
    }
});