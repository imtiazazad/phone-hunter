const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    searchField.value = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    for (const phone of phones) {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('mt-3')
        div.innerHTML = `
        <div class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
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

const phoneSpecifications = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}"  class="card-img-top " alt="... ">
        <div class="card-body ">
        <h3 class="card-title">${phone.brand}</h3>
        <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text ">${phone.mainFeatures[0]}</p>
        </div>
`;
    phoneDetails.appendChild(div);
}
