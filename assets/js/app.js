const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved');

getFromLocalStorage();
calculateMovie();

// AŞAĞIDA HANGİ EVENT OLDUĞU YAZAR.
// container.addEventListener('click', function(e) {
//     console.log(e);
// });

//AŞAĞIDA SAYFANIN HEPSİNDE GEÇERLİ TIKLADIĞIMIZ ELEMENT GELİR.
// container.addEventListener('click', function(e) {
//     console.log(e.target);
// });

//CLASSLİST İÇİNDEKİ SEAT CLASSINA SAHİP OLANLAR TRUE OLUNCA O ELEMENT GELİR.
// container.addEventListener('click', function(e) {
//     if(e.target.classList.contains('seat')) {
//         console.log(e.target);
//     }
// });

container.addEventListener('click', function(e) {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateMovie();
    }
});
select.addEventListener('change', function(e) { //select kutusu değişince bilgilerin güncellenmesi
    calculateMovie();
});

function calculateMovie() {
    const selectedSeats = container.querySelectorAll('.seat.selected'); //querySelectorAll birden fazla elemen seçmek için

    const selectedSeatsArr = [];
    const seatsArr = [];
    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    });
    seats.forEach(function(seat) {
        seatsArr.push(seat);
    });
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length; //seçilen her elemanın sayısını döndürür.
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) //uygulama tarafında kullanılacak olan liste biçimine çevrilir

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) { // bütün elemanları dolaşmak için forEach
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        }) 
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) { // bilgileri local storage kaydetmek
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex); //select boxtaki filmin indeksi
}