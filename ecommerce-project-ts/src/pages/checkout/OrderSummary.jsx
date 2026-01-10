import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({cart,deliveryOptions,loadCart}){
  const [editingProductId, setEditingProductId] = useState(null);
  const [quantityMap, setQuantityMap] = useState({});
  return (
    <div className="order-summary">
      {deliveryOptions.length>0 && cart.map((cartItem)=>{
        const selectedDeliveryOption=deliveryOptions.find((deliveryOption)=>{
          return deliveryOption.id===cartItem.deliveryOptionId;
        });

        const deleteCartItem=async ()=>{
          await axios.delete(`/api/cart-items/${cartItem.productId}`);
          await loadCart();
        };
        const updateQuantity=async (productId)=>{
          await axios.put(`/api/cart-items/${productId}`,{
            quantity: quantityMap[productId]
          });
          setEditingProductId(null);
          await loadCart();
        };

        return(
          <div key={cartItem.productId} className="cart-item-container">
          <div className="delivery-date">
            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="cart-item-details-grid">
            <img className="product-image"
              src={cartItem.product.image} />

            <div className="cart-item-details">
              <div className="product-name">
                {cartItem.product.name}
              </div>
              <div className="product-price">
                {formatMoney(cartItem.product.priceCents)}
              </div>
              <div className="product-quantity">
                {editingProductId === cartItem.productId ? (
                  <>
                    <input
                      type="number"
                      min="1"
                      value={quantityMap[cartItem.productId]}
                      onChange={(e) =>
                        setQuantityMap(prev => ({
                          ...prev,
                          [cartItem.productId]: Number(e.target.value)
                        }))
                      }
                    />
                    <span className="link-primary" onClick={()=>updateQuantity(cartItem.productId)}>
                      Save
                    </span>
                    <span className="link-secondary" onClick={()=>setEditingProductId(null)}>
                      Cancel
                    </span>
                  </>
                ):(
                  <>
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">{cartItem.quantity}</span>
                    </span>

                    <span
                      className="update-quantity-link link-primary"
                      onClick={() => {
                        setEditingProductId(cartItem.productId);
                        setQuantityMap(prev => ({
                          ...prev,
                          [cartItem.productId]: cartItem.quantity
                        }));
                      }}
                    >
                      Update
                    </span>

                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </>
                )}
              </div>

            </div>

            <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
          </div>
          </div>
        );
      })}
    </div>
  );
}