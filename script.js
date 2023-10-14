async function fetchRaceResult() {
    try {
        const response = await fetch('http://ergast.com/api/f1/current/last/results.json');
        const data = await response.json();

        const raceName = data.MRData.RaceTable.Races[0].raceName;
        const raceNameElement = document.getElementById('raceName');
        raceNameElement.textContent = raceName;

        const raceResults = data.MRData.RaceTable.Races[0].Results;

        const raceResultsElement = document.getElementById('raceResults');
        raceResults.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${result.position}</td>
            <td>${result.number}</td>
            <td>${result.Driver.givenName} ${result.Driver.familyName}</td>
            <td>${result.Constructor.name}</td>
            <td>${result.laps}</td>
            <td>${result.grid}</td>
            <td>${result.Time ? result.Time.time : 'N/A'}</td>
            <td>${result.points}</td>
            <td>${result.status}</td>
            `;
            raceResultsElement.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.addEventListener('load', fetchRaceResult);


async function fetchRaceSeason() {
    try {
        const response = await fetch('http://ergast.com/api/f1/2023/races.json');
        const data = await response.json();

        const races = data.MRData.RaceTable.Races;
        const raceElement = document.getElementById('races');
        races.forEach(race => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${race.season}</td>
            <td>${race.round}</td>
            <td>${race.raceName}</td>
            <td>${race.date}</td>
            <td>${race.time}</td>
            <td>${race.Circuit.circuitName}</td>
            `;
            raceElement.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data', error);
    }
}


window.addEventListener('load', fetchRaceSeason);



//Cross page actions
window.onload = function() {
    document.getElementById('dropdownMenuButton').addEventListener('click', function() {
        window.location.href = '/index.html';
    });
};

//Contact Us Form
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const submittedData = document.querySelector(".submitted-data");

    // Initially hide the submitted-data element
    submittedData.style.display = 'none';

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form input values
        const name = document.getElementById('inputName').value;
        const email = document.getElementById('inputEmail').value;
        const message = document.getElementById('inputMessage').value;

        // Check if all fields are filled (you can add more validation here)
        if (name && email && message) {
            // Log the form data to check
            console.log('Name: ', name);
            console.log('Email: ', email);
            console.log('Message:', message);

            // Display submitted data
            document.getElementById('submittedName').textContent = name;
            document.getElementById('submittedEmail').textContent = email;
            document.getElementById('submittedMessage').textContent = message;

            // Clear out form inputs
            document.getElementById('inputName').value = "";
            document.getElementById('inputEmail').value = "";
            document.getElementById('inputMessage').value = "";

            // Show the submitted-data element
            submittedData.style.display = 'block';
        } else {
            // Handle case where not all fields are filled
            alert('Please fill in all fields before submitting.');
        }
    });
});


// //Footer only appearing at the bottom of the page (if i scroll down)
// document.addEventListener('DOMContentLoaded', function() {
//     window.addEventListener('scroll', function() {
//         const footer = document.querySelector('.footer-desktop');
//         const scrollPosition = window.scrollY;
//         const windowHeight = window.innerHeight;
//         const pageHeight = document.documentElement.scrollHeight;

//         // Check if the user has scrolled to the bottom of the page
//         if (scrollPosition + windowHeight >= pageHeight) {
//             footer.style.display = 'flex'; // Show the footer
//         } else {
//             footer.style.display = 'none'; // Hide the footer
//         }
//     });
// });
