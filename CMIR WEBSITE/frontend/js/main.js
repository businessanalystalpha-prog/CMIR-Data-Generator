let smStores = JSON.parse(localStorage.getItem('smStores')) || [
    "11000698", "11014205", "11000701", "11000768", "11000092", "11000093", "11000094", 
    "11000095", "11000096", "11000097", "11000098", "11000100", "11000101", "11000102", 
    "11000103", "11000104", "11000105", "11000106", "11000107", "11000108", "11000109", 
    "11000110", "11000111", "11000112", "11000113", "11000114", "11000116", "11000117", 
    "11000118", "11000119", "11000120", "11000121", "11000122", "11000123", "11000124", 
    "11000125", "11000126", "11000127", "11000128", "11000129", "11000131", "11000132", 
    "11000133", "11000134", "11000136", "11000137", "11000138", "11000139", "11000140", 
    "11000141", "11000142", "11000143", "11000144", "11000145", "11000146", "11000148", 
    "11000149", "11000150", "11000151", "11000152", "11000153", "11000162", "11000163", 
    "11000164", "11000165", "11000247", "11000248", "11000255", "11014206", "11000276", 
    "11000130", "11000147", "11015123", "11019342", "11021583", "11024042", "11024128", 
    "11024147", "11025019"
];

let simplyeShoes = JSON.parse(localStorage.getItem('simplyeShoes')) || [
    "11000032", "11000033", "11000035", "11000036", "11000045", "11000055", "11000072", 
    "11000168", "11014223", "11014226", "11000239", "11016915", "11024100", "11024101", "11000073"
];

let masterData = []; 
let currentPage = 1;
const rowsPerPage = 500; 

window.addEventListener('DOMContentLoaded', () => {
    updateThemeUI();
    updateInputCounts();
    updateStoreCategoryCount();
});

window.addEventListener('click', (event) => {
    const dropdown = document.getElementById('settingsDropdown');
    const settingsContainer = event.target.closest('.settings-container');
    if (!settingsContainer && dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});

function toggleSettingsDropdown(event) {
    event.stopPropagation();
    document.getElementById('settingsDropdown').classList.toggle('show');
}

function updateThemeUI() {
    const html = document.documentElement;
    const themeText = document.getElementById('themeText');
    if (!themeText) return;
    
    if (html.getAttribute('data-theme') === 'dark') {
        themeText.innerText = "Light Mode";
    } else {
        themeText.innerText = "Dark Mode";
    }
}

function toggleTheme() {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeUI();
}

function showAlert(title, message) {
    document.getElementById('alertTitle').innerText = title;
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlertModal').style.display = 'flex';
}

function closeAlertModal() {
    document.getElementById('customAlertModal').style.display = 'none';
}

function openPasswordModal() {
    document.getElementById('settingsDropdown').classList.remove('show');
    document.getElementById('configPassword').value = '';
    document.getElementById('passwordModal').style.display = 'flex';
    document.getElementById('configPassword').focus();
}

function closePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

function verifyPassword() {
    const pass = document.getElementById('configPassword').value;
    if (pass === "chg2026") {
        closePasswordModal();
        openConfigModal();
    } else {
        closePasswordModal(); 
        showAlert("Authentication Failed", "Incorrect password entered!");
    }
}

function openConfigModal() {
    document.getElementById('editSmStores').value = smStores.join(', ');
    document.getElementById('editSimplyeStores').value = simplyeShoes.join(', ');
    updateConfigCounts();
    document.getElementById('configModal').style.display = 'flex';
}

function closeConfigModal() {
    document.getElementById('configModal').style.display = 'none';
}

function updateConfigCounts() {
    const smList = document.getElementById('editSmStores').value.split(/[\s,]+/).filter(s => s.trim().length > 0);
    const simplyeList = document.getElementById('editSimplyeStores').value.split(/[\s,]+/).filter(s => s.trim().length > 0);
    document.getElementById('modalSmCount').innerText = `(${smList.length})`;
    document.getElementById('modalSimplyeCount').innerText = `(${simplyeList.length})`;
}

function saveStoreConfig() {
    const smRaw = document.getElementById('editSmStores').value.trim();
    const simplyeRaw = document.getElementById('editSimplyeStores').value.trim();
    if (!smRaw || !simplyeRaw) {
        showAlert("Validation Error", "Store fields cannot be empty!");
        return;
    }
    smStores = smRaw.split(/[\s,]+/).filter(s => s.length > 0);
    simplyeShoes = simplyeRaw.split(/[\s,]+/).filter(s => s.length > 0);
    localStorage.setItem('smStores', JSON.stringify(smStores));
    localStorage.setItem('simplyeShoes', JSON.stringify(simplyeShoes));
    closeConfigModal();
    updateStoreCategoryCount();
    showAlert("Success", "Store configuration successfully saved!");
}

function updateStoreCategoryCount() {
    const category = document.getElementById('storeCategory').value;
    const totalStores = (category === 'sm') ? smStores.length : simplyeShoes.length;
    document.getElementById('storeCategoryCount').innerText = `(Stores: ${totalStores})`;
}

function updateInputCounts() {
    const anList = document.getElementById('an').value.split(/[\s,]+/).map(s => s.trim()).filter(s => s.length > 0);
    const cmnList = document.getElementById('cmn').value.split(/[\s,]+/).map(s => s.trim()).filter(s => s.length > 0);
    
    const anEl = document.getElementById('anCount');
    const cmnEl = document.getElementById('cmnCount');
    anEl.innerText = `(Items: ${anList.length})`;
    cmnEl.innerText = `(Items: ${cmnList.length})`;

    const isMismatch = anList.length !== cmnList.length && (anList.length > 0 || cmnList.length > 0);
    anEl.style.color = isMismatch ? 'var(--danger)' : '';
    cmnEl.style.color = isMismatch ? 'var(--danger)' : '';
}

function generateData() {
    const category = document.getElementById('storeCategory').value;
    const anRaw = document.getElementById('an').value.trim();
    const cmnRaw = document.getElementById('cmn').value.trim();
    
    if (!anRaw || !cmnRaw) {
        showAlert("Missing Input", "Please fill in both the AN and CMN fields!");
        return;
    }

    const anList = anRaw.split(/[\s,]+/);
    const cmnList = cmnRaw.split(/[\s,]+/);

    if (anList.length !== cmnList.length) {
        showAlert("Mismatch Error", "The number of AN and CMN items do not match!");
        return;
    }

    const selectedList = (category === 'sm') ? smStores : simplyeShoes;
    masterData = []; 

    for (let i = 0; i < anList.length; i++) {
        selectedList.forEach(cust => {
            masterData.push({ customer: cust, so: "PH01", dc: "30", an: anList[i], cmn: cmnList[i] });
        });
    }

    currentPage = 1; 
    renderTable();
    document.getElementById('paginationControlsTop').style.display = 'flex';
    document.getElementById('paginationControlsBottom').style.display = 'flex';
    document.getElementById('exportSection').classList.remove('disabled');
}

function resetAll() {
    document.getElementById('an').value = '';
    document.getElementById('cmn').value = '';
    document.getElementById('storeCategory').selectedIndex = 0;
    masterData = [];
    currentPage = 1;
    document.getElementById('dataTable').getElementsByTagName('tbody')[0].innerHTML = "";
    document.getElementById('paginationControlsTop').style.display = 'none';
    document.getElementById('paginationControlsBottom').style.display = 'none';
    document.getElementById('exportSection').classList.add('disabled');
    updateInputCounts();
    updateStoreCategoryCount();
}

function renderTable() {
    const tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ""; 
    const start = (currentPage - 1) * rowsPerPage;
    masterData.slice(start, start + rowsPerPage).forEach(row => {
        tbody.innerHTML += `<tr><td>${row.customer}</td><td>${row.so}</td><td>${row.dc}</td><td>${row.an}</td><td>${row.cmn}</td></tr>`;
    });

    const totalPages = Math.ceil(masterData.length / rowsPerPage) || 1;
    const pageText = `Page ${currentPage} of ${totalPages} (Total: ${masterData.length.toLocaleString()})`;
    
    ['Top', 'Bottom'].forEach(pos => {
        document.getElementById(`pageInfo${pos}`).innerText = pageText;
        document.getElementById(`prevBtn${pos}`).disabled = currentPage === 1;
        document.getElementById(`nextBtn${pos}`).disabled = currentPage === totalPages || totalPages === 0;
    });
}

function changePage(dir) {
    currentPage += dir;
    renderTable();
}

function exportFile() {
    if (masterData.length === 0) return showAlert("No Data", "Please generate data first!");
    const modal = document.getElementById('downloadModal');
    modal.style.display = 'flex';
    const format = document.getElementById('exportFormat').value;

    setTimeout(() => {
        if (format === 'txt') {
            let txt = masterData.map(r => [r.customer, r.so, r.dc, r.an, r.cmn].join("\t")).join("\n");
            const link = document.createElement("a");
            link.href = URL.createObjectURL(new Blob([txt], { type: "text/plain;charset=utf-8;" }));
            link.download = "Generated_Customer_List.txt";
            link.click();
        } else {
            const table = document.createElement('table');
            table.innerHTML = `<tr><th>Customer</th><th>Sales Org</th><th>Dist Channel</th><th>Article</th><th>CMN</th></tr>` +
                masterData.map(r => `<tr><td>${r.customer}</td><td>${r.so}</td><td>${r.dc}</td><td>${r.an}</td><td>${r.cmn}</td></tr>`).join("");
            const wb = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
            XLSX.writeFile(wb, `Generated_Customer_List.${format}`);
        }
        modal.style.display = 'none';
    }, 300);
}

window.addEventListener('DOMContentLoaded', () => {
    updateThemeUI();
    updateInputCounts();
    updateStoreCategoryCount();
    checkIntroModal();
});

function checkIntroModal() {
    // I-check kung naipakita na ang intro sa session na ito
    if (!sessionStorage.getItem('introShown')) {
        document.getElementById('introModal').style.display = 'flex';
    }
}

function closeIntroModal() {
    document.getElementById('introModal').style.display = 'none';
    sessionStorage.setItem('introShown', 'true');
}