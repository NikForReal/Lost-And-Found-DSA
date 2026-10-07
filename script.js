// ======================================================
// LOST & FOUND MANAGEMENT SYSTEM
// DSA: LINKED LIST + SEARCHING + SORTING
// ======================================================



// ======================================================
// NODE
// ======================================================

class Node {

    constructor(item) {

        this.item = item;

        this.next = null;

    }

}



// ======================================================
// LINKED LIST
// ======================================================

class LinkedList {

    constructor() {

        this.head = null;

    }


    // INSERT NODE

    add(item) {

        const newNode =
            new Node(item);


        if (
            this.head === null
        ) {

            this.head =
                newNode;

            return;

        }


        let current =
            this.head;


        while (
            current.next !== null
        ) {

            current =
                current.next;

        }


        current.next =
            newNode;

    }


    // DELETE NODE

    delete(id) {

        if (
            this.head === null
        ) {

            return;

        }


        if (
            this.head.item.id === id
        ) {

            this.head =
                this.head.next;

            return;

        }


        let current =
            this.head;


        while (

            current.next !== null &&

            current.next.item.id !== id

        ) {

            current =
                current.next;

        }


        if (
            current.next !== null
        ) {

            current.next =
                current.next.next;

        }

    }


    // CONVERT LINKED LIST TO ARRAY

    toArray() {

        const items = [];

        let current =
            this.head;


        while (
            current !== null
        ) {

            items.push(
                current.item
            );

            current =
                current.next;

        }


        return items;

    }

}



// ======================================================
// GLOBAL VARIABLES
// ======================================================

const itemList =
    new LinkedList();


let currentType =
    "Lost";


let currentFilter =
    "All";


let currentSort =
    "newest";


let editingId =
    null;



// ======================================================
// OPEN FORM
// ======================================================

function openForm(type) {

    currentType =
        type;


    editingId =
        null;


    document
        .getElementById("formSection")
        .classList
        .remove("hidden");


    document
        .getElementById("formTitle")
        .innerText =
        `Report ${type} Item`;


    document
        .getElementById("submitText")
        .innerText =
        "➕ Add Item";


    document
        .getElementById("itemForm")
        .reset();


    document
        .getElementById("itemName")
        .focus();

}



// ======================================================
// CLOSE FORM
// ======================================================

function closeForm() {

    document
        .getElementById("formSection")
        .classList
        .add("hidden");


    document
        .getElementById("itemForm")
        .reset();


    editingId =
        null;

}



// ======================================================
// FORM SUBMIT
// ======================================================

document
    .getElementById("itemForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const contact =
                document
                    .getElementById("contact")
                    .value
                    .trim();


            if (
                !/^[0-9]{10}$/.test(contact)
            ) {

                alert(
                    "Please enter a valid 10-digit contact number."
                );

                return;

            }



            // EDIT ITEM

            if (
                editingId !== null
            ) {

                updateExistingItem(
                    editingId
                );

                return;

            }



            // CREATE ITEM

            const item = {

                id:
                    Date.now(),

                name:
                    document
                        .getElementById("itemName")
                        .value
                        .trim(),

                category:
                    document
                        .getElementById("category")
                        .value,

                location:
                    document
                        .getElementById("location")
                        .value
                        .trim(),

                reportedBy:
                    document
                        .getElementById("reportedBy")
                        .value
                        .trim(),

                contact:
                    contact,

                date:
                    document
                        .getElementById("date")
                        .value,

                description:
                    document
                        .getElementById("description")
                        .value
                        .trim(),

                type:
                    currentType,

                status:
                    "Active"

            };


            itemList.add(item);


            saveData();


            displayItems();


            closeForm();

        }
    );



// ======================================================
// EDIT ITEM
// ======================================================

function editItem(id) {

    let current =
        itemList.head;


    while (
        current !== null
    ) {

        if (
            current.item.id === id
        ) {

            const item =
                current.item;


            editingId =
                id;


            currentType =
                item.type;


            document
                .getElementById("formSection")
                .classList
                .remove("hidden");


            document
                .getElementById("formTitle")
                .innerText =
                `Edit ${item.type} Item`;


            document
                .getElementById("submitText")
                .innerText =
                "💾 Update Item";


            document
                .getElementById("itemName")
                .value =
                item.name;


            document
                .getElementById("category")
                .value =
                item.category;


            document
                .getElementById("location")
                .value =
                item.location;


            document
                .getElementById("reportedBy")
                .value =
                item.reportedBy;


            document
                .getElementById("contact")
                .value =
                item.contact;


            document
                .getElementById("date")
                .value =
                item.date;


            document
                .getElementById("description")
                .value =
                item.description;


            document
                .getElementById("itemName")
                .focus();


            break;

        }


        current =
            current.next;

    }

}



// ======================================================
// UPDATE ITEM
// ======================================================

function updateExistingItem(id) {

    let current =
        itemList.head;


    while (
        current !== null
    ) {

        if (
            current.item.id === id
        ) {

            current.item.name =
                document
                    .getElementById("itemName")
                    .value
                    .trim();


            current.item.category =
                document
                    .getElementById("category")
                    .value;


            current.item.location =
                document
                    .getElementById("location")
                    .value
                    .trim();


            current.item.reportedBy =
                document
                    .getElementById("reportedBy")
                    .value
                    .trim();


            current.item.contact =
                document
                    .getElementById("contact")
                    .value
                    .trim();


            current.item.date =
                document
                    .getElementById("date")
                    .value;


            current.item.description =
                document
                    .getElementById("description")
                    .value
                    .trim();


            break;

        }


        current =
            current.next;

    }


    saveData();


    displayItems();


    closeForm();

}



// ======================================================
// CREATE CARD
// ======================================================

function createCard(item) {

    const card =
        document.createElement("div");


    card.className =
        "item-card";


    let statusText;

    let statusClass;



    if (
        item.status === "Returned"
    ) {

        statusText =
            "RETURNED";

        statusClass =
            "returned";

    }

    else if (
        item.type === "Found"
    ) {

        statusText =
            "FOUND";

        statusClass =
            "found";

    }

    else {

        statusText =
            "LOST";

        statusClass =
            "";

    }



    card.innerHTML = `

        <h3>
            ${escapeHTML(item.name)}
        </h3>


        <p>
            <strong>Category:</strong>
            ${escapeHTML(item.category)}
        </p>


        <p>
            <strong>Location:</strong>
            ${escapeHTML(item.location)}
        </p>


        <p>
            <strong>Reported By:</strong>
            ${escapeHTML(item.reportedBy)}
        </p>


        <p>
            <strong>Contact:</strong>
            ${escapeHTML(item.contact)}
        </p>


        <p>
            <strong>Date:</strong>
            ${escapeHTML(item.date)}
        </p>


        <p>
            <strong>Description:</strong>
            ${escapeHTML(item.description)}
        </p>


        <span class="status ${statusClass}">
            ${statusText}
        </span>


        <div class="card-buttons">


            <button
                class="edit-btn"
                onclick="editItem(${item.id})">

                ✏️ Edit

            </button>



            ${
                item.status !== "Returned"

                ?

                `
                <button
                    class="return-btn"
                    onclick="markReturned(${item.id})">

                    ✅ Returned

                </button>
                `

                :

                ""
            }



            <a
                href="tel:${item.contact}"
                class="call-btn"
                style="
                    text-decoration:none;
                    display:inline-flex;
                    align-items:center;
                    padding:8px 10px;
                    border-radius:6px;
                    font-size:11px;
                    font-weight:600;
                ">

                📞 Call

            </a>



            <button
                class="delete-btn"
                onclick="deleteItem(${item.id})">

                🗑️ Delete

            </button>


        </div>

    `;


    return card;

}



// ======================================================
// DISPLAY ITEMS
// ======================================================

function displayItems() {

    const container =
        document
            .getElementById(
                "itemsContainer"
            );


    container.innerHTML =
        "";


    let items =
        itemList.toArray();



    // FILTER

    if (
        currentFilter !== "All"
    ) {

        items =
            items.filter(
                item =>
                    item.type ===
                    currentFilter
            );

    }



    // SORT

    items.sort(
        (a, b) => {

            const dateA =
                new Date(a.date);

            const dateB =
                new Date(b.date);


            if (
                currentSort === "newest"
            ) {

                return dateB - dateA;

            }


            return dateA - dateB;

        }
    );



    // TITLE

    const title =
        document
            .getElementById(
                "itemsTitle"
            );


    const subtitle =
        document
            .getElementById(
                "itemsSubtitle"
            );



    if (
        currentFilter === "Lost"
    ) {

        title.innerText =
            "🔴 Lost Items";


        subtitle.innerText =
            "Items reported as lost";

    }

    else if (
        currentFilter === "Found"
    ) {

        title.innerText =
            "🟢 Found Items";


        subtitle.innerText =
            "Items reported as found";

    }

    else {

        title.innerText =
            "📋 All Items";


        subtitle.innerText =
            "All reported lost and found items";

    }



    // BADGE

    document
        .getElementById(
            "itemsBadge"
        )
        .innerText =
        items.length;



    // EMPTY

    if (
        items.length === 0
    ) {

        container.innerHTML = `

            <p class="empty">

                No items found for this filter.

            </p>

        `;

    }



    // DISPLAY

    items.forEach(
        item => {

            container.appendChild(
                createCard(item)
            );

        }
    );



    updateStatistics();


    updateLinkedListVisual();

}



// ======================================================
// FILTER
// ======================================================

function setFilter(filter) {

    currentFilter =
        filter;


    document
        .querySelectorAll(
            ".filter-btn"
        )
        .forEach(
            button => {

                button.classList
                    .remove("active");


                if (
                    button.dataset.filter ===
                    filter
                ) {

                    button.classList
                        .add("active");

                }

            }
        );


    displayItems();

}



// ======================================================
// SORT
// ======================================================

function changeSort(value) {

    currentSort =
        value;


    displayItems();

}



// ======================================================
// SEARCH
// ======================================================

function searchItem() {

    const value =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();



    if (
        value === ""
    ) {

        clearSearch();

        return;

    }



    const resultsSection =
        document
            .getElementById(
                "searchResultsSection"
            );


    const resultsContainer =
        document
            .getElementById(
                "searchResults"
            );


    const itemsSection =
        document
            .getElementById(
                "itemsSection"
            );


    const controls =
        document
            .querySelector(
                ".controls-panel"
            );



    resultsSection
        .classList
        .remove("hidden");


    itemsSection
        .classList
        .add("hidden");


    controls
        .classList
        .add("hidden");



    resultsContainer.innerHTML =
        "";


    let current =
        itemList.head;


    const results = [];



    // LINKED LIST SEARCH

    while (
        current !== null
    ) {

        const item =
            current.item;


        const matches =

            item.name
                .toLowerCase()
                .includes(value)

            ||

            item.category
                .toLowerCase()
                .includes(value)

            ||

            item.location
                .toLowerCase()
                .includes(value)

            ||

            item.reportedBy
                .toLowerCase()
                .includes(value)

            ||

            item.contact
                .includes(value)

            ||

            item.type
                .toLowerCase()
                .includes(value);



        if (
            matches
        ) {

            results.push(
                item
            );

        }


        current =
            current.next;

    }



    // SORT SEARCH RESULTS

    results.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );



    document
        .getElementById(
            "searchBadge"
        )
        .innerText =
        results.length;



    if (
        results.length === 0
    ) {

        resultsContainer.innerHTML = `

            <p class="empty">
                ❌ No matching item found.
            </p>

        `;

        return;

    }



    results.forEach(
        item => {

            resultsContainer.appendChild(
                createCard(item)
            );

        }
    );

}



// ======================================================
// CLEAR SEARCH
// ======================================================

function clearSearch() {

    document
        .getElementById(
            "searchInput"
        )
        .value =
        "";


    document
        .getElementById(
            "searchResultsSection"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "itemsSection"
        )
        .classList
        .remove("hidden");


    document
        .querySelector(
            ".controls-panel"
        )
        .classList
        .remove("hidden");


    displayItems();

}



// ======================================================
// MARK RETURNED
// ======================================================

function markReturned(id) {

    let current =
        itemList.head;


    while (
        current !== null
    ) {

        if (
            current.item.id === id
        ) {

            current.item.status =
                "Returned";

            break;

        }


        current =
            current.next;

    }


    saveData();


    refreshCurrentView();

}



// ======================================================
// DELETE ITEM
// ======================================================

function deleteItem(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this item?"
        );


    if (
        !confirmed
    ) {

        return;

    }


    itemList.delete(id);


    saveData();


    refreshCurrentView();

}



// ======================================================
// REFRESH VIEW
// ======================================================

function refreshCurrentView() {

    const searchValue =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .trim();


    if (
        searchValue !== ""
    ) {

        searchItem();

    }

    else {

        displayItems();

    }

}



// ======================================================
// STATISTICS
// ======================================================

function updateStatistics() {

    let current =
        itemList.head;


    let total =
        0;


    let lost =
        0;


    let found =
        0;


    let returned =
        0;



    while (
        current !== null
    ) {

        const item =
            current.item;


        total++;


        if (
            item.type === "Lost"
        ) {

            lost++;

        }


        if (
            item.type === "Found"
        ) {

            found++;

        }


        if (
            item.status === "Returned"
        ) {

            returned++;

        }


        current =
            current.next;

    }



    document
        .getElementById(
            "totalCount"
        )
        .innerText =
        total;


    document
        .getElementById(
            "lostCount"
        )
        .innerText =
        lost;


    document
        .getElementById(
            "foundCount"
        )
        .innerText =
        found;


    document
        .getElementById(
            "returnedCount"
        )
        .innerText =
        returned;

}



// ======================================================
// LOCAL STORAGE
// ======================================================

function saveData() {

    const items =
        itemList.toArray();


    localStorage.setItem(
        "lostFoundItems",
        JSON.stringify(items)
    );

}



// ======================================================
// LOAD DATA
// ======================================================

function loadData() {

    const saved =
        localStorage.getItem(
            "lostFoundItems"
        );


    if (
        !saved
    ) {

        return;

    }


    try {

        const items =
            JSON.parse(saved);


        items.forEach(
            item => {

                itemList.add(item);

            }
        );

    }

    catch (error) {

        console.error(
            "Unable to load saved data:",
            error
        );

    }

}



// ======================================================
// LINKED LIST VISUALIZATION
// ======================================================

function updateLinkedListVisual() {

    const container =
        document
            .getElementById(
                "linkedListVisual"
            );


    container.innerHTML =
        "";


    let current =
        itemList.head;


    let count =
        0;



    while (
        current !== null &&
        count < 6
    ) {

        const node =
            document.createElement(
                "div"
            );


        node.className =
            "node";


        node.innerHTML = `

            <span>
                Node ${count + 1}
            </span>

            <strong>
                ${escapeHTML(
                    current.item.name
                )}
            </strong>

        `;


        container.appendChild(
            node
        );



        if (
            current.next !== null &&
            count < 5
        ) {

            const arrow =
                document.createElement(
                    "div"
                );


            arrow.className =
                "arrow";


            arrow.innerText =
                "→";


            container.appendChild(
                arrow
            );

        }


        current =
            current.next;


        count++;

    }



    // EMPTY LIST

    if (
        count === 0
    ) {

        container.innerHTML = `

            <span class="null-node">
                HEAD → NULL
            </span>

        `;

        return;

    }



    // FINAL ARROW

    const arrow =
        document.createElement(
            "div"
        );


    arrow.className =
        "arrow";


    arrow.innerText =
        "→";


    container.appendChild(
        arrow
    );



    const nullNode =
        document.createElement(
            "span"
        );


    nullNode.className =
        "null-node";


    nullNode.innerText =
        "NULL";


    container.appendChild(
        nullNode
    );

}



// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}



// ======================================================
// INITIALIZE
// ======================================================

loadData();

displayItems();