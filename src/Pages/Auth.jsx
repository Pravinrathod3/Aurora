import React from 'react'
import {account, ID} from '../../appwriteConfig'


   export const signUp = async (gmail, password, name) => {
       try {
            const response =  await account.create(ID.unique(), gmail, password, name);
            if(response){
                return signIn(gmail, password);
            }
            else{
                return response;
            }
        } catch (error) {
            throw error;
        }
    }


   export const signIn = async (gmail, password) => {
    try {
        return await account.createEmailPasswordSession(gmail, password);
    } catch (error) {
        throw error;
    }
   }

   export const logout = async() => {
    try {
        return await account.deleteSessions();
    } catch (error) {
        throw error;
    }
   }

   export const currentuser = async() => {  
    try {
        return await account.get();
    } catch (error) {
        throw error;
    }
   }

