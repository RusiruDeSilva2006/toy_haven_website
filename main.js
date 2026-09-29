/* Product list is loaded from products.json */
let products = [];

//Basic reusable functions
   

/* Show a small message to the user */
function showMessage(message) {
    alert(message);
}

/* Find a product using its ID */
function getProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
    return null;
}

/* Get the cart from localStorage */
function getCart() {
    let cart = localStorage.getItem("toyHavenCart");

    if (cart) {
        return JSON.parse(cart);
    }

    return [];
}

/* Save the cart to localStorage */
function saveCart(cart) {
    localStorage.setItem("toyHavenCart", JSON.stringify(cart));
    updateCartCount();
}

/* Get the wishlist from localStorage */
function getWishlist() {
    let wishlist = localStorage.getItem("toyHavenWishlist");

    if (wishlist) {
        return JSON.parse(wishlist);
    }

    return [];
}

/* Save the wishlist to localStorage */
function saveWishlist(wishlist) {
    localStorage.setItem("toyHavenWishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

/* Add one product to the cart */
function addToCart(productId) {
    let cart = getCart();
    let found = false;

    /* Check whether the product is already in the cart */
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
        }
    }

    /* If it is a new product, add it */
    if (!found) {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCart(cart);
    showMessage("Product added to your cart.");
}

/* Add or remove a product from wishlist */
function addToWishlist(productId) {
    let wishlist = getWishlist();
    let foundIndex = -1;

    /* Check both old string IDs and saved objects */
    for (let i = 0; i < wishlist.length; i++) {
        let savedId = wishlist[i].id ? wishlist[i].id : wishlist[i];

        if (savedId === productId) {
            foundIndex = i;
        }
    }

    if (foundIndex === -1) {
        wishlist.push({
            id: productId,
            status: "Interested"
        });
        showMessage("Product added to your wishlist.");
    } else {
        wishlist.splice(foundIndex, 1);
        showMessage("Product removed from your wishlist.");
    }

    saveWishlist(wishlist);
}

/* Update number shown beside Cart */
function updateCartCount() {
    let cart = getCart();
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].quantity;
    }

    let count = document.getElementById("cart-count");

    if (count) {
        count.textContent = total;
    }
}

/* Update number shown beside Wishlist */
function updateWishlistCount() {
    let wishlist = getWishlist();
    let count = document.getElementById("wishlist-count");

    if (count) {
        count.textContent = wishlist.length;
    }
}

/* Header / mobile menu */

function setupMenu() {
    let menuButton = document.getElementById("menu-button");
    let navigation = document.getElementById("customer-nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show");
        });
    }
}

/* Product card */

function createProductCard(product) {
    let card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML =
        '<img src="' + product.image + '" alt="' + product.name + '">' +
        '<div class="product-info">' +
        '<span class="category">' + product.category + '</span>' +
        '<h3>' + product.name + '</h3>' +
        '<p>' + product.description + '</p>' +
        '<span class="price">$' + product.price.toFixed(2) + '</span>' +
        '<div class="product-actions">' +
        '<button class="button details-button">Details</button>' +
        '<button class="button add-cart">Add to Cart</button>' +
        '<button class="button wishlist-button add-wishlist">Wishlist</button>' +
        '</div>' +
        '</div>';

    /* Add to cart button */
    card.getElementsByClassName("add-cart")[0].addEventListener("click", function () {
        addToCart(product.id);
    });

    /* Add to wishlist button */
    card.getElementsByClassName("add-wishlist")[0].addEventListener("click", function () {
        addToWishlist(product.id);
    });

    /* Open a simple product details modal */
    card.getElementsByClassName("details-button")[0].addEventListener("click", function () {
        showProductDetails(product);
    });

    return card;
}

/* Show a simple product details modal */
function showProductDetails(product) {
    let oldModal = document.getElementById("product-modal");

    if (oldModal) {
        oldModal.remove();
    }

    let modal = document.createElement("div");
    modal.id = "product-modal";
    modal.className = "product-modal";

    modal.innerHTML =
        '<div class="modal-box">' +
        '<button class="modal-close" id="close-modal">X</button>' +
        '<img src="' + product.image + '" alt="' + product.name + '">' +
        '<p class="category">' + product.category + '</p>' +
        '<h2>' + product.name + '</h2>' +
        '<p>' + product.description + '</p>' +
        '<strong class="modal-price">$' + product.price.toFixed(2) + '</strong>' +
        '<br><button class="button modal-cart">Add to Cart</button>' +
        '</div>';

    document.body.appendChild(modal);

    document.getElementById("close-modal").addEventListener("click", function () {
        modal.remove();
    });

    document.getElementsByClassName("modal-cart")[0].addEventListener("click", function () {
        addToCart(product.id);
        modal.remove();
    });
}

/* Home page*/

let bannerNumber = 0;

function setupHomePage() {
    let hero = document.getElementById("hero-slider");
    let featured = document.getElementById("featured-products");

    if (!hero) {
        return;
    }

    /* The four uploaded banner images are used here */
    let banners = [
        {
            title: "Collect Your Favourite Figurines",
            text: "Discover superhero figures for your collection.",
            image: "images/banner-figurines.jpg",
            category: "Figurines"
        },
        {
            title: "Fun Toys for Everyone",
            text: "Find creative and enjoyable toys.",
            image: "images/banner-toys.jpg",
            category: "Toys"
        },
        {
            title: "Game Night Starts Here",
            text: "Choose a board game and enjoy time with friends.",
            image: "images/banner-boardgames.jpg",
            category: "Board Games"
        },
        {
            title: "Build Your Diecast Collection",
            text: "Explore small cars made for collectors.",
            image: "images/banner-diecast.jpg",
            category: "Diecast Cars"
        }
    ];

    function showBanner() {
        let banner = banners[bannerNumber];

        hero.innerHTML =
            '<div class="hero-slide">' +
            '<div class="hero-slide-text">' +
            '<p class="eyebrow">' + banner.category + '</p>' +
            '<h2>' + banner.title + '</h2>' +
            '<p>' + banner.text + '</p>' +
            '<a class="button" href="products.html?category=' + encodeURIComponent(banner.category) + '">Shop Now</a>' +
            '</div>' +
            '<div class="hero-slide-media">' +
            '<img src="' + banner.image + '" alt="' + banner.title + '">' +
            '</div>' +
            '</div>' +
            '<div class="hero-dots">' +
            '<button class="hero-dot active" id="banner-dot-1" aria-label="Show banner 1">1</button>' +
            '<button class="hero-dot" id="banner-dot-2" aria-label="Show banner 2">2</button>' +
            '<button class="hero-dot" id="banner-dot-3" aria-label="Show banner 3">3</button>' +
            '<button class="hero-dot" id="banner-dot-4" aria-label="Show banner 4">4</button>' +
            '</div>';

        document.getElementById("banner-dot-1").addEventListener("click", function () {
            bannerNumber = 0;
            showBanner();
        });

        document.getElementById("banner-dot-2").addEventListener("click", function () {
            bannerNumber = 1;
            showBanner();
        });

        document.getElementById("banner-dot-3").addEventListener("click", function () {
            bannerNumber = 2;
            showBanner();
        });

        document.getElementById("banner-dot-4").addEventListener("click", function () {
            bannerNumber = 3;
            showBanner();
        });
    }

    showBanner();

    /* Automatically change banner every 5 seconds */
    setInterval(function () {
        bannerNumber = bannerNumber + 1;

        if (bannerNumber === banners.length) {
            bannerNumber = 0;
        }

        showBanner();
    }, 5000);

    /* Show four featured products */
    let featuredIds = ["F001", "T002", "B002", "D001"];

    for (let i = 0; i < featuredIds.length; i++) {
        let product = getProduct(featuredIds[i]);

        if (product) {
            featured.appendChild(createProductCard(product));
        }
    }
}

/* Products page */

function setupProductsPage() {
    let productList = document.getElementById("product-list");

    if (!productList) {
        return;
    }

    let searchBox = document.getElementById("search-box");
    let categoryFilter = document.getElementById("category-filter");
    let clearButton = document.getElementById("clear-filter");
    let productCount = document.getElementById("product-count");

    function displayProducts() {
        let searchText = searchBox.value.toLowerCase();
        let category = categoryFilter.value;

        productList.innerHTML = "";
        let matched = 0;

        for (let i = 0; i < products.length; i++) {
            let product = products[i];

            let nameMatches = product.name.toLowerCase().includes(searchText);
            let categoryMatches = category === "All" || product.category === category;

            if (nameMatches && categoryMatches) {
                productList.appendChild(createProductCard(product));
                matched++;
            }
        }

        productCount.textContent = matched + " product(s) found.";
    }

    searchBox.addEventListener("input", displayProducts);
    categoryFilter.addEventListener("change", displayProducts);

    clearButton.addEventListener("click", function () {
        searchBox.value = "";
        categoryFilter.value = "All";
        displayProducts();
    });

    /* Read a category from the URL if Home page sends one */
    let parameters = new URLSearchParams(window.location.search);
    let categoryFromURL = parameters.get("category");

    if (categoryFromURL) {
        categoryFilter.value = categoryFromURL;
    }

    displayProducts();
}

/* Cart page */

function setupCartPage() {
    let cartItems = document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }

    let clearButton = document.getElementById("clear-cart");

    function displayCart() {
        let cart = getCart();
        cartItems.innerHTML = "";

        let subtotal = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty. <a href='products.html'>Shop now</a>.</p>";
        }

        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            let product = getProduct(item.id);

            if (product) {
                let itemTotal = product.price * item.quantity;
                subtotal = subtotal + itemTotal;

                let row = document.createElement("div");
                row.className = "cart-row";

                row.innerHTML =
                    '<img src="' + product.image + '" alt="' + product.name + '">' +
                    '<div><h3>' + product.name + '</h3><p>' + product.category + '</p></div>' +
                    '<div class="quantity">' +
                    '<button class="minus">-</button> ' +
                    '<span>' + item.quantity + '</span> ' +
                    '<button class="plus">+</button>' +
                    '</div>' +
                    '<strong>$' + itemTotal.toFixed(2) + '</strong>' +
                    '<button class="remove-button">Remove</button>';

                /* Increase quantity */
                row.getElementsByClassName("plus")[0].addEventListener("click", function () {
                    item.quantity++;
                    saveCart(cart);
                    displayCart();
                });

                /* Decrease quantity */
                row.getElementsByClassName("minus")[0].addEventListener("click", function () {
                    item.quantity--;

                    if (item.quantity <= 0) {
                        cart.splice(i, 1);
                    }

                    saveCart(cart);
                    displayCart();
                });

                /* Remove item */
                row.getElementsByClassName("remove-button")[0].addEventListener("click", function () {
                    cart.splice(i, 1);
                    saveCart(cart);
                    displayCart();
                });

                cartItems.appendChild(row);
            }
        }

        let shipping = cart.length > 0 ? 5 : 0;
        let total = subtotal + shipping;

        document.getElementById("cart-subtotal").textContent = "$" + subtotal.toFixed(2);
        document.getElementById("cart-shipping").textContent = "$" + shipping.toFixed(2);
        document.getElementById("cart-total").textContent = "$" + total.toFixed(2);

        if (cart.length === 0) {
            document.getElementById("checkout-button").style.pointerEvents = "none";
            document.getElementById("checkout-button").style.opacity = "0.5";
        } else {
            document.getElementById("checkout-button").style.pointerEvents = "auto";
            document.getElementById("checkout-button").style.opacity = "1";
        }
    }

    clearButton.addEventListener("click", function () {
        localStorage.removeItem("toyHavenCart");
        displayCart();
        updateCartCount();
    });

    displayCart();
}

/* Checkout page */

function setupCheckoutPage() {
    let form = document.getElementById("checkout-form");

    if (!form) {
        return;
    }

    let cart = getCart();
    let summary = document.getElementById("checkout-summary");
    let cardDetails = document.getElementById("card-details");
    let paymentButtons = form.getElementsByClassName("radio-label");

    /* Show order summary */
    let subtotal = 0;
    summary.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        let product = getProduct(cart[i].id);

        if (product) {
            let itemTotal = product.price * cart[i].quantity;
            subtotal = subtotal + itemTotal;

            let item = document.createElement("p");
            item.className = "order-item";
            item.innerHTML =
                "<span>" + cart[i].quantity + " x " + product.name + "</span>" +
                "<span>$" + itemTotal.toFixed(2) + "</span>";

            summary.appendChild(item);
        }
    }

    let shipping = cart.length > 0 ? 5 : 0;
    let total = subtotal + shipping;

    let totalLine = document.createElement("p");
    totalLine.className = "order-total";
    totalLine.innerHTML = "<span>Total</span><span>$" + total.toFixed(2) + "</span>";
    summary.appendChild(totalLine);

    /* Show or hide card field */
    let paymentOptions = form.getElementsByName("payment");

    for (let i = 0; i < paymentOptions.length; i++) {
        paymentOptions[i].addEventListener("change", function () {
            if (paymentOptions[i].value === "Card") {
                cardDetails.style.display = "block";
            } else {
                cardDetails.style.display = "none";
            }
        });
    }

    /* Submit checkout */
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("full-name").value.trim();
        let email = document.getElementById("email").value.trim();
        let address = document.getElementById("address").value.trim();
        let cardNumber = document.getElementById("card-number").value.trim();
        let selectedPayment = "Card";

        for (let i = 0; i < paymentOptions.length; i++) {
            if (paymentOptions[i].checked) {
                selectedPayment = paymentOptions[i].value;
            }
        }

        let valid = true;

        document.getElementById("name-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("address-error").textContent = "";
        document.getElementById("card-error").textContent = "";

        if (name === "") {
            document.getElementById("name-error").textContent = "Please enter your name.";
            valid = false;
        }

        if (!email.includes("@") || !email.includes(".")) {
            document.getElementById("email-error").textContent = "Please enter a valid email.";
            valid = false;
        }

        if (address === "") {
            document.getElementById("address-error").textContent = "Please enter your address.";
            valid = false;
        }

        if (selectedPayment === "Card" && cardNumber.length < 12) {
            document.getElementById("card-error").textContent = "Enter a valid card number.";
            valid = false;
        }

        if (!valid) {
            return;
        }

        /* Save order history in localStorage */
        let orders = localStorage.getItem("toyHavenOrders");

        if (orders) {
            orders = JSON.parse(orders);
        } else {
            orders = [];
        }

        orders.push({
            name: name,
            email: email,
            total: total,
            date: new Date().toLocaleString()
        });

        localStorage.setItem("toyHavenOrders", JSON.stringify(orders));

        /* Clear the cart after successful checkout */
        localStorage.removeItem("toyHavenCart");

        document.getElementById("checkout-message").textContent =
            "Order placed successfully! Thank you, " + name + ".";

        form.reset();
        cardDetails.style.display = "block";
        updateCartCount();
    });
}

/* Wishlist page*/

function setupWishlistPage() {
    let wishlistList = document.getElementById("wishlist-list");

    if (!wishlistList) {
        return;
    }

    let currentStatus = "All";

    function displayWishlist() {
        let wishlist = getWishlist();
        wishlistList.innerHTML = "";

        let shown = 0;

        for (let i = 0; i < wishlist.length; i++) {
            let product = getProduct(wishlist[i].id);

            /* Keep old/simple wishlist IDs working too */
            let productId = wishlist[i].id ? wishlist[i].id : wishlist[i];
            product = getProduct(productId);

            if (product) {
                let status = wishlist[i].status ? wishlist[i].status : "Interested";

                if (currentStatus === "All" || currentStatus === status) {
                    let card = document.createElement("article");
                    card.className = "product-card";

                    card.innerHTML =
                        '<img src="' + product.image + '" alt="' + product.name + '">' +
                        '<div class="product-info">' +
                        '<span class="category">' + product.category + '</span>' +
                        '<h3>' + product.name + '</h3>' +
                        '<span class="price">$' + product.price.toFixed(2) + '</span>' +
                        '<p>Status: <strong>' + status + '</strong></p>' +
                        '<button class="button remove-wish">Remove</button>' +
                        '<div>' +
                        '<button class="collection-status" data-status="Interested">Interested</button>' +
                        '<button class="collection-status" data-status="Owned">Owned</button>' +
                        '<button class="collection-status" data-status="Not Interested">Not Interested</button>' +
                        '</div>' +
                        '</div>';

                    /* Remove from wishlist */
                    card.getElementsByClassName("remove-wish")[0].addEventListener("click", function () {
                        wishlist.splice(i, 1);
                        saveWishlist(wishlist);
                        displayWishlist();
                    });

                    /* Change wishlist status */
                    let statusButtons = card.getElementsByClassName("collection-status");

                    for (let j = 0; j < statusButtons.length; j++) {
                        statusButtons[j].addEventListener("click", function () {
                            wishlist[i] = {
                                id: product.id,
                                status: statusButtons[j].getAttribute("data-status")
                            };

                            saveWishlist(wishlist);
                            displayWishlist();
                        });
                    }

                    wishlistList.appendChild(card);
                    shown++;
                }
            }
        }

        if (shown === 0) {
            wishlistList.innerHTML =
                "<p>Your wishlist is empty. <a href='products.html'>Add some products</a>.</p>";
        }
    }

    let filters = document.getElementsByClassName("status-filter");

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener("click", function () {
            for (let j = 0; j < filters.length; j++) {
                filters[j].classList.remove("active");
            }

            filters[i].classList.add("active");
            currentStatus = filters[i].getAttribute("data-status");
            displayWishlist();
        });
    }

    displayWishlist();
}

/* Feedback and FAQ page*/

function setupFeedbackPage() {
    let form = document.getElementById("feedback-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("feedback-name").value.trim();
        let email = document.getElementById("feedback-email").value.trim();
        let message = document.getElementById("feedback-message").value.trim();

        let valid = true;

        document.getElementById("feedback-name-error").textContent = "";
        document.getElementById("feedback-email-error").textContent = "";
        document.getElementById("feedback-message-error").textContent = "";

        if (name === "") {
            document.getElementById("feedback-name-error").textContent = "Enter your name.";
            valid = false;
        }

        if (!email.includes("@") || !email.includes(".")) {
            document.getElementById("feedback-email-error").textContent = "Enter a valid email.";
            valid = false;
        }

        if (message === "") {
            document.getElementById("feedback-message-error").textContent = "Enter your message.";
            valid = false;
        }

        if (!valid) {
            return;
        }

        /* Store feedback in localStorage */
        let feedback = localStorage.getItem("toyHavenFeedback");

        if (feedback) {
            feedback = JSON.parse(feedback);
        } else {
            feedback = [];
        }

        feedback.push({
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleString()
        });

        localStorage.setItem("toyHavenFeedback", JSON.stringify(feedback));

        document.getElementById("feedback-success").textContent =
            "Thank you! Your feedback has been submitted.";

        form.reset();
    });

    /* Simple FAQ accordion */
    let questions = document.getElementsByClassName("faq-question");

    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener("click", function () {
            let answer = questions[i].nextElementSibling;
            answer.classList.toggle("show");
        });
    }
}

/* Simple scroll reveal effect */
function setupScrollReveal() {
    let elements = document.getElementsByClassName("reveal");

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("visible");
    }
}

/* Newsletter */

function setupNewsletter() {
    let form = document.getElementById("newsletter-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("newsletter-email").value.trim();

        if (!email.includes("@") || !email.includes(".")) {
            document.getElementById("newsletter-message").textContent =
                "Please enter a valid email.";
            return;
        }

        let subscribers = localStorage.getItem("toyHavenNewsletter");

        if (subscribers) {
            subscribers = JSON.parse(subscribers);
        } else {
            subscribers = [];
        }

        subscribers.push(email);
        localStorage.setItem("toyHavenNewsletter", JSON.stringify(subscribers));

        document.getElementById("newsletter-message").textContent =
            "Thank you for subscribing!";
        form.reset();
    });
}

/* Load products.json and start the website */

function loadProducts() {
    fetch("products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            products = data;

            /* Start functions after products are loaded */
            setupHomePage();
            setupProductsPage();
            setupCartPage();
            setupCheckoutPage();
            setupWishlistPage();
            setupFeedbackPage();
        })
        .catch(function () {
            showMessage("Products could not be loaded. Please use Live Server.");
        });
}

/* Run common functions when the page opens */
document.addEventListener("DOMContentLoaded", function () {
    setupMenu();
    updateCartCount();
    updateWishlistCount();
    setupNewsletter();
    setupScrollReveal();
    loadProducts();
});
