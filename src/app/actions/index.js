import faker from 'faker'
import constants from '../constants'
import {getHashOffersRoute } from '../constants/routes'




export const addNewUser = () => {
    const username = `@${faker.internet.userName().toLowerCase()}`
    return dispatch => {
        dispatch({
            type: 'ADD_NEW_USER',
            username
        })

        dispatch(newMessage(
            username,
            'Hello guys..',
            Date.now()
        ))
    }
}

export const selectNewOffer = (author, text, datetime) => {
    return {
        type: 'SELECT_NEW_OFFER',
        author, text, datetime
    }
};


export const getHashOffers = () => {

    console.log('CCCCCC',constants.GET_HASH_OFFERS)
    console.log('CCCCCC1',getHashOffersRoute())
    return (dispatch) => {
        dispatch({
            type: constants.GET_HASH_OFFERS,
            payload: fetch(getHashOffersRoute())
                .then(response => {
                    if( response.ok ) {
                        return response.json()
                    }
                    else {
                        return Promise.reject();
                    }
                })
                .then(json => {
                    return Promise.resolve(json)
                })
        })
    };
};

export const showMap = () => {
    return {
        type: 'SHOW_MAP'
    }
};

export const showSearch = () => {

    return {
        type: 'SHOW_SEARCH'
    }
};

export const selectCountries = (selected) => {

    return {
        type: 'SELECT_COUNTRIES',
        selected
    }
};