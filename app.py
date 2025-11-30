# RADIANT GEMS - Jewelry E-commerce Website
# Domain: radiantgems.net
# A beautiful, modern jewelry website built with Flask

from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'radiantgems_secret_key_2025'

# Sample jewelry products data
PRODUCTS = [
    {
        'id': 1,
        'name': 'Diamond Solitaire Ring',
        'price': 2500,
        'category': 'rings',
        'image': 'ring1.jpg',
        'description': 'Elegant 1-carat diamond in platinum setting',
        'material': 'Platinum',
        'gemstone': 'Diamond'
    },
    {
        'id': 2,
        'name': 'Gold Necklace Set',
        'price': 1800,
        'category': 'necklaces',
        'image': 'necklace1.jpg',
        'description': '22k gold necklace with matching earrings',
        'material': 'Gold',
        'gemstone': 'None'
    },
    {
        'id': 3,
        'name': 'Sapphire Earrings',
        'price': 1200,
        'category': 'earrings',
        'image': 'earrings1.jpg',
        'description': 'Blue sapphire studs in white gold',
        'material': 'White Gold',
        'gemstone': 'Sapphire'
    },
    {
        'id': 4,
        'name': 'Pearl Bracelet',
        'price': 800,
        'category': 'bracelets',
        'image': 'bracelet1.jpg',
        'description': 'Freshwater pearl bracelet in sterling silver',
        'material': 'Sterling Silver',
        'gemstone': 'Pearl'
    },
    {
        'id': 5,
        'name': 'Ruby Pendant',
        'price': 1500,
        'category': 'pendants',
        'image': 'pendant1.jpg',
        'description': 'Vivid ruby pendant in 18k gold',
        'material': '18k Gold',
        'gemstone': 'Ruby'
    },
    {
        'id': 6,
        'name': 'Emerald Ring',
        'price': 2200,
        'category': 'rings',
        'image': 'ring2.jpg',
        'description': 'Colombian emerald in yellow gold band',
        'material': 'Yellow Gold',
        'gemstone': 'Emerald'
    }
]

@app.route('/')
def home():
    """Home page with featured products."""
    featured_products = PRODUCTS[:3]  # Show first 3 products
    return render_template('home.html', products=featured_products)

@app.route('/products')
def products():
    """All products page."""
    category = request.args.get('category', 'all')
    if category == 'all':
        filtered_products = PRODUCTS
    else:
        filtered_products = [p for p in PRODUCTS if p['category'] == category]

    return render_template('products.html', products=filtered_products, category=category)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    """Individual product detail page."""
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return render_template('404.html'), 404

    # Get related products (same category, excluding current)
    related = [p for p in PRODUCTS if p['category'] == product['category'] and p['id'] != product_id][:3]

    return render_template('product_detail.html', product=product, related=related)

@app.route('/about')
def about():
    """About us page."""
    return render_template('about.html')

@app.route('/contact')
def contact():
    """Contact page."""
    return render_template('contact.html')

@app.route('/contact', methods=['POST'])
def contact_submit():
    """Handle contact form submission."""
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    # In a real app, you'd save this to database or send email
    print(f"Contact form: {name} ({email}): {message}")

    flash('Thank you for your message! We\'ll get back to you soon.', 'success')
    return redirect(url_for('contact'))

@app.route('/api/products')
def api_products():
    """JSON API for products."""
    return jsonify(PRODUCTS)

@app.route('/api/product/<int:product_id>')
def api_product(product_id):
    """JSON API for single product."""
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@app.errorhandler(404)
def page_not_found(e):
    """404 error page."""
    return render_template('404.html'), 404

@app.context_processor
def inject_now():
    """Make current year available in all templates."""
    return {'now': datetime.now()}

if __name__ == '__main__':
    print("=" * 50)
    print("RADIANT GEMS - Jewelry Website")
    print("=" * 50)
    print("Domain: radiantgems.net")
    print("Local access: http://localhost:5000")
    print("Products loaded:", len(PRODUCTS))
    print("=" * 50)

    # For production deployment (Render, Heroku, etc.)
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)