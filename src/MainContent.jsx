import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UsersContext';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import UserList from './components/UserList';
import ProductForm from './components/ProductForm';
import UserForm from './components/UserForm';


const MainContent = () => {
    const { loggedIn, isAdmin, username } = useContext(AuthContext);

    return (
        <div className="main-content">
            {!loggedIn ? (
                <LoginForm />
            ) : (
                <ProductProvider>
                    <UserProvider>
                    <h2>Witamy w Atomic Store!</h2>
                    <div style={{color:'grey'}}>-------------------------------------------------</div>
                    <h2>Sekcja Produkty</h2>
                    <ProductList isAdmin={isAdmin} />
                    {isAdmin && <ProductForm />}
                    <div style={{color:'grey'}}>-------------------------------------------------</div>
                    <h2>Sekcja Użytkownicy</h2>
                    <UserList isAdmin={isAdmin} username={username}/>
                    {isAdmin && <UserForm />}
                    </UserProvider>
                </ProductProvider>
            )}
        </div>
    );
};
export default MainContent;