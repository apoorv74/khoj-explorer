// Function to fetch JSON data from a file
async function fetchJSON() {
    try {
        const response = await fetch('data/khoj_india.json'); // Replace with the actual file path
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return [];
    }
}

// Function to populate the dropdown with judge names
function populateDropdown(judgeData) {
    const dropdown = document.getElementById('judgeDropdown');

    judgeData.forEach(judge => {
        const option = document.createElement('option');
        option.value = judge["Name of the Judge"];
        option.textContent = judge["Name of the Judge"];
        dropdown.appendChild(option);
    });
}

// Function to display judge details for the selected judge
function displaySelectedJudge() {
    const selectedJudgeName = document.getElementById('judgeDropdown').value;
    const selectedJudge = judgeData.find(judge => judge["Name of the Judge"] === selectedJudgeName);

    if (selectedJudge) {
        displayJudgeDetails(selectedJudge);
    } else {
        document.getElementById('judgeDetails').innerHTML = '<p>Select a judge to view details.</p>';
    }
}

// Function to display judge details
function displayJudgeDetails(judge) {
    const personalDetailsHTML = generateDetailHTML('Personal Details', judge, [
        { label: 'Name of the Judge', key: 'Name of the Judge' },
        { label: 'Gender', key: 'Gender' },
        { label: 'Date of Birth', key: 'Date of Birth' },
        { label: 'Place of Birth', key: 'Place of Birth' },
        { label: 'Schooling Information', key: 'Schooling Information' },
        { label: 'Graduation Institution', key: 'Graduation Institution' },
        { label: 'Graduation Specialization', key: 'Graduation Specialization' },
        { label: 'Law Degree Institution', key: 'Law Degree Institution' },
        { label: 'Law Degree Year', key: 'Law Degree Year' },
        { label: 'Bar Enrolment Year', key: 'Bar Enrolment Year' },
        { label: 'State Bar Association where enrolled', key: 'State Bar Association where enrolled' },
        { label: 'Foreign Degree in Law', key: 'Foreign Degree in Law' },
        { label: 'Post-Graduate in another subject', key: 'Post-Graduate in another subject' },
        { label: 'Post-Graduate in Law', key: 'Post-Graduate in Law' }
    ]);

    const appointedToHighCourtHTML = generateDetailHTML('High Court Appointments', judge, [
        { label: 'Date of Appointment', key: 'Date of Appointment' },
        { label: 'Date of Retirement', key: 'Date of Retirement' },
        { label: 'If Died in Office', key: 'If Died in Office' },
        { label: 'If resigned from office', key: 'If resigned from office' },
        { label: 'Parent High Court', key: 'Parent High Court' }
    ]);

    const transfersHTML = generateDetailHTML('Transfers', judge, [
        { label: 'If transferred to any other High Court', key: 'If transferred to any other High Court' },
        { label: 'First Transfer', key: 'If yes, which High Court 1' },
        { label: 'Date of first transfer', key: 'Date of such transfer - 1' },
        { label: 'Second Transfer', key: 'If yes, which High Court 2' },
        { label: 'Date of second transfer', key: 'Date of such transfer - 2' },
        { label: 'If yes, which High Court 3', key: 'If yes, which High Court 3' },
        { label: 'Date of third transfer', key: 'Date of such transfer - 3' },
        { label: 'If appointed Chief Justice in any High Court', key: 'If appointed Chief Justice in any High Court' },
        { label: 'Chief Justice - First High Court', key: 'If yes, which High Court - 1' },
        { label: 'Chief Justice - Second High Court', key: 'If yes, which High Court - 2' },
        { label: 'Chief Justice - Third High Court', key: 'If yes, which High Court - 3' }
    ]);

    const supremeCourtHTML = generateDetailHTML('Supreme Court Appointments', judge, [
        { label: 'If appointed to the Supreme Court', key: 'If appointed to the Supreme Court' },
        { label: 'Date of appointment', key: 'Date of appointment to the Supreme Court' }
    ]);

    const experienceHTML = generateDetailHTML('Professional Experience', judge, [
        { label: 'Cadre', key: 'Cadre' },
        { label: 'Experience in Subordinate Judiciary', key: 'Experience in Subordinate Judiciary' },
        { label: 'Litigation Experience', key: 'Litigation Experience' },
        { label: 'If a Senior Advocate', key: 'If a Senior Advocate' },
        { label: 'Experience in High Court Administrative Post', key: 'Experience in High Court Administrative Post' },
        { label: 'If served as Counsel for Government/PSU/Statutory Body', key: 'If served as Counsel for Government/PSU/Statutory Body' },
        { label: 'If served as Advocate General', key: 'If served as Advocate General' },
        { label: 'If empanelled by Banks', key: 'If empanelled by Banks' },
        { label: 'If empanelled by Private Companies', key: 'If empanelled by Private Companies' },
        { label: 'Chamber Details', key: 'Chamber Details' }
    ]);

    document.getElementById('personalDetails').innerHTML = personalDetailsHTML;
    document.getElementById('appointedToHighCourt').innerHTML = appointedToHighCourtHTML;
    document.getElementById('transfers').innerHTML = transfersHTML;
    document.getElementById('supremeCourt').innerHTML = supremeCourtHTML;
    document.getElementById('experience').innerHTML = experienceHTML;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Function to generate HTML for a section with conditional content
function generateDetailHTML(sectionTitle, judge, details) {
    const filteredDetails = details
        .filter(detail => judge[detail.key] !== "Not Applicable")
        .map(detail => `<p><strong>${detail.label}:</strong> ${toTitleCase(judge[detail.key])}</p>`)
        .join('');

    return `<h2>${sectionTitle}</h2>${filteredDetails}`;
}

// Fetch JSON data and populate dropdown
let judgeData;
fetchJSON().then(data => {
    judgeData = data;
    populateDropdown(judgeData); // Populate the dropdown with judge names
});
