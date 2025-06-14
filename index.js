//Checking repo input from the user
const formContainer = document.querySelector('[form-container]');
const inputRepo = document.querySelector('[repo-input]');
const searchRepo = document.querySelector('[btn]');
formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchRepoDetails(inputRepo.value);
});

// importing rendering components
const avatarImage = document.querySelector('[repo-avatar-profile]');
const userName = document.querySelector('[repo-user-name]');
const joinDate = document.querySelector('[repo-join-date]');
const githubUserName = document.querySelector('[repo-github-name]');
const bio = document.querySelector('[repo-bio]');
const repoCount = document.querySelector('.repo-count');
const followersCount = document.querySelector('.followers-count');
const followingCount = document.querySelector('.following-count');
const userlocation = document.querySelector('[social-profile-location]');
const website = document.querySelector('[social-profile-website]');
const twitter = document.querySelector('[social-profile-twitter]');
const company = document.querySelector('[social-profile-company]');
const stats = document.querySelector('.github-repo');
const stats2 = document.querySelector('.repo-followers');
const heading = document.querySelector('#devDetective');
const headingCount = document.querySelector('.heading-count');
const count = document.querySelector('.count');

//Calling the API
async function fetchRepoDetails(repoName) {
    let response = await fetch(`https://api.github.com/users/${repoName}`);
    let data = await response.json();
    renderRepoDetails(data);
};

//Rendering the data from the API onto the webpage
function renderRepoDetails(data) {
    let date = `${data?.created_at}`;
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    let updatedMonth = monthdetector(month);
    let year = date.slice(0, 4);
    let updatedDate = `${day} ${updatedMonth} ${year}`;
    avatarImage.src = data?.avatar_url;
    userName.innerText = data?.name;
    joinDate.innerText = `Joined ${updatedDate}`;
    githubUserName.innerText = `@${data?.login}`;
    bio.innerText = data?.bio;
    repoCount.innerText = data?.public_repos;
    followersCount.innerText = data?.followers;
    followingCount.innerText = data?.following;

    if (data?.location == null) {
        userlocation.innerText = 'Not Available';
    } else {
        userlocation.innerText = data?.location;
    }

    if (`${data?.blog}` == '') {
        website.innerText = 'Not Available';
    } else {
        website.innerText = data?.blog;
    }

    if (data?.twitter_username == null) {
        twitter.innerText = 'Not Available';
    } else {
        twitter.innerText = data?.twitter_username;
    }

    if (data?.company == null) {
        company.innerText = 'Not Available';
    } else {
        company.innerText = data?.company;
    }
    githubUserName.addEventListener('click', () => {
        window.open(`https://github.com/${data?.login}`);

    });
    if (!(data?.twitter_username == null)) {
        twitter.addEventListener('click', () => {
            window.open(`https://x.com/${data?.twitter_username}`);
        });
    }
};


//Adding Default Repo
fetchRepoDetails('PragunSharma-Code');
function monthdetector(month) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
}


//Mode Switching

const lightMode = document.querySelector('.lightMode');
const darkMode = document.querySelector('.darkMode');
lightMode.classList.add('active');

lightMode.addEventListener('click', () => {
    lightMode.classList.remove('active');
    darkMode.classList.add('active');
    document.body.classList.add('dark-mode');
});

darkMode.addEventListener('click', () => {
    darkMode.classList.remove('active');
    lightMode.classList.add('active');
    document.body.classList.remove('dark-mode');
});


