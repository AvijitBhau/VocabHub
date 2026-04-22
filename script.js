let meaning = document.querySelectorAll('.para span');
let search = document.getElementById('search');
// let next_word = document.getElementById('next');
let wordInput = document.getElementById('word');
let loader = document.getElementById('loader');

search.addEventListener('click', () => {
    let word = wordInput.value.trim();
    if (word === "") {
        meaning[0].style.color = 'orange';
        meaning[0].textContent = 'Please enter a word';
        return;
    }

    loader.style.display = 'block';
    meaning[0].textContent = '';

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // Extract meaning
            let definition = data[0].meanings[0].definitions[0].definition;
            meaning[0].textContent = definition;
            meaning[0].style.color = 'green';
        })
        .catch(error => {
            meaning[0].style.color = 'red';
            meaning[0].textContent = "Word not found";
            console.log("Error : ", error);
        })
        .finally(() => {
            // Hode loader
            loader.style.display = 'none';
        }) 
})

// next_word.addEventListener('click', () => {
//     window.location.reload();
// })

wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Alt') {
        wordInput.click();
    }
    if (e.key === 'Enter') {
        search.click();
    }
})
