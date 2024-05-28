const toggleActive = (element) => {
  const elements = [searchForm, shoppingCart, loginForm, navbar];
  elements.forEach((el) => {
      if (el !== element) {
          el.classList.remove('active');
      }
  });
  if (element) {
   element.classList.toggle('active');
  }
};

const searchForm = document.querySelector('.search-form');
const shoppingCart = document.querySelector('.shopping-cart');
const loginForm = document.querySelector('.login-form');
const navbar = document.querySelector('.navbar');

document.querySelector('#search-btn').onclick = () => {
  toggleActive(searchForm);
};

document.querySelector('#cart-btn').onclick = () => {
  toggleActive(shoppingCart);
};

document.querySelector('#login-btn').onclick = () => {
  toggleActive(loginForm);
};

document.querySelector('#menu-btn').onclick = () => {
  toggleActive(navbar);
};

window.onscroll = () => {
  toggleActive(null); // Remove activation of all elements when scrolling the page
};

// products starts
const products = [
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/fatia-de-orang-de-fruta-laranja-isolada-em-branco_105428-5372.jpg',
    altText: 'orange',
    productName: 'fresh orange',
    priceProduct: '$ 4.99/- -$10.99/-',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/repolho-verde-fresco-e-parte-picada-isolado_80510-415.jpg',
    altText: 'cabbage',
    productName: 'fresh cabbage',
    priceProduct: '$ 0.99/- -$5.99/-',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/fatia-fresca-da-cenoura-e-da-cenoura-isolada-no-branco-feche-acima-da-cenoura_43284-1557.jpg',
    altText: 'carrot',
    productName: 'fresh carrot',
    priceProduct: '$ 2.97/- -$7.99/-',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/cal-fresco-natural-com-gotas-de-agua-fatiadas-e-isoladas-no-fundo-branco_252965-20.jpg',
    altText: 'lemon',
    productName: 'fresh lemon',
    priceProduct: '$ 1.99/- -$4.99/-',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/cebola-dourada-fresca-isolada-no-branco_272787-260.jpg',
    altText: 'onion',
    productName: 'fresh onion',
    priceProduct: '$ 3.98/- -$8.94/-',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/pilha-de-batatas-jovens-frescas-isoladas-no-branco_136401-468.jpg?size=626&ext=jpg',
    altText: 'potato',
    productName: 'fresh potato',
    priceProduct: '$ 2.91/- -$6.94/-',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/melancia-listrada-verde-isolada-no-branco-com-espaco-de-copia-para-imagens-de-texto-crosssection-berry-com-p_157927-1799.jpg',
    altText: 'watermelon',
    productName: 'fresh watermelon',
    priceProduct: '$ 4.99/- -qyt: 1',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/abacaxi-maduro-isolado-no-fundo-branco_253984-6046.jpg',
    altText: 'pineapple',
    productName: 'fresh pineapple',
    priceProduct: '$ 3.98/- -qyt: 1',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/corte-de-bife-em-branco-isolado_501530-1288.jpg?size=626&ext=jpg',
    altText: 'meat',
    productName: 'beef',
    priceProduct: '$ 10.99/- -$20.99/-',
    stars: 4.5
  },
  {
    imgSrc: 'https://img.freepik.com/fotos-premium/frango-isolado_181303-18.jpg',
    altText: 'chicken',
    productName: 'chicken',
    priceProduct: '$ 12.99/- -$25.99/-',
    stars: 4.5
  }
];

const productContainer = document.getElementById('productContainer');
const shopCart = document.getElementById('shopping-cart');
const listCart = document.getElementById('cart');
const totalSpan = document.getElementById('total');
const cartCount = document.getElementById('cart-count');
let total = 0;
let itemCount = 0;

products.forEach(product => {
  const slide = document.createElement('div');
  slide.className = 'swiper-slide box';

  slide.innerHTML = `
    <img src="${product.imgSrc}" alt="${product.altText}">
    <h3>${product.productName}</h3>
    <div class="price">${product.priceProduct}</div>
    <div class="stars">
        ${generateStars(product.stars)}
    </div>
    <button class="add-btn" >add to cart</button>`;

    productContainer.appendChild(slide);

    const addButton = slide.querySelector('.add-btn');
    addButton.addEventListener('click', () => addToCart(product));
});

function updateCartCountVisibility() {
  cartCount
  if (itemCount > 0) {
    cartCount.style.display = 'flex';
  } else {
    cartCount.style.display = 'none';
  }
}

// Add to cart
function addToCart(product) {
  const price = parseFloat(product.priceProduct.split('-')[0].replace('$', '').trim());
  total += price;

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="cart-item">
    <i class="fa-solid fa-trash trash-icon"></i>
    <ul class="cart">
      <li>
        <img src="${product.imgSrc}" alt="${product.productName}">
        <div class="content">
          <h3>${product.productName}</h3>
          <div class="price"> $${price.toFixed(2)}</div>
        </div>
      </li>
    </ul>
  </div>`;

  listCart.appendChild(li);
  totalSpan.innerText = total.toFixed(2);

  const removeButton = li.querySelector('.trash-icon');
  removeButton.addEventListener('click', () => removeFromCart(price, li));
  li.appendChild(removeButton);

  itemCount++;
  updateCartCount(itemCount);
  updateCartCountVisibility();
}

function removeFromCart(price, item) {
  total -= price;
  totalSpan.innerText = total.toFixed(2);
  listCart.removeChild(item);

  itemCount--;
  updateCartCount(itemCount);
  updateCartCountVisibility();
}

function updateCartCount(count) {
  cartCount.textContent = count;
}
    
    // Custemer's Review
const reviewsData = [
  {
    imgSrc: 'image/profile-2.jpg',
    altText: 'Jones Miller',
    reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    stars: 4.5
  },
  {
    imgSrc: 'image/profile-4.jpg',
    altText: 'Emma Abigail',
    reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    stars: 4.5
  },
  {
    imgSrc: 'image/profile-3.jpg',
    altText: 'Josh Smith',
    reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    stars: 4.5
  },
  {
    imgSrc: 'https://avatars.githubusercontent.com/u/75093333?v=4',
    altText: 'Valdinei Rozembergue',
    reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    stars: 5
  },
  {
    imgSrc: 'image/profile-4.jpg',
    altText: 'Bella Miller',
    reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    stars: 4.5
  }
];

const reviewContainer = document.getElementById('reviewContainer');

// Generate reviews dynamically
reviewsData.forEach(review => {
  const slide = document.createElement('div');
  slide.className = 'swiper-slide box review-item';

  slide.innerHTML = `
    <img src="${review.imgSrc}" alt="${review.altText}">
    <p>${review.reviewText}</p>
    <h3>${review.altText}</h3>
    <div class="stars">
      ${generateStars(review.stars)}
    </div>`;

    reviewContainer.appendChild(slide);
});

// Function to generate star icons based on score
function generateStars(starCount) {
  const roundedStars = Math.round(starCount * 2) / 2;
  const fullStars = Math.floor(roundedStars);
  const halfStars = roundedStars % 1 !== 0;

  let starsHTML = '';
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  if (halfStars) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  return starsHTML;
}

var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });


var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });
