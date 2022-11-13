let modalqtd = 1;
let cart = [];
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaitem = c('.models .pizza-item').cloneNode(true);

    pizzaitem.setAttribute('data-key', index);
    pizzaitem.querySelector('.pizza-item--img img').src = item.img;
    pizzaitem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaitem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaitem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaitem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalqtd = 1;
        modalprice = parseFloat(item.price.toFixed(2));
        modalprice2 = parseFloat(item.price.toFixed(2));
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 1) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalqtd;





        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    });

    c('.pizza-area').append(pizzaitem);
});

function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500)

}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalqtd++;
    modalprice = modalprice+modalprice2;
    c('.pizzaInfo--qt').innerHTML = modalqtd;
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${modalprice.toFixed(2)}`;

});

c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalqtd > 1) {
        modalqtd--;
        modalprice = modalprice-modalprice2;
        c('.pizzaInfo--qt').innerHTML = modalqtd;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${modalprice.toFixed(2)}`;
    }

});

cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');

    });

});

c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let price = modalprice2;
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex( (item) => item.identifier == identifier );
    console.log(key)

    if(key > -1) {
        cart[key].qt += modalqtd
    } else {
        let bebida = {
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalqtd,
            price: parseFloat(price)
        }
        cart.push(bebida)
        console.log(bebida)
    }

    closeModal()
    openCart()
    updateCart()
});

function openCart() {
    if(cart.length > 0) {
	    c('aside').classList.add('show');
    }
}

function updateCart() {

	if(cart.length > 0) {
		c('aside').classList.add('show')
		c('.cart').innerHTML = ''

		let subtotal = 0
		let desconto = 0
		let total    = 0

		for(let i in cart) {

			let pizzaItem = pizzaJson.find( (item) => item.id == cart[i].id )

        	subtotal += cart[i].price * cart[i].qt

			let cartItem = c('.models .cart--item').cloneNode(true)
			c('.cart').append(cartItem)

			let pizzaSizeName = cart[i].size
			let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

			cartItem.querySelector('img').src = pizzaItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				cart[i].qt++
				updateCart()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				if(cart[i].qt > 1) {
					cart[i].qt--
				} else {
					cart.splice(i, 1)
				}
				updateCart()
			})

			c('.cart').append(cartItem)
		}

		desconto = subtotal * 0.1
		total = subtotal - desconto

		c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
		c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
		c('.total span:last-child').innerHTML    = `R$ ${total.toFixed(2)}`;

	} else {
		c('aside').classList.remove('show')
		c('aside').style.left = '100vw'
	}
}


c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
    c('header').style.display = 'flex'
})



c('.cart--finalizar').addEventListener('click', () => {
    c('aside').classList.remove('show')
    c('aside').style.left = '100vw'
})
