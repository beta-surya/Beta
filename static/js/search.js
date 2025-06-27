
// search - content 
const medium = document.querySelector("#medium");
const platform = document.querySelector("#platform");

const options = {
    engine: ['Google', 'Bing', 'Yahoo', 'DuckDuckGo'],
    socialmedia: ['Reddit', 'YouTube','GitHub'],
    archive: ['Internet Archive', 'Wikipedia'],
    newstn: ['Vikatan','Puthiya Thalaimurai',
            'Dinamani'],
    newsind: ['Times of India','The Hindu',
        'Scroll.in','The Wire'],
    newsww:['BBC','CNN']
};

function changeOption(selectedMedium){
    platform.innerHTML= '';
    options[selectedMedium].forEach((option) => {
        const newoption = document.createElement("option");
        newoption.value = option;
        newoption.textContent = option;
        platform.appendChild(newoption);
    });
}
changeOption(medium.value);
medium.addEventListener("change",()=>{
    changeOption(medium.value);
})
// 
// search link preparation and opening
// 
const options_links = {
    // search engine
    "Google": "https://www.google.com/search?q=",
    "Bing": "https://www.bing.com/search?q=",
    "Yahoo": "https://search.yahoo.com/search?p=",
    "DuckDuckGo": "https://duckduckgo.com/?q=",

    // Social media
    "Reddit": "https://www.reddit.com/search/?q=",
    "YouTube": "https://www.youtube.com/results?search_query=",
    "GitHub": "https://github.com/search?q=",

    // Archive / Library
    "Internet Archive": "https://archive.org/search.php?query=",
    "Wikipedia": "https://en.wikipedia.org/w/index.php?search=",

    // Tamil News
    "Puthiya Thalaimurai": "https://www.puthiyathalaimurai.com/?s=",
    "Dinamani": "https://www.dinamani.com/search/?query=",
    "Vikatan": "https://www.vikatan.com/search?q=",

    // Indian News
    "Times of India": "https://timesofindia.indiatimes.com/topic/",
    "The Hindu": "https://www.thehindu.com/search/?q=",
    "Scroll.in": "https://scroll.in/search?q=",
    "The Wire": "https://thewire.in/search?q=",

    // World News 
    "BBC": "https://www.bbc.co.uk/search?q=",
    "CNN": "https://edition.cnn.com/search?q=",
};

function getlink(event){
    event.preventDefault();
    // search query
    const query = document.querySelector("#search-box").value;
    // platform
    const platform = document.querySelector("#platform").value;
    // url
    const url = options_links[platform] + encodeURIComponent(query);
    // opening on new tab
    window.open(url, "_blank");    
}

