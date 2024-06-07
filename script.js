// Array to store users
let users = [];

// Function to generate a unique ID
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to render the user table
function renderUserTable() {
    let tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = ''; 
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let row = tbody.insertRow();
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.id}</td>
            <td>${user.registrationDate}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="updateUser(${i})">Update</button>
                <button class="delete" onclick="deleteUser(${i})">Delete</button>
            </td>
        `;
    }
}

// Event listener for the registration form
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        Toastify({
            text: "User already exists!",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
        return;
    }

    if (password.length < 6) {
        Toastify({
            text: "Password must be at least 6 characters long!",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
        return;
    }

    let newUser = {
        email: email,
        password: password,
        id: generateUniqueId(),
        registrationDate: new Date().toLocaleString(),
        status: 'Active'
    };

    users.push(newUser);
    renderUserTable();
    document.getElementById('registerForm').reset(); 
    Toastify({
        text: "The user is successfully registered!",
        duration: 3000,
        gravity: "top",
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
});

// Event listener for the sign-in form
document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = document.getElementById('signInEmail').value;
    let password = document.getElementById('signInPassword').value;
    
    let user = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (user) {
        document.getElementById('nav-content').innerText = 'Logged in as: ' + user.email;
        
        Toastify({
            text: "Welcome dear user",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {
        Toastify({
            text: "Invalid password or email",
            duration: 3000,
            gravity: "top",
            position: "left",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
    }
});
// Function to update a user
function updateUser(i) {
    let user = users[i];
    let newEmail = prompt('Enter new email:', user.email);
    let newPassword = prompt('Enter new password:', user.password);
    let newStatus = prompt('Enter new status:', user.status);

    if (newEmail && newPassword && newStatus) {
        users[i] = { ...user, email: newEmail, password: newPassword, status: newStatus };
        renderUserTable();
    } else {
        alert('All fields are required.');
    }
}

// Function to delete a user
function deleteUser(i) {
    users.splice(i, 1); 
    renderUserTable();
}

//// Function to read and alert user details
function readUserDetails() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    alert('Email: ' + email + '\nPassword: ' + password);
}

// Add a button to the registration form for reading user details
let readButton = document.createElement('button');
readButton.type = 'button'; 
readButton.textContent = 'Read User Details';
readButton.onclick = readUserDetails;
document.getElementById('registerForm').appendChild(readButton);

// Initial render of the user table
renderUserTable();


