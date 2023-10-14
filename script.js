async function fetchRaceResult() {
    try {
        const response = await fetch('http://ergast.com/api/f1/current/last/results.json');
        const data = await response.json();

        const raceName = data.MRData.RaceTable.Races[0].raceName;
        const raceNameElement = document.getElementById('raceName');
        raceNameElement.textContent = raceName;

        const raceResults = data.MRData.RaceTable.Races[0].Results;

        console.log('Race Results:', raceResults)

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

        console.log('Races in Season:', races);

        const raceElement = document.getElementById('races');
        races.forEach(race => {
            const row = document.createElement('tr');
            row.innerHTML = `
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

// About.html Content Cards
document.addEventListener("DOMContentLoaded", function (){
    const data = [
        { title: "Who am I?", text: "I'm Mia - Just a mid-twenties girlie trying to find her way in life!" },
        {
            title: "What is my professional / academic background?",
            text: "I graduated from NUS in 2020 at the very start of the pandemic, with a Bachelor's in Global Studies (a multidisciplinary program that spanned across Political Science, History, Geography, Sociology etc.).<br><br>Out of graduation, I worked as a Research Executive at NTUC First Campus, an early childhood organization.<br><br>I then moved to my current role, Business Manager, at an Education Technology company."
        },
        {
            title: "How did I become an F1 girlie?",
            text: "One of the verticals that my company focuses on is Research, and racing was one of the key segments we focused on. Our ML capabilities analyzed various aspects of racing from car sensors to damage image recognition, and we even covered the commercial aspect of racing such as Brand Recognition.<<br><br>We're working with some of the F1 teams which pushed me to learn more about this part of motorsports.<br><br>It helped that Netflix had the F1 documentary, Drive to Survive, which made it very easy to jump on the F1 bandwagon.<br><br>And here I am!"
        },
        {
            title: "Here's me on the Marina Bay Circuit this year, and tripping over myself!",
            text: `        
                <video controls width="240" height="380">
                    <source src="../img/SGF1_2023.mp4" type="video/mp4">
                    Your browser does not support the video.
                </video>`
        }
    ];

    function addCard(title, text) {
        const template =
        document.getElementById("card-template").content.cloneNode(true);

        template.querySelector('.card-title').innerHTML = title;
        template.querySelector('.card-text').innerHTML = text;

        document.querySelector('#card-list').appendChild(template);
    }
    data.forEach(item => addCard(item.title, item.text));
})




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

