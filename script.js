const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

getCountries();

async function getCountries() {
	const res = await fetch('https://corona.lmao.ninja/v3/covid-19/countries');
	const countries = await res.json();
	displayCountries(countries);
}


function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach(country => {
		const countryEl = document.createElement('div');
		countryEl.classList.add('card');

		countryEl.innerHTML = `
            <div>
                <img src="${country.countryInfo.flag}" alt="country-image" />
            </div>

            <div class="card-body">
                <h3 class="country-name">${country.country}</h3>
                <p>
                <strong>Population:</strong>
                    ${country.population}
                </p>
                <p>
                    <strong>Active Cases:</strong>
                    ${country.active}
                </p>
                <p>
                <strong>Recovered:</strong>
                    ${country.recovered}
                 </p>
                <p>
                    <strong>Deaths:</strong>
                    ${country.deaths}
                </p>
                <p class="country-region">
                <strong>Continent:</strong>
                    ${country.continent}
                </p>
                <p>
                    <small>Tap for more info..</small>
                </p>
            </div>
        `;

		countryEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			showCountryDetails(country);
		});

		countriesEl.appendChild(countryEl);
	});
}

function showCountryDetails(country) {
	const modalBody = modal.querySelector('.modal-body');
	const modalImg = modal.querySelector('img');

	modalImg.src = country.countryInfo.flag;

	modalBody.innerHTML = `
        <h2>${country.country}</h2>
        <p>
            <strong>Today Cases:</strong>
            ${country.todayCases}
        </p>
        <p>
            <strong>Today Recovered:</strong>
            ${country.todayRecovered}
        </p>
        <p>
            <strong>Today Deaths:</strong>
            ${country.todayDeaths}
        </p>
        <p>
            <strong>Active Cases per One Million:</strong>
            ${country.activePerOneMillion}
        </p>
        <p>
            <strong>Recovered Cases per One Million:</strong>
            ${country.recoveredPerOneMillion}
        </p>
        <p>
            <strong>Deaths per One Million:</strong>
            ${country.deathsPerOneMillion}
         </p>
    `;
}

// theme - dark & light
toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});

// show and hide the filters (li tags)
filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});

// close the modal
closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

searchEl.addEventListener('input', e => {
	const { value } = e.target;
	const countryName = document.querySelectorAll('.country-name');

	countryName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			// .card -> .card-body -> .country-name
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});

// add a filter on the li's inside the .dropdown
regionFilters.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'All') {
				// .card -> .card-body -> .country-region
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});

// scrollfunction
var mybutton = document.getElementById("scrollBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } 
  else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
