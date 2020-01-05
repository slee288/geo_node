const locForm = document.getElementById("loc-form");
const locId = document.getElementById("loc-id");
const locAddr = document.getElementById("loc-addr");

// Sent POST to API to add location
async function addLocation(e) {
    e.preventDefault();

    if(locId.value === "" || locAddr.value === "") {
        alert("Please fill in the fields");
    }

    const sendBody = {
        storeId: locId.value,
        address: locAddr.value
    }

    try {
        const res = await fetch("/api/v1/stores", {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });

        if(res.status === 400) {
            throw Error("Location already exists");
        }

        alert("Location added!");
        window.location.href = "/index.html";
    } catch (err) {
        alert(err);
        return;
    }
}

locForm.addEventListener("submit", addLocation);
