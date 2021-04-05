import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { buyHolding } from "../../store/holdings"
import "./BuyForm.css"

function BuyForm({ stock }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const [numShares, setNumShares] = useState(0);
    const sessionUser = useSelector(state => state.session.user)

    const estimatedCost = (quote, numShares) => {
        return `$${quote*numShares}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            stockTicker: ticker,
            stockId: stock.id,
            userId: sessionUser.id,
            numShares: Number(numShares),
            buyPrice: stock.quote.c,
            totalCost: Number(numShares)*stock.quote.c
        }

        await dispatch(buyHolding(payload));
        setNumShares(0)

        history.push("/");
    }


    return (
        <div className="order-form-container">
            <form onSubmit={handleSubmit}>
                <div className="order-form__title">
                    Buy {ticker}
                </div>
                <div className="order-form__content">
                    <div>
                        <label htmlFor="shares">Shares</label>
                        <input
                            name="shares"
                            type="number"
                            placeholder="Enter number of shares"
                            value={numShares}
                            onChange={(e) => setNumShares(e.target.value)}
                        />
                    </div>
                    <div className="order-form__quote">
                        <span>Market Price</span>
                        <span>{`$${stock?.quote.c}`}</span>
                    </div>
                    <div className="order-form__est-cost">
                        <span>Estimated Cost</span>
                        <span>{estimatedCost(stock?.quote.c, numShares)}</span>
                    </div>
                    <div className="order-form__submit">
                        <button type="submit">Submit Order</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BuyForm