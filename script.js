document.addEventListener('DOMContentLoaded', function() {
    let jsonData = []; // Store the JSON data globally

    function loadExcelData() {
        fetch('studentsData.xlsx') // Ensure the path is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.arrayBuffer();
            })
            .then(data => {
                const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                console.log('Loaded Data:', jsonData); // Log loaded data

                renderTable(jsonData); // Render the table initially with all data
            })
            .catch(error => console.error('Error loading Excel file:', error));
    }

    function renderTable(data) {
        const tableBody = document.querySelector('#excelTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        data.forEach((row, index) => {
            if (index === 0) return; // Skip the header row

            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    // Filter function
    function filterTable() {
        const usnFilter = document.getElementById('usnFilter').value.toLowerCase();
        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();

        console.log('USN Filter:', usnFilter);
        console.log('Name Filter:', nameFilter);

        const filteredData = jsonData.filter((row, index) => {
            if (index === 0) return true; // Always include the header

            const usn = row[0] ? row[0].toString().toLowerCase() : ''; // USN is in the first column
            const name = row[1] ? row[1].toString().toLowerCase() : ''; // Name is in the second column

            console.log('Checking row:', { usn, name });

            return (usn.includes(usnFilter) && name.includes(nameFilter));
        });

        renderTable(filteredData);
    }

    // Event listeners for filter inputs
    document.getElementById('usnFilter').addEventListener('input', filterTable);
    document.getElementById('nameFilter').addEventListener('input', filterTable);

    // Load the Excel data when the page loads
    loadExcelData();
});
