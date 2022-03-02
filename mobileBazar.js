document.getElementById('error-message').style.display = 'none';
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const error = document.getElementById('error')
    const searchText = searchField.value;

    // clear data
    searchField.value = '';

    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        searchField.value = ''
        error.innerText = "Please enter your phone name or watch name"
        //please write something to display
    }
    else {
        //load data
        error.innerText = ''
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    //clear data
    searchResult.textContent = '';
    if (phones.length == 0) {
        //show no result found
    }
    else {
        for (const phone of phones) {
            const div = document.createElement('div')
            div.classList.add('col-lg-4')
            div.classList.add('mt-3')
            div.innerHTML = `
        <div class="card h-100 w-75 p-2 mx-auto">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
        <h3 class="card-title">${phone.brand}</h3>
        <h5 class="card-title">${phone.phone_name}</h5>
        <button onclick="phoneSpecifications('${phone.slug}')" class="btn btn-primary">See Details</button>
        </div>
        </div>
        `
            searchResult.appendChild(div);
        }
    }
}
const phoneSpecifications = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
const displayPhoneDetails = phone => {
    // console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}"  class="card-img-top w-50 mx-auto" alt="... ">
    <div class="card-body ">
    <h3 class="card-title"><strong>Brand: </strong>${phone.brand}</h3>
    <h4 class="card-title"><strong>Phone Name: </strong>${phone.name ? phone.name = phone.name : 'Data Not available'}</h4>
    <h5 class="card-text"><strong>Release Date: </strong>${phone.releaseDate ? phone.releaseDate = phone.releaseDate : 'Data Not Available'}</h5>
    
    <p class="card-text"><strong>Storage: </strong>${phone.mainFeatures?.storage ? phone.mainFeatures.storage = phone.mainFeatures.storage : 'Data Not Found'}</p>
    <p class="card-text"><strong>Display Size: </strong>${phone.mainFeatures?.displaySize ? phone.mainFeatures.displaySize = phone.mainFeatures.displaySize : 'Data Not Found'}</p>
    <p class="card-text"><strong>Chipset: </strong>${phone.mainFeatures?.chipSet? phone.mainFeatures.chipSet = phone.mainFeatures.chipSet: 'Data Not Found'}</p>
    <p class="card-text"><strong>Memory: </strong>${phone.mainFeatures?.memory? phone.mainFeatures.memory = phone.mainFeatures.memory: 'Data Not Found'}</p>
    <p class="card-text"><strong>Sensors: </strong>${phone.mainFeatures?.sensors? phone.mainFeatures.sensors = phone.mainFeatures.sensors: 'Data Not Found'}</p>

    <p class="card-text"><strong>WLAN: </strong>${phone.others?.WLAN? phone.others.WLAN = phone.others.WLAN: 'Data Not Found'}</p>
    <p class="card-text"><strong>Bluetooth: </strong>${phone.others?.Bluetooth? phone.others.Bluetooth = phone.others.Bluetooth: 'Data Not Found'}</p>
    <p class="card-text"><strong>GPS: </strong>${phone.others?.GPS? phone.others.GPS = phone.others.GPS: 'Data Not Found'}</p>
    <p class="card-text"><strong>NFC: </strong>${phone.others?.NFC? phone.others.NFC = phone.others.NFC: 'Data Not Found'}</p>
    <p class="card-text"><strong>Radio: </strong>${phone.others?.Radio? phone.others.Radio = phone.others.Radio: 'Data Not Found'}</p>
    </div>`;
    phoneDetails.appendChild(div);
}
