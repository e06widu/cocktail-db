import axios, { AxiosInstance } from 'axios';
import { IRandomCocktailResponse, ISearchCocktailResponse } from '../models/IResponses';
import { ICocktail } from '../models/ICocktail';


const API_KEY = 1;
const API_BASE_URL = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}`;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('An error occurred:', error);
        return Promise.reject(error);
    }
);

/**
 * Fetch 5 random cocktails
 * @returns 5 random cocktail
 */
export const lookupMultipleRandomCocktail = (): Promise<void | ICocktail[]> => {
    return axios.all([
        axiosInstance.get<IRandomCocktailResponse>(`/random.php`),
        axiosInstance.get<IRandomCocktailResponse>(`/random.php`),
        axiosInstance.get<IRandomCocktailResponse>(`/random.php`),
        axiosInstance.get<IRandomCocktailResponse>(`/random.php`),
        axiosInstance.get<IRandomCocktailResponse>(`/random.php`),
    ])
        .then(axios.spread((obj1, obj2, obj3, obj4, obj5) => {
            return [
                ...obj1.data.drinks,
                ...obj2.data.drinks,
                ...obj3.data.drinks,
                ...obj4.data.drinks,
                ...obj5.data.drinks,
            ]
        })).catch(errors => {
            console.log(errors);
        });


};

export const searchCocktailByName = async (name: string): Promise<ISearchCocktailResponse> => {
    const res = await axiosInstance.get<ISearchCocktailResponse>(`search.php?s=${name}`);
    return res.data;
};
