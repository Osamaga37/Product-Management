let tittle = document.getElementById('tittle');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode = "Create";
let temp;

// function get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#5d1c1c'
    }
}

// function create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        tittle:tittle.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    // clean data
    if(tittle.value != '' && price.value != '' && category.value != '' && newPro.count <= 100){
    if(mode === 'Create'){
    // count
    if(newPro.count > 1){
        for (let i = 0; i < newPro.count; i++){
            dataPro.push(newPro);
        }
    }
    else{
    dataPro.push(newPro);
    }
}
else{
    dataPro[temp] = newPro;
    mode = 'Create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
}
clearData();
    }
    // save data localstorage
    localStorage.setItem('product',  JSON.stringify(dataPro) );
    
    showData();
}

// clear inputs
function clearData() {
    tittle.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
function showData(){
    let table = '';
    for (let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].tittle}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0){
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
        `
    }
    else{
        btnDeleteAll.innerHTML = '';
    }
    getTotal();
}
showData();

// delete item & delete all items
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update
function updateData(i){
    tittle.value = dataPro[i].tittle;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mode = "Update";
    temp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

// search
let searchMode = 'tittle';

function getSearchMode(id) {
    let search = document.getElementById('search')
    if (id == 'searchTittle') {
        searchMode = 'tittle';
    }
    else{
        searchMode = 'category';
    }
            search.placeholder = 'Search By '+ searchMode;
    search.focus();
    search.value = '';
    showData();
}
function searchData(value){
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
    if (searchMode == 'tittle') {
            if(dataPro[i].tittle.includes(value)){
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].tittle}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        
        `;
            }
        }
    else{
            if(dataPro[i].category.includes(value)){
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].tittle}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        
        `;
            
        }
    }
}
    document.getElementById('tbody').innerHTML = table;
}

