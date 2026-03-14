
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
const sxDiem = document.getElementById('sortScoreBtn');
const timkiem = document.getElementById('searchInput');
const sxRank = document.getElementById('filterRank');
function filterTable(){
    const searchValue = timkiem.value.toLowerCase().trim();
    const selectedRank = sxRank.value;
    
    const rows = tbody.querySelectorAll('tr:not(#noResultRow)');
    
    let visibleCount = 0;

    rows.forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        const rank = row.children[3].textContent;

        const matchName = name.includes(searchValue);
        const matchRank = (selectedRank === 'All') || (rank === selectedRank);

        if (matchName && matchRank) {
            row.style.display = ''; 
            visibleCount++; 
        } else {
            row.style.display = 'none'; 
        }
    });
    
 
    const oldNoResult = document.getElementById('noResultRow');
    if (oldNoResult) {
        oldNoResult.remove();
    }
    if (visibleCount === 0 && rows.length > 0) {
        const tr = document.createElement('tr');
        tr.id = 'noResultRow'; 
        tr.innerHTML = `
            <td colspan="5" style="text-align: center; color: red; font-style: italic;">
                Không có kết quả
            </td>
        `;
        tbody.appendChild(tr);
    }
}
timkiem.addEventListener('input', filterTable);
sxRank.addEventListener('change', filterTable);
let isAscending = true;
sxDiem.addEventListener('click', function(){
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        const scoreA = parseFloat(a.children[2].textContent);
        const scoreB = parseFloat(b.children[2].textContent);
        if (isAscending) {
            return scoreA - scoreB;
        } else {
            return scoreB - scoreA;
        }
    });
isAscending = !isAscending; 
    sxDiem.textContent = isAscending ? 'Điểm ▲' : 'Điểm ▼';

    rows.forEach(row => tbody.appendChild(row));
    
    const allRows = tbody.querySelectorAll('tr');
    allRows.forEach((row, index) => {
        row.children[0].textContent = index + 1;
    });
});

