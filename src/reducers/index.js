const initialState = {
    menu: [],
    loading: true,
    items: [],
    amountItems: 0,
    sumSelectItems: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            }
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true
            }
        case 'ITEM_ADD_TO_CART':
            const id = action.payload
            const indexDuplication = state.items.findIndex(item => item.id === id)

            if (indexDuplication !== -1) {
                const replacedItem = state.items[indexDuplication]
                const newItem = {
                    title: replacedItem.title,
                    price: replacedItem.price,
                    url: replacedItem.url,
                    id: replacedItem.id,
                    amount: ++replacedItem.amount
                }

                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, indexDuplication),
                        newItem,
                        ...state.items.slice(indexDuplication + 1)
                    ]
                }
            }

            const item = state.menu.find(item => item.id === id)
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                amount: 1
            }

            return {
                ...state, items: [
                    ...state.items,
                    newItem
                ]
            }
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload
            const itemIndex = state.items.findIndex(item => item.id === idx)

            if (state.items[itemIndex].amount > 1) {
                state.items[itemIndex].amount--
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIndex),
                        state.items[itemIndex],
                        ...state.items.slice(itemIndex + 1)
                    ]
                }
            }
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ]
            }
        case 'GET_AMOUNT_ITEMS':
            return {
                ...state,
                amountItems: state.items.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
            }
        case 'UPDATE_SUM_SELECT_ITEMS':
            const sum = state.items.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.amount, 0)
            return {
                ...state,
                sumSelectItems: sum ? sum : 0
            }
        default:
            return state
    }
}

export default reducer