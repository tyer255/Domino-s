<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Domino's Pizza Clone</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            background-color: #f5f5f5;
        }
        
        header {
            background-color: #e31837;
            color: white;
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
        }
        
        nav ul {
            display: flex;
            list-style: none;
        }
        
        nav ul li {
            margin-left: 20px;
        }
        
        nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }
        
        .cart-btn {
            background: white;
            color: #e31837;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .cart-count {
            background: #ffcc00;
            color: #333;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            position: absolute;
            top: -8px;
            right: -8px;
        }
        
        .search-container {
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
        }
        
        #search-bar {
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 16px;
            outline: none;
        }
        
        #search-bar:focus {
            border-color: #e31837;
        }
        
        .hero {
            background-image: url('https://images.dominos.co.in/new_veg_extravaganza.jpg');
            background-size: cover;
            background-position: center;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            position: relative;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .hero-content {
            position: relative;
            z-index: 1;
        }
        
        .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        
        .btn {
            display: inline-block;
            background-color: #e31837;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
            cursor: pointer;
            border: none;
        }
        
        .menu-section {
            padding: 50px 0;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 40px;
            color: #e31837;
        }
        
        .menu-categories {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .category-btn {
            background: none;
            border: none;
            padding: 10px 20px;
            margin: 5px;
            font-size: 16px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
        }
        
        .category-btn.active {
            border-bottom: 3px solid #e31837;
            font-weight: bold;
            color: #e31837;
        }
        
        .menu-items {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .menu-item {
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            position: relative;
        }
        
        .menu-item:hover {
            transform: translateY(-10px);
        }
        
        .menu-item-img {
            height: 200px;
            width: 100%;
            object-fit: cover;
        }
        
        .menu-item-content {
            padding: 20px;
        }
        
        .menu-item-title {
            font-size: 20px;
            margin-bottom: 10px;
            color: #333;
        }
        
        .menu-item-desc {
            color: #666;
            margin-bottom: 15px;
        }
        
        .menu-item-price {
            font-weight: bold;
            color: #e31837;
            font-size: 18px;
            margin-bottom: 15px;
            display: block;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .quantity-btn {
            background-color: #e31837;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .quantity {
            margin: 0 15px;
            font-weight: bold;
        }
        
        .add-to-cart {
            width: 100%;
            padding: 10px;
            background-color: #e31837;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .add-to-cart:hover {
            background-color: #c11230;
        }
        
        .no-results {
            text-align: center;
            grid-column: 1 / -1;
            padding: 50px;
            font-size: 18px;
            color: #666;
        }
        
        /* Cart Modal Styles */
        .cart-modal {
            display: none;
            position: fixed;
            top: 0;
            right: 0;
            width: 350px;
            height: 100%;
            background-color: white;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            overflow-y: auto;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .cart-modal.open {
            display: block;
            transform: translateX(0);
        }
        
        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .cart-title {
            font-size: 20px;
            font-weight: bold;
            color: #e31837;
        }
        
        .close-cart {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        
        .cart-items {
            padding: 20px;
        }
        
        .cart-item {
            display: flex;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .cart-item-img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 5px;
            margin-right: 15px;
        }
        
        .cart-item-details {
            flex: 1;
        }
        
        .cart-item-name {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .cart-item-price {
            color: #e31837;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
        }
        
        .cart-quantity-btn {
            background-color: #f0f0f0;
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .cart-quantity {
            margin: 0 10px;
        }
        
        .remove-item {
            color: #e31837;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 12px;
            margin-top: 5px;
        }
        
        .cart-total {
            padding: 20px;
            border-top: 1px solid #eee;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .total-label {
            font-weight: bold;
        }
        
        .total-amount {
            color: #e31837;
            font-weight: bold;
            font-size: 18px;
        }
        
        .place-order-btn {
            width: 100%;
            padding: 15px;
            background-color: #e31837;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 15px;
            transition: background-color 0.3s;
        }
        
        .place-order-btn:hover {
            background-color: #c11230;
        }
        
        /* Order Confirmation Animation */
        .order-confirmation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
        }
        
        .order-confirmation.show {
            opacity: 1;
            visibility: visible;
        }
        
        .confirmation-content {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            text-align: center;
            max-width: 500px;
            position: relative;
            transform: translateY(50px);
            transition: transform 0.3s;
        }
        
        .order-confirmation.show .confirmation-content {
            transform: translateY(0);
        }
        
        .confirmation-icon {
            font-size: 60px;
            color: #e31837;
            margin-bottom: 20px;
            animation: bounce 1s;
        }
        
        .confirmation-title {
            font-size: 24px;
            margin-bottom: 15px;
            color: #e31837;
        }
        
        .confirmation-message {
            margin-bottom: 20px;
            color: #333;
        }
        
        .close-confirmation {
            background-color: #e31837;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-30px);
            }
            60% {
                transform: translateY(-15px);
            }
        }
        
        footer {
            background-color: #222;
            color: white;
            padding: 30px 0;
            text-align: center;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        
        .footer-section {
            flex: 1;
            min-width: 250px;
            margin-bottom: 20px;
        }
        
        .footer-section h3 {
            margin-bottom: 15px;
            color: #e31837;
        }
        
        .footer-section ul {
            list-style: none;
        }
        
        .footer-section ul li {
            margin-bottom: 10px;
        }
        
        .footer-section ul li a {
            color: #ccc;
            text-decoration: none;
        }
        
        .copyright {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #444;
        }
        
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
            }
            
            nav ul {
                margin-top: 15px;
            }
            
            .hero h1 {
                font-size: 32px;
            }
            
            .menu-items {
                grid-template-columns: 1fr;
            }
            
            .cart-modal {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">Domino's Pizza</div>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#menu">Menu</a></li>
                        <li><a href="#">Offers</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <button class="cart-btn" id="cart-btn">
                    🛒 Cart <span class="cart-count" id="cart-count">0</span>
                </button>
            </div>
        </div>
    </header>
    
    <div class="search-container">
        <input type="text" id="search-bar" placeholder="Search for pizzas...">
    </div>
    
    <section class="hero">
        <div class="hero-content">
            <h1>Delicious Pizza Delivered to Your Door</h1>
            <a href="#menu" class="btn">Order Now</a>
        </div>
    </section>
    
    <section class="menu-section" id="menu">
        <div class="container">
            <h2 class="section-title">Our Menu</h2>
            
            <div class="menu-categories">
                <button class="category-btn active" data-category="all">All Items</button>
                <button class="category-btn" data-category="veg-pizzas">Veg Pizzas</button>
                <button class="category-btn" data-category="nonveg-pizzas">Non-Veg Pizzas</button>
                <button class="category-btn" data-category="sides">Sides</button>
                <button class="category-btn" data-category="desserts">Desserts</button>
                <button class="category-btn" data-category="drinks">Drinks</button>
            </div>
            
            <div class="menu-items" id="menu-items-container">
                <!-- Veg Pizzas -->
                <div class="menu-item" data-category="veg-pizzas" data-name="margherita pizza">
                    <img src="https://images.dominos.co.in/new_margherita_2502.jpg" alt="Margherita Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Margherita Pizza</h3>
                        <p class="menu-item-desc">Classic delight with 100% real mozzarella cheese</p>
                        <p class="menu-item-price">₹199</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="double cheese margherita pizza">
                    <img src="https://images.dominos.co.in/double_cheese_margherita_2502.jpg" alt="Double Cheese Margherita" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Double Cheese Margherita</h3>
                        <p class="menu-item-desc">Classic delight with double dose of mozzarella cheese</p>
                        <p class="menu-item-price">₹249</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="farmhouse pizza">
                    <img src="https://images.dominos.co.in/farmhouse.png" alt="Farmhouse Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Farmhouse Pizza</h3>
                        <p class="menu-item-desc">Delightful combination of onion, capsicum, tomato & grilled mushroom</p>
                        <p class="menu-item-price">₹279</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="peppy paneer pizza">
                    <img src="https://images.dominos.co.in/new_peppy_paneer.jpg" alt="Peppy Paneer Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Peppy Paneer Pizza</h3>
                        <p class="menu-item-desc">Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika</p>
                        <p class="menu-item-price">₹299</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="mexican green wave pizza">
                    <img src="https://images.dominos.co.in/new_mexican_green_wave.jpg" alt="Mexican Green Wave Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Mexican Green Wave Pizza</h3>
                        <p class="menu-item-desc">Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno</p>
                        <p class="menu-item-price">₹319</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="deluxe veggie pizza">
                    <img src="https://images.dominos.co.in/new_deluxe_veggie.jpg" alt="Deluxe Veggie Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Deluxe Veggie Pizza</h3>
                        <p class="menu-item-desc">Loaded with crunchy onions, crisp capsicum, juicy tomatoes and golden corn</p>
                        <p class="menu-item-price">₹289</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="veg extravaganza pizza">
                    <img src="https://images.dominos.co.in/new_veg_extravaganza.jpg" alt="Veg Extravaganza Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Veg Extravaganza Pizza</h3>
                        <p class="menu-item-desc">Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese</p>
                        <p class="menu-item-price">₹349</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="cheese and corn pizza">
                    <img src="https://images.dominos.co.in/new_cheese_n_corn.jpg" alt="Cheese and Corn Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Cheese and Corn Pizza</h3>
                        <p class="menu-item-desc">Sweet corn with extra cheese topping</p>
                        <p class="menu-item-price">₹259</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="paneer makhni pizza">
                    <img src="https://images.dominos.co.in/new_paneer_makhni.jpg" alt="Paneer Makhni Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Paneer Makhni Pizza</h3>
                        <p class="menu-item-desc">Flavorful paneer with makhni sauce and cheese</p>
                        <p class="menu-item-price">₹329</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="veg-pizzas" data-name="5 pepper pizza">
                    <img src="https://images.dominos.co.in/new_5_pepper.jpg" alt="5 Pepper Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">5 Pepper Pizza</h3>
                        <p class="menu-item-desc">5 sensational peppers - black pepper, red paprika, green capsicum, jalapeno & yellow paprika</p>
                        <p class="menu-item-price">₹359</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <!-- Non-Veg Pizzas -->
                <div class="menu-item" data-category="nonveg-pizzas" data-name="chicken dominator pizza">
                    <img src="https://images.dominos.co.in/new_chicken_dominator.jpg" alt="Chicken Dominator Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Chicken Dominator Pizza</h3>
                        <p class="menu-item-desc">Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken</p>
                        <p class="menu-item-price">₹399</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="nonveg-pizzas" data-name="pepper barbecue chicken pizza">
                    <img src="https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg" alt="Pepper Barbecue Chicken Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Pepper Barbecue Chicken Pizza</h3>
                        <p class="menu-item-desc">Pepper barbecue chicken with extra cheese</p>
                        <p class="menu-item-price">₹379</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="nonveg-pizzas" data-name="chicken sausage pizza">
                    <img src="https://images.dominos.co.in/new_chicken_sausage.jpg" alt="Chicken Sausage Pizza" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Chicken Sausage Pizza</h3>
                        <p class="menu-item-desc">Juicy chicken sausage with onion and capsicum</p>
                        <p class="menu-item-price">₹349</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <!-- Sides -->
                <div class="menu-item" data-category="sides" data-name="garlic breadsticks">
                    <img src="https://images.dominos.co.in/garlic_breadsticks.jpg" alt="Garlic Breadsticks" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Garlic Breadsticks</h3>
                        <p class="menu-item-desc">The endearing tang of garlic in breadstics baked to perfection</p>
                        <p class="menu-item-price">₹99</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="sides" data-name="stuffed garlic bread">
                    <img src="https://images.dominos.co.in/stuffed_garlic_bread.jpg" alt="Stuffed Garlic Bread" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Stuffed Garlic Bread</h3>
                        <p class="menu-item-desc">Freshly baked bread with mozzarella cheese, sweet corn and herbs</p>
                        <p class="menu-item-price">₹129</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="sides" data-name="chicken wings">
                    <img src="https://images.dominos.co.in/new_chicken_wings.jpg" alt="Chicken Wings" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Chicken Wings</h3>
                        <p class="menu-item-desc">Juicy chicken wings with your choice of sauce</p>
                        <p class="menu-item-price">₹179</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="sides" data-name="potato wedges">
                    <img src="https://images.dominos.co.in/potato_wedges.jpg" alt="Potato Wedges" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Potato Wedges</h3>
                        <p class="menu-item-desc">Crispy potato wedges seasoned to perfection</p>
                        <p class="menu-item-price">₹89</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <!-- Desserts -->
                <div class="menu-item" data-category="desserts" data-name="choco lava cake">
                    <img src="https://images.dominos.co.in/choco_lava_cake.jpg" alt="Choco Lava Cake" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Choco Lava Cake</h3>
                        <p class="menu-item-desc">Warm chocolate cake with a molten chocolate center</p>
                        <p class="menu-item-price">₹119</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="desserts" data-name="butterscotch mousse cake">
                    <img src="https://images.dominos.co.in/butterscotch_mousse_cake.jpg" alt="Butterscotch Mousse Cake" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Butterscotch Mousse Cake</h3>
                        <p class="menu-item-desc">Delicious butterscotch flavored mousse cake</p>
                        <p class="menu-item-price">₹129</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="desserts" data-name="vanilla ice cream">
                    <img src="https://images.dominos.co.in/vanilla_ice_cream.jpg" alt="Vanilla Ice Cream" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Vanilla Ice Cream</h3>
                        <p class="menu-item-desc">Creamy vanilla flavored ice cream</p>
                        <p class="menu-item-price">₹79</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <!-- Drinks -->
                <div class="menu-item" data-category="drinks" data-name="pepsi">
                    <img src="https://images.dominos.co.in/pepsi_475ml.jpg" alt="Pepsi" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Pepsi (475ml)</h3>
                        <p class="menu-item-desc">Refreshing Pepsi to complement your meal</p>
                        <p class="menu-item-price">₹60</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                
                <div class="menu-item" data-category="drinks" data-name="mirinda">
                    <img src="https://images.dominos.co.in/mirinda_475ml.jpg" alt="Mirinda" class="menu-item-img">
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">Mirinda (475ml)</h3>
                        <p class="menu-item-desc">Orange flavored carbonated drink</p>
                        <p class="menu-item-price">₹60</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Cart Modal -->
    <div class="cart-modal" id="cart-modal">
        <div class="cart-header">
            <h2 class="cart-title">Your Cart</h2>
            <button class="close-cart" id="close-cart">×</button>
        </div>
        <div class="cart-items" id="cart-items">
            <!-- Cart items will be added here dynamically -->
        </div>
        <div class="cart-total">
            <div class="total-row">
                <span class="total-label">Subtotal:</span>
                <span class="total-amount" id="cart-subtotal">₹0</span>
            </div>
            <div class="total-row">
                <span class="total-label">Tax (5%):</span>
                <span class="total-amount" id="cart-tax">₹0</span>
            </div>
            <div class="total-row">
                <span class="total-label">Delivery Fee:</span>
                <span class="total-amount" id="cart-delivery">₹40</span>
            </div>
            <div class="total-row">
                <span class="total-label">Total:</span>
                <span class="total-amount" id="cart-total">₹40</span>
            </div>
            <button class="place-order-btn" id="place-order">Place Order</button>
        </div>
    </div>
    
    <!-- Order Confirmation -->
    <div class="order-confirmation" id="order-confirmation">
        <div class="confirmation-content">
            <div class="confirmation-icon">✓</div>
            <h2 class="confirmation-title">Order Placed Successfully!</h2>
            <p class="confirmation-message">Your delicious food is on its way. Estimated delivery time: 30 minutes.</p>
            <button class="close-confirmation" id="close-confirmation">Close</button>
        </div>
    </div>
    
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#menu">Menu</a></li>
                        <li><a href="#">Offers</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Phone: 1800 208 1234</li>
                        <li>Email: contact@dominosclone.com</li>
                        <li>Address: 123 Pizza Street, Food City</li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Opening Hours</h3>
                    <ul>
                        <li>Monday - Friday: 11am - 11pm</li>
                        <li>Saturday - Sunday: 11am - 12am</li>
                    </ul>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; 2023 Domino's Pizza Clone. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <script>
        // Cart functionality
        let cart = [];
        
        // DOM Elements
        const cartBtn = document.getElementById('cart-btn');
        const cartModal = document.getElementById('cart-modal');
        const closeCartBtn = document.getElementById('close-cart');
        const cartCount = document.getElementById('cart-count');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTax = document.getElementById('cart-tax');
        const cartDelivery = document.getElementById('cart-delivery');
        const cartTotal = document.getElementById('cart-total');
        const placeOrderBtn = document.getElementById('place-order');
        const orderConfirmation = document.getElementById('order-confirmation');
        const closeConfirmationBtn = document.getElementById('close-confirmation');
        
        // Toggle cart modal
        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('open');
        });
        
        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.remove('open');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartModal.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
                cartModal.classList.remove('open');
            }
        });
        
        // Quantity controls for menu items
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const quantityElement = e.target.parentElement.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                
                if (e.target.classList.contains('plus')) {
                    quantity++;
                } else if (e.target.classList.contains('minus') && quantity > 1) {
                    quantity--;
                }
                
                quantityElement.textContent = quantity;
            });
        });
        
        // Add to cart functionality
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const menuItem = e.target.closest('.menu-item');
                const itemName = menuItem.querySelector('.menu-item-title').textContent;
                const itemPrice = parseInt(menuItem.querySelector('.menu-item-price').textContent.replace('₹', ''));
                const itemImage = menuItem.querySelector('.menu-item-img').src;
                const quantity = parseInt(menuItem.querySelector('.quantity').textContent);
                
                // Check if item already exists in cart
                const existingItemIndex = cart.findIndex(item => item.name === itemName);
                
                if (existingItemIndex !== -1) {
                    // Update quantity if item exists
                    cart[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item to cart
                    cart.push({
                        name: itemName,
                        price: itemPrice,
                        image: itemImage,
                        quantity: quantity
                    });
                }
                
                // Update cart count
                updateCartCount();
                
                // Show cart modal
                cartModal.classList.add('open');
                
                // Update cart display
                updateCartDisplay();
                
                // Show success message
                showToast(`${itemName} added to cart!`);
            });
        });
        
        // Update cart count
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Update cart display
        function updateCartDisplay() {
            // Clear current items
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center;">Your cart is empty</p>';
                return;
            }
            
            // Add each item to cart display
            cart.forEach((item, index) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">₹${item.price}</p>
                        <div class="cart-item-quantity">
                            <button class="cart-quantity-btn minus" data-index="${index}">-</button>
                            <span class="cart-quantity">${item.quantity}</span>
                            <button class="cart-quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Calculate totals
            calculateTotals();
        }
        
        // Calculate cart totals
        function calculateTotals() {
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const tax = subtotal * 0.05;
            const delivery = 40;
            const total = subtotal + tax + delivery;
            
            cartSubtotal.textContent = `₹${subtotal}`;
            cartTax.textContent = `₹${tax.toFixed(2)}`;
            cartDelivery.textContent = `₹${delivery}`;
            cartTotal.textContent = `₹${(subtotal + tax + delivery).toFixed(2)}`;
        }
        
        // Handle cart quantity changes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-quantity-btn')) {
                const index = e.target.dataset.index;
                
                if (e.target.classList.contains('plus')) {
                    cart[index].quantity++;
                } else if (e.target.classList.contains('minus') && cart[index].quantity > 1) {
                    cart[index].quantity--;
                }
                
                updateCartDisplay();
                updateCartCount();
            }
            
            // Handle remove item
            if (e.target.classList.contains('remove-item')) {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCartDisplay();
                updateCartCount();
            }
        });
        
        // Place order
        placeOrderBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // Show order confirmation
            orderConfirmation.classList.add('show');
            
            // Clear cart
            cart = [];
            updateCartCount();
            updateCartDisplay();
            
            // Close cart modal
            cartModal.classList.remove('open');
        });
        
        // Close order confirmation
        closeConfirmationBtn.addEventListener('click', () => {
            orderConfirmation.classList.remove('show');
        });
        
        // Show toast message
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = '#333';
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '5px';
            toast.style.zIndex = '1000';
            toast.style.animation = 'fadeInOut 3s';
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
        
        // Category filter functionality
        const categoryBtns = document.querySelectorAll('.category-btn');
        const menuItems = document.querySelectorAll('.menu-item');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const category = btn.dataset.category;
                
                // Show/hide menu items based on category
                menuItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Check if any items are visible
                checkNoResults();
            });
        });
        
        // Search functionality
        const searchBar = document.getElementById('search-bar');
        
        searchBar.addEventListener('input', () => {
            const searchTerm = searchBar.value.toLowerCase();
            
            menuItems.forEach(item => {
                const itemName = item.dataset.name.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            checkNoResults();
        });
        
        function checkNoResults() {
            const visibleItems = document.querySelectorAll('.menu-item[style="display: block"]');
            let noResultsMsg = document.querySelector('.no-results');
            
            if (visibleItems.length === 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.textContent = 'No items found matching your search.';
                    document.getElementById('menu-items-container').appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
        
        // Initially show all items
        document.addEventListener('DOMContentLoaded', () => {
            menuItems.forEach(item => {
                item.style.display = 'block';
            });
        });
    </script>
</body>
</html>
