import './Discount.css'

const Discount = () => {
    const discounts = [
        { name: '50% Off', discription: 'On selected summer items', icon: <i className="fa-solid fa-tag"></i> },
        { name: 'Buy 2 Get 1 Free', discription: 'On all t-shirts', icon: <i className="fa-solid fa-tag"></i> },
        { name: 'Free Shipping', discription: 'On orders over $100', icon: <i className="fa-solid fa-tag"></i> },
    ]

    return (
        <div className="special-offers-section">
            <h2 className="section-title">Special Offers</h2>
            <p className="section-subtitle">Don't miss out on our amazing deals!</p>

            <div className="offers-container">
                {discounts.map((discount) => {
                    return (
                        <div className="offer-card" key={discount.name}>
                            <div className="offer-icon">
                                {discount.icon}
                            </div>
                            <h3 className="offer-title">{discount.name}</h3>
                            <p className="offer-description">{discount.discription}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Discount;