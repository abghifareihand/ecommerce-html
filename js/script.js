const productsList = [
    { id: 1, name: 'ROLAROLA DRESS', price: 250000, image: 'assets/img/img-product-1.png', description: 'Dress bergaya kasual dengan potongan longgar yang nyaman untuk dipakai seharian.', size: 'S M L' },
    { id: 2, name: 'JULIUS SHIRT', price: 260000, image: 'assets/img/img-product-2.png', description: 'Kemeja lengan panjang dengan desain simpel dan bahan adem yang cocok untuk tampilan formal maupun santai.', size: 'M L XL' },
    { id: 3, name: 'CARRIERE DRESS', price: 270000, image: 'assets/img/img-product-3.png', description: 'Gaun elegan dengan siluet ramping yang menonjolkan sisi feminin Anda.', size: 'S M L' },
    { id: 4, name: 'STELLA SKIRT', price: 280000, image: 'assets/img/img-product-4.png', description: 'Rok A-line dengan detail lipit yang manis dan cocok dipadukan dengan atasan apa saja.', size: 'S M' },
    { id: 5, name: 'ELLE KNIT TOP', price: 290000, image: 'assets/img/img-product-5.png', description: 'Atasan rajut lembut dengan potongan crop yang stylish untuk gaya kasual kekinian.', size: 'M L' },
    { id: 6, name: 'SENYA TUNIC', price: 300000, image: 'assets/img/img-product-6.png', description: 'Tunik panjang dengan motif lembut yang cocok dikenakan dengan celana atau legging.', size: 'S M L' },
    { id: 7, name: 'ELOISE BLAZER', price: 310000, image: 'assets/img/img-product-7.png', description: 'Blazer formal dengan desain modern, cocok untuk ke kantor atau acara resmi.', size: 'M L XL' },
    { id: 8, name: 'REANNA SHIRT', price: 320000, image: 'assets/img/img-product-8.png', description: 'Kemeja lengan pendek dengan bahan katun ringan, cocok untuk tampilan sehari-hari.', size: 'S M' },
    { id: 9, name: 'INHANNA SKIRT', price: 330000, image: 'assets/img/img-product-9.png', description: 'Rok midi dengan detail lipit halus, memberikan kesan anggun dan feminin.', size: 'M L' },
    { id: 10, name: 'ELINA DRESS', price: 340000, image: 'assets/img/img-product-10.png', description: 'Dress dengan motif floral yang cantik, cocok untuk acara semi-formal atau santai.', size: 'S M L' },
    { id: 11, name: 'LEARONA DRESS', price: 350000, image: 'assets/img/img-product-11.png', description: 'Gaun panjang dengan aksen ruffle dan bahan flowy yang memberikan kesan elegan.', size: 'M L' },
    { id: 12, name: 'HEYNA PARKA', price: 360000, image: 'assets/img/img-product-12.png', description: 'Jaket parka dengan bahan tahan angin, ideal untuk musim hujan atau udara dingin.', size: 'L XL' },
    { id: 13, name: 'CANLY TOP', price: 370000, image: 'assets/img/img-product-13.png', description: 'Atasan simpel dengan potongan boxy yang cocok dipadukan dengan celana jeans.', size: 'S M L' },
    { id: 14, name: 'DEAR DRESS', price: 380000, image: 'assets/img/img-product-14.png', description: 'Dress minimalis dengan warna netral yang bisa digunakan untuk berbagai kesempatan.', size: 'M L XL' },
    { id: 15, name: 'NAVIEL OUTER', price: 390000, image: 'assets/img/img-product-15.png', description: 'Outer ringan dengan detail simpel yang bisa mempermanis gaya harian Anda.', size: 'All Size' },
    { id: 16, name: 'EVERYDAY SHIRT', price: 400000, image: 'assets/img/img-product-16.png', description: 'Kemeja serbaguna untuk aktivitas harian dengan desain clean dan bahan nyaman.', size: 'S M L XL' },
];



function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        localStorage.setItem('cart', JSON.stringify([]));
        window.location.href = 'home.html';
    } else {
        alert('Enter username');
    }
}

function loadHome() {
    const user = localStorage.getItem('username');
    const userSpan = document.getElementById('user');
    const welcomeHeader = userSpan.parentElement;

    if (user) {
        userSpan.textContent = user;
        welcomeHeader.style.display = '';
    } else {
        userSpan.textContent = '';
        welcomeHeader.style.display = 'none';
    }

    const productDiv = document.getElementById('products');
    productDiv.innerHTML = '';
    productDiv.className = 'product-grid';

    productsList.forEach(p => {
        const el = document.createElement('div');
        el.className = 'product-item';
        el.innerHTML = `
            <a href="detail.html?id=${p.id}" style="text-decoration:none;">
                <img src="${p.image}" alt="${p.name}" />
                <div class="product-name">${p.name}</div>
                <div class="product-price">${formatRupiah(p.price)}</div>
                <div class="size-overlay">${p.size}</div>
            </a>
        `;
        productDiv.appendChild(el);
    });
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


function loadDetail() {
    const id = parseInt(getQueryParam('id'));
    if (!id) return window.location.href = 'home.html';

    const product = productsList.find(p => p.id === id);
    if (!product) return window.location.href = 'home.html';

    const detailDiv = document.getElementById('productDetail');

    // Gambar utama ambil dari product.image
    const mainImageSrc = product.image;

    // Buat thumbnails dari gambar statis, misal kamu punya 5 thumbnails
    const staticThumbnails = [
        'assets/img/img-thumb-1.png',
        'assets/img/img-thumb-2.png',
        'assets/img/img-thumb-3.png',
        'assets/img/img-thumb-4.png',
    ];

    // Buat HTML thumbnails, yang pertama active
    const thumbnailsHtml = staticThumbnails
        .map((img, idx) => `<img src="${img}" alt="Thumbnail ${idx + 1}" ${idx === 0 ? 'class="active"' : ''}>`)
        .join('');


    // Color options static
    const colorOptions = [
        { image: 'assets/img/img-color-1.png', label: 'Black' },
        { image: 'assets/img/img-color-2.png', label: 'Vanilla' },
        { image: 'assets/img/img-color-3.png', label: 'Sand' },
        { image: 'assets/img/img-color-4.png', label: 'Seaweed' },
        { image: 'assets/img/img-color-5.png', label: 'Charcoal' },
    ];

    const colorsHtml = colorOptions
        .map(color => `
      <div class="color-option">
        <img src="${color.image}" alt="Color ${color.label}">
        <span>${color.label}</span>
      </div>
    `)
        .join('');


    detailDiv.innerHTML = `
      <div class="left">
        <img id="mainImage" src="${mainImageSrc}" alt="${product.name}" />
        <div class="thumbnails">${thumbnailsHtml}</div>
      </div>
      <div class="right">
        <h2>${product.name}</h2>
        <h3>${formatRupiah(product.price)}</h3>

        <div class="colors">
          <p><strong>Colour</strong></p>
          <div class="color-list">${colorsHtml}</div>
        </div>

        <div class="info-block">
          <p class="label">Description</p>
          <p class="value">${product.description}</p>
        </div>

        <div class="product-details">
           <p><strong>Product Details</strong></p>
           <p><strong>${product.size.toUpperCase()}<strong></p>
           <div class="detail-row"><span class="label">Lingkar Dada</span><span class="value">: 60 - 110 cm</span></div>
           <div class="detail-row"><span class="label">Panjang Baju</span><span class="value">: 120 cm</span></div>
           <div class="detail-row"><span class="label">Panjang Lengan</span><span class="value">: 10 cm</span></div>
           <div class="detail-row"><span class="label">Lingkar Ketiak</span><span class="value">: 32 - 40 cm</span></div>
        </div>
        <div class="buttons">
          <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;

    // Tambah event listener buat klik thumbnails supaya update gambar utama
    const mainImage = document.getElementById('mainImage');
    const thumbnails = detailDiv.querySelectorAll('.thumbnails img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // mainImage.src = thumb.src;

            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    updateCartCount();
}



function addToCart(id) {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(c => c.id === id);

    if (item) {
        item.qty += 1;
        productName = item.name;
    } else {
        const product = productsList.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function buyNow(id) {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(c => c.id === id);

    if (item) {
        item.qty += 1;
    } else {
        const product = productsList.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}




function loadCart() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }
    const cartDiv = document.getElementById('cart');
    const totalPriceSpan = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        const el = document.createElement('div');
        el.classList.add('cart-item');
        el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price-qty">${formatRupiah(item.price)} x ${item.qty}</div>
        </div>
        <div class="cart-item-actions">
          <button class="btn-plus" onclick='changeQty(${index}, 1)'></button>
          <button class="btn-minus" onclick='changeQty(${index}, -1)'></button>
        </div>
      `;
        cartDiv.appendChild(el);
    });

    totalPriceSpan.textContent = formatRupiah(total);
    updateCartCount();
}

// Fungsi baru untuk update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = totalQty;
    document.getElementById('cart-count-bag').textContent = totalQty;
}

function changeQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function checkout() {
    window.location.href = 'payment.html';
}


function loadPayment() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const paymentItemsDiv = document.getElementById('paymentItemsList');

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        const itemEl = document.createElement('div');

        itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-info">
          <div>${item.name}</div>
          <div>${formatRupiah(item.price)} x ${item.qty}</div>
        </div>
      `;
        itemEl.classList.add('item-card');

        paymentItemsDiv.appendChild(itemEl);
    });

    const shippingFee = 10000;
    const total = subtotal + shippingFee;

    document.getElementById('subtotalAmount').textContent = formatRupiah(subtotal);
    document.getElementById('shippingFee').textContent = formatRupiah(shippingFee);
    document.getElementById('totalAmount').textContent = formatRupiah(total);
    updateCartCount();
}

function pay() {
    const methodRadios = document.getElementsByName('paymentMethodRadio');
    let method = null;
    for (const radio of methodRadios) {
        if (radio.checked) {
            method = radio.value;
            break;
        }
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Keranjang kosong, tidak ada yang dibayar.');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shippingFee = 10000;
    const total = subtotal + shippingFee;

    const username = localStorage.getItem('username').toUpperCase(); // ambil username

    // Simpan order ke history
    const order = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        paymentMethod: method,
        status: 'Confirmed',
        username: username,
        subtotal,
        shippingFee,
        total,
    };

    let history = JSON.parse(localStorage.getItem('orderHistory')) || [];
    history.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(history));

    alert(`Anda selesai order dengan metode ${method}`);

    // Clear cart setelah bayar
    localStorage.setItem('cart', JSON.stringify([]));

    // Redirect ke halaman history order
    window.location.href = 'order.html';
}



let currentFilter = 'all'; // tab aktif

function filterOrders(status, el) {
    // Update filter status (sesuaikan dengan implementasi kamu)
    currentFilter = status;
    loadOrderHistory();

    // Hapus class active dari semua tombol
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Tambah class active ke tombol yang diklik
    el.classList.add('active');
}



function updateOrderStatus(orderId, newStatus) {
    let history = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const index = history.findIndex(o => o.id === orderId);
    if (index !== -1) {
        history[index].status = newStatus;
        localStorage.setItem('orderHistory', JSON.stringify(history));

        // Jangan update currentFilter, agar tetap di tab saat ini
        // currentFilter = newStatus; 

        // Jangan update tab active class juga kalau tetap ingin di tab lama

        loadOrderHistory();
    }
}



function loadOrderHistory() {
    const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const historyDiv = document.getElementById('orderHistory');
    historyDiv.innerHTML = '';

    const filtered = currentFilter === 'all'
        ? history
        : history.filter(order => order.status === currentFilter);

    if (filtered.length === 0) {
        const statusText = currentFilter === 'all' ? '' : ` dengan status ${currentFilter}`;
        historyDiv.innerHTML = `<p class="empty-message">Tidak ada order${statusText}.</p>`;
        return;
    }



    filtered.forEach(order => {
        const orderEl = document.createElement('div');
        orderEl.className = 'order-item';

        orderEl.innerHTML = `
            <div class="order-header">
                <div class="order-id">Order ID: ${order.username}${order.id}</div>
                <div class="order-status">
                    <select onchange="updateOrderStatus(${order.id}, this.value)" value="${order.status}">
                       ${["Confirmed", "Packed", "Shipped", "Delivered", "Returned", "Cancelled"]
                .map(status => `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`)
                .join('')}
                    </select>
                </div>
            </div>
            
            <div class="order-subheader">
                <div class="order-date">Tanggal: ${order.date}</div>
                <div class="order-payment">Metode Pembayaran: ${order.paymentMethod}</div>
            </div>
            
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-detail">
                        <img src="${item.image}" alt="${item.name}" class="product-image" />
                        <div class="product-info">
                            <div class="product-name">${item.name}</div>
                            <div class="product-qty">Qty: ${item.qty}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-footer">
                <div class="total-text">Total:</div>
                <div class="total-price">${formatRupiah(order.total)}</div>
                <button class="track-btn" onclick="trackOrder(${order.id})">Track</button>
                <img src="assets/svg/ic-dots.svg" alt="Track Icon" class="track-icon" />
            </div>
        `;
        historyDiv.appendChild(orderEl);
    });
}



function checkLogin() {
    const user = localStorage.getItem('username');
    const loginContainer = document.getElementById('loginContainer');
    const userContainer = document.getElementById('userContainer');
    const userDisplay = document.getElementById('loggedInUser');

    if (user) {
        loginContainer.style.display = 'none';
        userContainer.style.display = 'block';
        userDisplay.textContent = user;
    } else {
        loginContainer.style.display = 'block';
        userContainer.style.display = 'none';
    }
}

function logout() {
    // Hapus session/login data
    localStorage.removeItem('username');
    localStorage.removeItem('cart');
    // Jika mau hapus order history habis logout uncomment ini
    localStorage.removeItem('orderHistory');

    // Arahkan ke halaman index.html (halaman awal)
    window.location.href = 'index.html';
}







// Formatter
function formatRupiah(angka) {
    return 'Rp. ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
