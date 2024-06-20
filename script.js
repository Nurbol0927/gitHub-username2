async function searchUser() {
    const userName = document.getElementById("UserName").value;
    if (!userName) {
      alert("Enter your username");
      return;
    }
  
    const URL = `https://api.github.com/users/${userName}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Network response not ok: " + response.statusText);
      }
      const user = await response.json();
  
      localStorage.setItem("user", JSON.stringify(user));
      const getUserLocal = JSON.parse(localStorage.getItem("user"));
      showUsers(getUserLocal);
    } catch (error) {
      console.error("An error occurred: ", error);
      document.getElementById("result").innerHTML = "<p>no response from the server</p>";
    }
  
    setTimeout(() => {
      document.getElementById("result").innerHTML = "";
      document.getElementById("UserName").value = "";
    }, 5000);
  }
  
  function showUsers(user) {
    document.getElementById("result").innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${user.avatar_url}" class="card-img-top" alt="User Avatar">
        <div class="card-body">
          <h5 class="card-title">${user.login}</h5>
          <p class="card-text">${user.bio ? user.bio : "No bio available"}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Repositories: ${user.public_repos}</li>
          <li class="list-group-item">Location: ${user.location ? user.location : "Location not available"}</li>
          <li class="list-group-item">Created at: ${new Date(user.created_at).toLocaleDateString()}</li>
        </ul>
        <div class="card-body">
          <a href="${user.html_url}" class="card-link">GitHub Profile</a>
        </div>
      </div>
    `;
  }
  