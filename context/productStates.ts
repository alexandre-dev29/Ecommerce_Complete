import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Product } from "../SanityTypes";
import { toast } from "react-hot-toast";

interface IProductState {
  cardItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  showCart: boolean;
  qty: number;
  onAdd: (product: Product, quantity: number) => any;
  onRemove: (product: Product) => any;
  setShowCart: (showCard: boolean) => any;
  setCartItems: (cardItems: Product[]) => any;
  setTotalPrice: (totalPrice: number) => any;
  setTotalQuantities: (totalQuantity: number) => any;
  incQty: () => any;
  decQty: () => any;
  toggleCartItemQuantity: (idProduct: string, value: string) => any;
}
export const useECommerceStore = create<IProductState, any>(
  devtools(
    persist(
      (set, get) => ({
        qty: 1,
        cardItems: [],
        totalPrice: 0,
        totalQuantities: 0,
        showCart: false,
        onAdd: (product: Product, quantity: number) => {
          const checkProductInCart = get().cardItems.find(
            (cartProduct) => cartProduct._id === product._id
          );
          if (checkProductInCart) {
            set((state) => ({
              totalPrice:
                product.price && state.totalPrice + product.price * quantity,
              totalQuantities: state.totalQuantities + quantity,
            }));

            const updatedCartItems = get().cardItems.map((cartProduct: any) => {
              if (cartProduct._id === product._id) {
                return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity,
                };
              }
              return cartProduct;
            });
            set(() => ({
              cardItems: updatedCartItems,
            }));
            toast.success(`${quantity} ${product.name} added`);
          } else {
            set((state) => ({
              totalPrice:
                product.price && state.totalPrice + product.price * quantity,
              totalQuantities: state.totalQuantities + quantity,
            }));

            product.quantity = quantity;
            set((state) => ({
              cardItems: [...state.cardItems, { ...product }],
            }));
            toast.success(`${quantity} ${product.name} added`);
          }
        },
        onRemove: (product: Product) => {
          let findProduct = get().cardItems.find(
            (item: any) => item._id === product._id
          );
          const tempCart = get().cardItems.filter(
            (item: any) => item._id !== product._id
          );

          if (findProduct !== undefined) {
            set((state) => ({
              totalPrice:
                // @ts-ignore
                state.totalPrice - findProduct.price * findProduct.quantity,
              // @ts-ignore
              totalQuantities: state.totalQuantities - findProduct.quantity,
              cardItems: tempCart,
            }));
          }
        },
        setShowCart: (showCard: boolean) => {
          set(() => ({
            showCart: showCard,
          }));
        },
        setCartItems: (cardItems: Product[]) => {
          set(() => ({
            cardItems: cardItems,
          }));
        },
        setTotalPrice: (totalPrice: number) => {
          set(() => ({
            totalPrice: totalPrice,
          }));
        },
        setTotalQuantities: (totalQuantity: number) => {
          set(() => ({
            totalQuantities: totalQuantity,
          }));
        },
        incQty: () => {
          set((state) => ({
            qty: state.qty + 1,
          }));
        },
        decQty: () => {
          let tempQty = get().qty - 1;
          if (tempQty < 1) {
            tempQty = 1;
          }
          set(() => ({
            qty: tempQty,
          }));
        },
        toggleCartItemQuantity: (idProduct: string, value: string) => {
          const searchedProduct = get().cardItems.find(
            (item: Product) => item._id === idProduct
          );
          let index = get().cardItems.findIndex(
            (product: any) => product._id === idProduct
          );

          if (searchedProduct !== undefined) {
            if (value === "inc") {
              searchedProduct.quantity += 1;
              let itemsAdded = get().cardItems;
              itemsAdded[index] = searchedProduct;

              set((state) => ({
                cardItems: itemsAdded,
                totalPrice: state.totalPrice + searchedProduct.price,
                totalQuantities: state.totalQuantities + 1,
              }));
            }

            if (value === "dec") {
              if (searchedProduct.quantity > 1) {
                searchedProduct.quantity -= 1;
                let itemsAdded = get().cardItems;
                itemsAdded[index] = searchedProduct;
                set((state) => ({
                  cardItems: itemsAdded,
                  totalPrice: state.totalPrice - searchedProduct.price,
                  totalQuantities: state.totalQuantities - 1,
                }));
              }
            }
          }
        },
      }),
      { name: "Ecommerce-store" }
    )
  )
);
