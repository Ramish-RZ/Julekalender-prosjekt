document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".luke");

    // Array of detailed text for each "luke"
    const details = [
        "Detail for luke 1",
        "Detail for luke 2",
        "Detail for luke 3",
        "Detail for luke 4",
        "Detail for luke 5",
        "Detail for luke 6",
        "Detail for luke 7",
        "Detail for luke 8",
    ];

    // Array of dates for each "luke"
    const lukeDates = [
        "2024-12-01", 
        "2024-12-02", 
        "2024-12-03", 
        "2024-12-04", 
        "2024-12-05", 
        "2024-12-06", 
        "2024-12-07", 
        "2024-12-08",
        "2024-12-09",
        "2024-12-10",
        "2024-12-11",
        "2024-12-12",
        "2024-12-13",
        "2024-12-14",
        "2024-12-15",
        "2024-12-16",
        "2024-12-17",
        "2024-12-18",
        "2024-12-19",
        "2024-12-20",
        "2024-12-21",
        "2024-12-22",
        "2024-12-23",
        
    ];

    let overlay = null;
    let popup = null;

    // Function to check if a button is openable based on today's date
  /*  const isLukeOpenable = (lukeIndex) => {
        const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
        return today >= lukeDates[lukeIndex]; // Compare with the respective date
    }; */

    // Loop through buttons and add event listeners
    buttons.forEach((button, index) => {
        // Set button content and state based on date logic
       /* if (isLukeOpenable(index)) {
            button.innerHTML = `<span>▶️</span> ${button.innerText}`; // Mark as openable
            button.disabled = false; // Enable the button
        } else {
            button.innerHTML = `<span style="color: red;">🔒</span> ${button.innerText}`; // Mark as locked
            button.disabled = false; // Keep the button clickable but styled as locked
        } */

        // Add click event listener to show the popup
        button.addEventListener("click", (event) => {       
           /* if (!isLukeOpenable(index)) {
                event.preventDefault(); // Prevent action if "luke" is not openable
                alert("This luke is locked until " + lukeDates[index]); // Inform the user
                return;
            } */

            // Close any open popup before opening a new one
            closePopup();

            // Create and display the overlay
            overlay = document.createElement("div");
            overlay.className = "overlay";
            document.body.appendChild(overlay);

            // Create and display the popup
            popup = document.createElement("div");
            popup.className = "popup";

            // Add number and details
            const numberDisplay = document.createElement("div");
            numberDisplay.className = "number";
            numberDisplay.innerText = button.innerText;

            const detailText = document.createElement("div");
            detailText.className = "details";
            detailText.innerText = details[index] || "No details available";

            // Append elements to popup
            popup.appendChild(numberDisplay);
            popup.appendChild(detailText);

            // Add input fields and submit button
const inputContainer = document.createElement("div");
inputContainer.className = "input-container";

const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.placeholder = "Enter your message";
nameInput.className = "popup-input";

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "Enter your email";
emailInput.className = "popup-input";

const submitButton = document.createElement("button");
submitButton.type = "button";
submitButton.innerText = "Submit";
submitButton.className = "popup-submit";
// Add event listener to the submit button
submitButton.addEventListener("click", () => {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    // Validate the inputs
    if (!nameValue || !emailValue.includes("@")) {
        alert("Please provide a valid name and email with an '@'.");
        return;
    }

    // Prepare data to send to the backend
    const formData = {
        name: nameValue,
        email: emailValue,
    };

    // Send data to the backend API
    fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to submit data.");
            }
            return response.json();
        })
        .then((data) => {
            alert("Submission successful!");
            closePopup();
        })
        .catch((error) => {
            console.error(error);
            alert("An error occurred. Please try again later.");
        });
});

// Append inputs and button to the container
inputContainer.appendChild(nameInput);
inputContainer.appendChild(emailInput);
inputContainer.appendChild(submitButton);

// Append inputs and button to the container
inputContainer.appendChild(nameInput);
inputContainer.appendChild(emailInput);
inputContainer.appendChild(submitButton);

// Append the input container to the popup
popup.appendChild(inputContainer);


            document.body.appendChild(popup);

            // Close popup when clicking on the overlay
            overlay.addEventListener("click", closePopup);
        });
    });

    // Function to close the popup
    function closePopup() {
        if (popup) {
            popup.remove();
            popup = null;
        }
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
    }

     // Add touch event listeners for swipe
     popup.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent default touch behavior
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    popup.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Prevent scrolling while swiping
    }, { passive: false });

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = Math.abs(touchEndY - touchStartY);
    
    // Håndter kun horisontale sveip (ignorer hvis vertikal bevegelse er større)
    if (Math.abs(deltaX) > 50 && deltaY < 100) {
        if (deltaX > 0 && currentIndex > 0) {
            // Sveip til høyre - gå til forrige
            currentIndex--;
            showPopup(currentIndex);
        } else if (deltaX < 0 && currentIndex < buttons.length - 1) {
            // Sveip til venstre - gå til neste
            currentIndex++;
            showPopup(currentIndex);
        }
    }
     // Tilbakestill berøringskoordinater
     touchStartX = null;
     touchStartY = null;
 });

