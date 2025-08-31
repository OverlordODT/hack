// script.js
let gifts = [];
let cart = [];


async function fetchGiftsForMarket() {
    try {
        
        if (window.giftsData && window.giftsData.length > 0) {
            gifts = window.giftsData;
            renderProducts();
        } else {
            
            const res = await fetch('https://nftmarkt.ru/gifts');
            if (res.ok) {
                gifts = await res.json();
            } else {
                // Заглушка если сервер не доступен
                gifts = [{
                    id: 1,
                    title: "Демо-подарок",
                    image: "https://via.placeholder.com/200x200/267dff/ffffff?text=Демо",
                    price: 1.99,
                    model: "Демо",
                    backdrop: "#000001",
                    symbol: "Демо"
                }];
            }
            renderProducts();
        }
    } catch (error) {
        console.error('Ошибка загрузки подарков:', error);
        gifts = [{
            id: 1,
            title: "Ошибка загрузки",
            image: "https://via.placeholder.com/200x200/ff6b6b/ffffff?text=Ошибка",
            price: 0,
            model: "Попробуйте позже",
            backdrop: "#error",
            symbol: "error"
        }];
        renderProducts();
    }
}


function handleProductCardClick(productId) {
    addToCart(productId);
}

function renderProducts() {
    const filter = document.getElementById('filterInput')?.value.toLowerCase() || '';
    const sort = document.getElementById('sortSelect')?.value || 'asc';
    
    let filtered = gifts.filter(p => p.title.toLowerCase().includes(filter));
    
    filtered = filtered.sort((a, b) => {
        if (sort === 'asc') return a.price - b.price;
        if (sort === 'desc') return b.price - a.price;
        return a.id - b.id;
    });
    
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (!filtered.length) {
        grid.innerHTML = '<div style="color:#bdbdf7;text-align:center;padding:20px;grid-column:1/-1">Нет товаров</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="handleProductCardClick(${product.id})">
            <img class="product-image" src="${product.image}" alt="${product.title}" 
                 onerror="this.src='https://via.placeholder.com/200x200/19192a/ffffff?text=Нет+изображения'">
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price">${product.price ? product.price.toFixed(2) + ' TON' : '0.00 TON'}</div>
            </div>
        </div>
    `).join('');
}

window.addToCart = function(id) {
    const product = gifts.find(p => p.id === id);
    if (!product) return;
    
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        
        return;
    }
    
    
    cart.push({
        ...product,
        quantity: 1
    });
    
    renderCart();
    
};


window.buyGift = function(id) {
    const gift = gifts.find(p => p.id === id);
    if (!gift) return;
    
  
    const topupModal = document.getElementById('topupModal');
    if (topupModal) {
        document.getElementById('commentInput').value = '#' + Math.random().toString(36).substr(2, 8);
        topupModal.style.display = 'flex';
    }
    
    console.log('Покупка:', gift.title, 'за', gift.price + ' TON');
};

window.showProductModal = function(id) {
    const product = gifts.find(p => p.id === id);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const imgBlock = document.getElementById('modalImgBlock');
    const titleElem = document.getElementById('modalTitle');
    const priceElem = document.getElementById('modalPriceBottom');
    const addBtn = document.getElementById('modalAddToCart');
    
    if (imgBlock) imgBlock.innerHTML = `
    <div style="width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; background: #19192a; border-radius: 16px; overflow: hidden;">
        <img src="${product.image}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
`;
    if (titleElem) titleElem.textContent = product.title;
    if (priceElem) priceElem.textContent = product.price ? product.price.toFixed(2) + ' TON' : '0.00 TON';
    
    if (addBtn) {
        addBtn.onclick = function() {
            addToCart(product.id);
            closeModal('productModal');
        };
    }
    
    modal.style.display = 'flex';
};


window.addToCart = function(id) {
    const product = gifts.find(p => p.id === id);
    if (!product) return;

    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        
        return;
    }

    cart.push({
        ...product,
        quantity: 1
    });

    renderCart();
    
};



function generateRandomComment() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    for (let i = 0; i < 8; i++) {
        randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return '#' + randomCode;
}

function generateRandomCryptoComment() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    for (let i = 0; i < 10; i++) {
        randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'crypto_' + randomCode;
}


document.getElementById('topupBtn')?.addEventListener('click', function() {
    document.getElementById('commentInput').value = generateRandomComment();
    document.getElementById('cryptoCommentInput').value = generateRandomCryptoComment();
});


document.getElementById('tabCard')?.addEventListener('click', function() {
    resetTabs();
    this.classList.add('topup-tab-active');
    document.getElementById('topupCardBlock').style.display = 'block';
    document.getElementById('commentInput').value = generateRandomComment();
});

document.getElementById('tabGift')?.addEventListener('click', function() {
    resetTabs();
    this.classList.add('topup-tab-active');
    document.getElementById('topupGiftBlock').style.display = 'block';
});

document.getElementById('tabCrypto')?.addEventListener('click', function() {
    resetTabs();
    this.classList.add('topup-tab-active');
    document.getElementById('topupCryptoBlock').style.display = 'block';
    document.getElementById('cryptoCommentInput').value = generateRandomCryptoComment();
});


window.copyReferralLink = function() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
    for (let i = 0; i < 8; i++) {
        referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const referralLink = `https://t.me/markt_robot?start=${referralCode}`;
    
    
    navigator.clipboard.writeText(referralLink)
        .then(() => {
            
        })
        .catch(err => {
            
            const tempInput = document.createElement('input');
            tempInput.value = referralLink;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
        });
};

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
};



function renderCart() {
    const cartList = document.getElementById('cartList');
    const cartCountInfo = document.getElementById('cartCountInfo');
    const cartNavCount = document.getElementById('cartNavCount');
    
    if (!cartList) return;
    
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    
    if (cartNavCount) {
        if (totalCount > 0) {
            cartNavCount.textContent = totalCount;
            cartNavCount.style.display = 'block';
        } else {
            cartNavCount.style.display = 'none';
        }
    }
    
    if (cartCountInfo) {
        cartCountInfo.textContent = `В корзине товаров: ${totalCount}`;
        cartCountInfo.style.display = totalCount > 0 ? 'block' : 'none';
    }
    
    if (cart.length === 0) {
        cartList.innerHTML = '<div style="color:#bdbdf7;text-align:center;padding:20px;">Корзина пуста</div>';
    } else {
        cartList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price" style="color:#ffd700;font-weight:700;">${(item.price * item.quantity).toFixed(2)} TON</div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="color:#fff;font-weight:700;">x${item.quantity}</span>
                    <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        `).join('');
    }
    
    
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        cartTotal.textContent = totalPrice.toFixed(2) + ' TON'; 
    }
    
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.onclick = function() {
            if (cart.length > 0) {
                const topupModal = document.getElementById('topupModal');
                if (topupModal) {
                    document.getElementById('commentInput').value = '#' + Math.random().toString(36).substr(2, 8);
                    topupModal.style.display = 'flex';
                }
            }
        };
    }
}



let sortAscending = true; 


function toggleSort() {
    sortAscending = !sortAscending;
    const sortButton = document.getElementById('sortToggle');
    
    if (sortButton) {
        sortButton.textContent = sortAscending ? 'Сначала дешевые' : 'Сначала дорогие';
    }
    
    renderProducts();
}


function renderProducts() {
    const filter = document.getElementById('filterInput')?.value.toLowerCase() || '';
    
    let filtered = gifts.filter(p => p.title.toLowerCase().includes(filter));
    
    
    filtered = filtered.sort((a, b) => {
        if (sortAscending) return a.price - b.price; 
        return b.price - a.price; 
    });
    
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (!filtered.length) {
        grid.innerHTML = '<div style="color:#bdbdf7;text-align:center;padding:20px;grid-column:1/-1">Нет товаров</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="handleProductCardClick(${product.id})">
            <img class="product-image" src="${product.image}" alt="${product.title}" 
                 onerror="this.src='https://via.placeholder.com/200x200/19192a/ffffff?text=Нет+изображения'">
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-price">${product.price ? product.price.toFixed(2) + ' TON' : '0.00 TON'}</div>
            </div>
        </div>
    `).join('');
}


document.addEventListener('DOMContentLoaded', function() {
    
    const oldSelect = document.getElementById('sortSelect');
    if (oldSelect) {
        oldSelect.remove();
        
        const sortButton = document.createElement('button');
        sortButton.id = 'sortToggle';
        sortButton.className = 'market-sort';
        sortButton.textContent = 'Сначала дешевые';
        sortButton.onclick = toggleSort;
        
        // Вставьте кнопку в нужное место (рядом с фильтром)
        const filterInput = document.getElementById('filterInput');
        if (filterInput && filterInput.parentNode) {
            filterInput.parentNode.appendChild(sortButton);
        }
    }
    
    // Или если кнопка уже есть
    const sortButton = document.getElementById('sortToggle');
    if (sortButton) {
        sortButton.onclick = toggleSort;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    fetchGiftsForMarket();
    renderCart();
    
    
    const style = document.createElement('style');
    style.textContent = `
        .cart-item { 
            display: flex; 
            align-items: center; 
            background: #181828; 
            border-radius: 12px; 
            margin-bottom: 8px; 
            padding: 12px; 
            gap: 12px;
        }
        .cart-item-img { 
            width: 50px; 
            height: 50px; 
            border-radius: 8px; 
            object-fit: cover;
        }
        .cart-item-info { 
            flex: 1; 
        }
        .cart-item-title { 
            font-size: 1rem; 
            font-weight: 500; 
            color: #fff;
            margin-bottom: 4px;
        }
        .cart-remove-btn { 
            background: #ff4d4f; 
            color: #fff; 
            border: none; 
            border-radius: 6px; 
            width: 30px; 
            height: 30px; 
            font-size: 1rem; 
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .cart-remove-btn:hover { 
            background: #ff6b6b; 
        }
        .cart-summary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #23233a;
            padding: 15px;
            border-radius: 12px;
            margin-top: 20px;
        }
        #checkoutBtn {
            background: #267dff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        #checkoutBtn:hover {
            background: #1a5dcc;
        }
    `;
    document.head.appendChild(style);
});


function generateRandomComment() {
    return '#' + Math.random().toString(36).substr(2, 8);
}

function generateRandomCryptoComment() {
    return '#crypto' + Math.random().toString(36).substr(2, 6);
}


document.getElementById('topupBtn')?.addEventListener('click', function() {
    document.getElementById('commentInput').value = generateRandomComment();
    document.getElementById('cryptoCommentInput').value = generateRandomCryptoComment();
});


document.getElementById('tabCard')?.addEventListener('click', function() {
    resetTabs();
    this.classList.add('topup-tab-active');
    document.getElementById('topupCardBlock').style.display = 'block';
});

document.getElementById('tabGift')?.addEventListener('click', function() {
    resetTabs();
    this.classList.add('topup-tab-active');
    document.getElementById('topupGiftBlock').style.display = 'block';
});

document.getElementById('tabCrypto')?.addEventListener('click', function() {
    resetTabs();
    this.classList.add('topup-tab-active');
    document.getElementById('topupCryptoBlock').style.display = 'block';
});

function resetTabs() {
    
    document.getElementById('tabCard').classList.remove('topup-tab-active');
    document.getElementById('tabGift').classList.remove('topup-tab-active');
    document.getElementById('tabCrypto').classList.remove('topup-tab-active');
    
    
    document.getElementById('topupCardBlock').style.display = 'none';
    document.getElementById('topupGiftBlock').style.display = 'none';
    document.getElementById('topupCryptoBlock').style.display = 'none';
}